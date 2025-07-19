import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ExperienceComponent } from './components/Experience';
import { Contact } from './components/Contact';
import { PasswordModal } from './components/PasswordModal';
import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
  const { data, updateData, uploadImage, isLoading, error, resetData, exportData, importData } = usePortfolioData();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSuccess = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading portfolio...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-md mx-auto p-6"
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Connection Error</h2>
          <p className="text-gray-300 mb-6">
            {error || 'Failed to load portfolio data. Please check your Supabase configuration.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        personalInfo={data.personalInfo} 
        onEditClick={handleEditClick}
        onUpdatePersonalInfo={(info) => updateData({ ...data, personalInfo: info })}
        isEditing={isEditing}
      />
      
      <Hero 
        personalInfo={data.personalInfo}
        onUpdatePersonalInfo={(info) => updateData({ ...data, personalInfo: info })}
        onUploadImage={uploadImage}
        isEditing={isEditing}
      />
      
      <About 
        personalInfo={data.personalInfo}
        education={data.education}
        skills={data.skills}
        onUpdatePersonalInfo={(info) => updateData({ ...data, personalInfo: info })}
        onUpdateEducation={(education) => updateData({ ...data, education })}
        onUpdateSkills={(skills) => updateData({ ...data, skills })}
        isEditing={isEditing}
      />
      
      <Projects 
        projects={data.projects}
        onUpdateProjects={(projects) => updateData({ ...data, projects })}
        isEditing={isEditing}
      />
      
      <ExperienceComponent 
        experiences={data.experience}
        onUpdateExperiences={(experience) => updateData({ ...data, experience })}
        isEditing={isEditing}
      />
      
      <Contact 
        personalInfo={data.personalInfo}
        onUpdatePersonalInfo={(info) => updateData({ ...data, personalInfo: info })}
        isEditing={isEditing}
      />

      <PasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
        onExportData={exportData}
        onImportData={importData}
        onResetData={resetData}
      />

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <button onClick={handleCloseEdit} className="font-medium">
            Exit Edit Mode
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default App;