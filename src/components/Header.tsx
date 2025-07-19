import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Edit3 } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { EditableText } from './EditableText';

interface HeaderProps {
  personalInfo: PersonalInfo;
  onEditClick: () => void;
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  isEditing: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  personalInfo, 
  onEditClick, 
  onUpdatePersonalInfo, 
  isEditing 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-700' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEditClick}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all duration-300 shadow-lg"
          >
            <span className="hidden sm:inline"></span>
          </motion.button>

          <div className="flex items-center gap-4">
            <motion.a
              href={isEditing ? '#' : personalInfo.github}
              target={isEditing ? '_self' : '_blank'}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text hover:from-purple-300 hover:to-cyan-300 transition-all duration-300 relative"
              onClick={(e) => isEditing && e.preventDefault()}
            >
              <Github className="w-6 h-6 stroke-2" style={{
                stroke: 'url(#headerGradient1)'
              }} />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="headerGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              {isEditing && (
                <div className="absolute top-12 right-16 bg-gray-800 p-2 rounded-lg shadow-lg">
                  <EditableText
                    value={personalInfo.github}
                    onChange={(value) => onUpdatePersonalInfo({ ...personalInfo, github: value })}
                    isEditing={isEditing}
                    className="text-white text-sm"
                    placeholder="GitHub URL"
                  />
                </div>
              )}
            </motion.a>
            <motion.a
              href={isEditing ? '#' : `mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text hover:from-purple-300 hover:to-cyan-300 transition-all duration-300 relative"
              onClick={(e) => isEditing && e.preventDefault()}
            >
              <Mail className="w-6 h-6 stroke-2" style={{
                stroke: 'url(#headerGradient2)'
              }} />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="headerGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              {isEditing && (
                <div className="absolute top-12 right-4 bg-gray-800 p-2 rounded-lg shadow-lg">
                  <EditableText
                    value={personalInfo.email}
                    onChange={(value) => onUpdatePersonalInfo({ ...personalInfo, email: value })}
                    isEditing={isEditing}
                    className="text-white text-sm"
                    placeholder="Email"
                  />
                </div>
              )}
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
