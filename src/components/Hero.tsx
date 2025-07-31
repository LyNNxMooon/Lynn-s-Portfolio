import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { EditableText } from './EditableText';

interface HeroProps {
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  onUploadImage: (file: File) => Promise<string | null>;
  isEditing: boolean;
}

export const Hero: React.FC<HeroProps> = ({ personalInfo, onUpdatePersonalInfo, onUploadImage, isEditing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await onUploadImage(file);
        if (imageUrl) {
          onUpdatePersonalInfo({ ...personalInfo, photo: imageUrl });
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Failed to upload photo. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-black pt-16 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-full blur-3xl"
        />
        
        {/* Enhanced Responsive Wavy Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <motion.path
            d="M0,50 Q25,25 50,50 T100,50"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 3, delay: 1 }}
          />
          <motion.path
            d="M0,37.5 Q33.33,12.5 66.67,37.5 T100,37.5"
            stroke="url(#gradient2)"
            strokeWidth="0.4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 3, delay: 1.5 }}
          />
          <motion.path
            d="M0,62.5 Q16.67,87.5 50,62.5 T100,62.5"
            stroke="url(#gradient3)"
            strokeWidth="0.4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 3, delay: 2 }}
          />
          <motion.path
            d="M0,31.25 Q29.17,6.25 58.33,31.25 T100,31.25"
            stroke="url(#gradient4)"
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 3, delay: 2.5 }}
          />
          <motion.path
            d="M0,68.75 Q20.83,93.75 54.17,68.75 T100,68.75"
            stroke="url(#gradient5)"
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 3, delay: 3 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={personalInfo.photo}
                alt={personalInfo.name}
                className="w-80 h-80 rounded-full mx-auto mb-6 object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl"></div>
            </motion.div>
            
            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-6 right-1/2 transform translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-3 rounded-full shadow-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50"
                disabled={isUploading}
              >
                {isUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </motion.button>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={isUploading}
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">
            <EditableText
              value={personalInfo.name}
              onChange={(value) => onUpdatePersonalInfo({ ...personalInfo, name: value })}
              isEditing={isEditing}
              className="text-5xl md:text-7xl font-bold text-white"
              placeholder="Your Name"
            />
          </h1>
          
          <p className="text-lg md:text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8">
            <EditableText
              value={personalInfo.title}
              onChange={(value) => onUpdatePersonalInfo({ ...personalInfo, title: value })}
              isEditing={isEditing}
              className="text-lg md:text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              placeholder="Your Title"
            />
          </p>
        </motion.div>

       <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.5 }}
  className="flex flex-col sm:flex-row gap-4 justify-center"
>
  {[
    { label: 'About Me', target: 'about' },
    { label: 'Projects', target: 'projects' },
    { label: 'Work Exp', target: 'experience' },
    { label: '➤', target: 'contact' }
  ].map((button, index) => (
    <motion.button
      key={button.target}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => scrollToSection(button.target)}
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 border border-purple-500/30" // <-- Changed px-8 py-4 to px-6 py-3
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1 }}
    >
      {button.label}
    </motion.button>
  ))}
</motion.div>
      </div>
    </motion.section>
  );
};
