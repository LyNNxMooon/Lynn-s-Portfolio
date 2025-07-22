import { useState, useEffect, useCallback } from 'react';
import { PortfolioData } from '../types/portfolio';
import { supabase } from '../lib/supabase';
import { defaultPortfolioData } from '../data/portfolioData';

const USER_ID = 'default_portfolio';
const QUERY_TIMEOUT = 60000; // 1 minute

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout')), QUERY_TIMEOUT);
      });

      // Create the query promise with optimized settings
      const queryPromise = supabase
        .from('portfolio_data')
        .select('data')
        .eq('user_id', USER_ID)
        .limit(1)
        .single();

      // Race between query and timeout
      const { data: portfolioData, error: fetchError } = await Promise.race([
        queryPromise,
        timeoutPromise
      ]) as any;

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // No data found, use default data
          console.log('No portfolio data found, using defaults');
          setData(defaultPortfolioData);
        } else {
          console.error('Error fetching portfolio data:', fetchError);
          setError('Failed to load portfolio data. Using default data.');
          setData(defaultPortfolioData);
        }
        return;
      }

      if (portfolioData?.data) {
        // Validate data structure before setting
        const loadedData = portfolioData.data as PortfolioData;
        if (loadedData.personalInfo && loadedData.projects !== undefined) {
          setData(loadedData);
        } else {
          console.warn('Invalid data structure, using defaults');
          setData(defaultPortfolioData);
        }
      } else {
        setData(defaultPortfolioData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      if (error instanceof Error && error.message === 'Query timeout') {
        setError('Database query timed out. Using default data.');
      } else {
        setError('Failed to load portfolio data. Using default data.');
      }
      // Fallback to default data
      setData(defaultPortfolioData);
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

      // Optimize data before saving (remove large base64 images if any)
      const optimizedData = {
        ...newData,
        personalInfo: {
          ...newData.personalInfo,
          // Ensure photo is a URL, not base64
          photo: newData.personalInfo.photo?.startsWith('data:') 
            ? 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400'
            : newData.personalInfo.photo
        }
      };
      
      // Create timeout for update operation
      const updateTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Update timeout')), QUERY_TIMEOUT);
      });

      const updatePromise = supabase
        .from('portfolio_data')
        .upsert({
          user_id: USER_ID,
          data: optimizedData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      const { error: updateError } = await Promise.race([
        updatePromise,
        updateTimeoutPromise
      ]) as any;

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
      setError(error instanceof Error && error.message === 'Update timeout' ? 'Save operation timed out' : 'Failed to save changes');
      await loadData();
      return false;
    }
  }, [loadData]);

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `portfolio-images/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading to storage:', error);
        setError('Failed to upload image');
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      return publicUrl;
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
