import { useState, useEffect, useCallback } from 'react';
import { PortfolioData } from '../types/portfolio';
import { supabase } from '../lib/supabase';

const USER_ID = 'default_portfolio';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: portfolioData, error: fetchError } = await supabase
        .from('portfolio_data')
        .select('data')
        .eq('user_id', USER_ID)
        .single();

      if (fetchError) {
        console.error('Error fetching portfolio data:', fetchError);
        setError('Failed to load portfolio data');
        return;
      }

      if (portfolioData?.data) {
        setData(portfolioData.data as PortfolioData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load portfolio data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateData = useCallback(async (newData: PortfolioData) => {
    try {
      setError(null);
      
      // Optimistically update local state
      setData(newData);
      
      const { error: updateError } = await supabase
        .from('portfolio_data')
        .upsert({
          user_id: USER_ID,
          data: newData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (updateError) {
        console.error('Error saving portfolio data:', updateError);
        setError('Failed to save changes');
        // Reload data to revert optimistic update
        await loadData();
        return false;
      }

      console.log('Data saved successfully to Supabase');
      return true;
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to save changes');
      await loadData();
      return false;
    }
  }, [loadData]);

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    try {
      // Convert file to base64 for storage
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          resolve(result);
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
      return null;
    }
  }, []);

  const exportData = useCallback(() => {
    if (!data) return;
    
    const dataString = JSON.stringify(data, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  const importData = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const importedData = JSON.parse(text);
      
      if (importedData && importedData.personalInfo && importedData.projects) {
        const success = await updateData(importedData);
        if (success) {
          alert('Data imported successfully!');
        }
      } else {
        alert('Invalid file format');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data');
    }
  }, [updateData]);

  const resetData = useCallback(async () => {
    try {
      // Reset to default data structure
      const defaultData: PortfolioData = {
        personalInfo: {
          name: "John Doe",
          title: "Flutter Developer",
          email: "john.doe@gmail.com",
          github: "https://github.com/yourusername",
          phone: "+44 123 456 7890",
          photo: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
          aboutMe: "Passionate Flutter developer with 3+ years of experience in building cross-platform mobile applications."
        },
        projects: [],
        experience: [],
        education: [],
        skills: []
      };
      
      const success = await updateData(defaultData);
      if (success) {
        alert('Portfolio reset to defaults successfully!');
      }
    } catch (error) {
      console.error('Error resetting data:', error);
      setError('Failed to reset data');
    }
  }, [updateData]);

  return { 
    data, 
    updateData, 
    uploadImage,
    isLoading, 
    error,
    resetData, 
    exportData, 
    importData,
    refreshData: loadData
  };
};