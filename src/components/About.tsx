import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Code, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { PersonalInfo, Education, Skill } from '../types/portfolio';
import { EditableText } from './EditableText';

interface AboutProps {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  onUpdateEducation: (education: Education[]) => void;
  onUpdateSkills: (skills: Skill[]) => void;
  isEditing: boolean;
}

export const About: React.FC<AboutProps> = ({
  personalInfo,
  education,
  skills,
  onUpdatePersonalInfo,
  onUpdateEducation,
  onUpdateSkills,
  isEditing
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'education' | 'skills'>('about');

  const tabs = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Tech', icon: Code }
  ] as const;

  const skillCategories = Array.from(new Set(skills.map(skill => skill.category)));

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: 'New Degree',
      institution: 'Institution Name',
      duration: '2024 - Present',
      description: 'Description here...',
      documentsUrl: 'https://drive.google.com/drive/folders/your-folder-id'
    };
    onUpdateEducation([...education, newEducation]);
  };

  const deleteEducation = (id: string) => {
    onUpdateEducation(education.filter(e => e.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: 'New Skill',
      category: 'Framework',
      level: 50,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    };
    onUpdateSkills([...skills, newSkill]);
  };

  const deleteSkill = (id: string) => {
    onUpdateSkills(skills.filter(s => s.id !== id));
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-black"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          Get to Know Me
        </motion.h2>

        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/3 bg-gray-900/50 p-6">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="sm:w-2/3 p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white">About Me</h3>
                    {isEditing ? (
                      <div className="text-gray-300 leading-relaxed">
                        <EditableText
                          value={personalInfo.aboutMe}
                          onChange={(value) => onUpdatePersonalInfo({ ...personalInfo, aboutMe: value })}
                          isEditing={isEditing}
                          className="text-gray-300 leading-relaxed"
                          placeholder="Tell us about yourself..."
                          multiline
                        />
                      </div>
                   ) : (
                      <div className="text-gray-300 leading-relaxed">
                        {personalInfo.aboutMe.split('\n\n').map((line, index) => (
                          <p key={index} className="mb-4">
                            {line}
                          </p>
                        ))}
                      </div>
                   )}
                 </div>
                )}
                {activeTab === 'education' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-white">Education</h3>
                      {isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addEducation}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                        >
                          <Plus className="w-4 h-4" />
                          Add Education
                        </motion.button>
                      )}
                    </div>
                    {education.map((edu, index) => (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-4 border-gradient-to-b from-purple-500 to-cyan-500 pl-6 py-4 relative"
                      >
                        {isEditing && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteEducation(edu.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        )}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white">
                              <EditableText
                                value={edu.degree}
                                onChange={(value) => {
                                  const updated = education.map(e => 
                                    e.id === edu.id ? { ...e, degree: value } : e
                                  );
                                  onUpdateEducation(updated);
                                }}
                                isEditing={isEditing}
                                className="text-lg font-semibold text-white"
                                placeholder="Degree"
                              />
                            </h4>
                            <p className="text-cyan-400 font-medium">
                              <EditableText
                                value={edu.institution}
                                onChange={(value) => {
                                  const updated = education.map(e => 
                                    e.id === edu.id ? { ...e, institution: value } : e
                                  );
                                  onUpdateEducation(updated);
                                }}
                                isEditing={isEditing}
                                className="text-cyan-400 font-medium"
                                placeholder="Institution"
                              />
                            </p>
                            <p className="text-gray-400 text-sm">
                              <EditableText
                                value={edu.duration}
                                onChange={(value) => {
                                  const updated = education.map(e => 
                                    e.id === edu.id ? { ...e, duration: value } : e
                                  );
                                  onUpdateEducation(updated);
                                }}
                                isEditing={isEditing}
                                className="text-gray-400 text-sm"
                                placeholder="Duration"
                              />
                            </p>
                            <p className="text-gray-300 mt-2">
                              <EditableText
                                value={edu.description}
                                onChange={(value) => {
                                  const updated = education.map(e => 
                                    e.id === edu.id ? { ...e, description: value } : e
                                  );
                                  onUpdateEducation(updated);
                                }}
                                isEditing={isEditing}
                                className="text-gray-300"
                                placeholder="Description"
                                multiline
                              />
                            </p>
                            {isEditing && (
                              <div className="mt-2">
                                <EditableText
                                  value={edu.documentsUrl}
                                  onChange={(value) => {
                                    const updated = education.map(e => 
                                      e.id === edu.id ? { ...e, documentsUrl: value } : e
                                    );
                                    onUpdateEducation(updated);
                                  }}
                                  isEditing={isEditing}
                                  className="text-purple-400 text-sm"
                                  placeholder="Documents URL"
                                />
                              </div>
                            )}
                          </div>
                          <motion.a
                            href={edu.documentsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="ml-4 p-2 text-cyan-400 hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-white">Skills & Technologies</h3>
                      {isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addSkill}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                        >
                          <Plus className="w-4 h-4" />
                          Add Skill
                        </motion.button>
                      )}
                    </div>
                    {skillCategories.map((category, categoryIndex) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 }}
                        className="space-y-3"
                      >
                        <h4 className="text-lg font-medium text-gray-200">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {skills
                            .filter(skill => skill.category === category)
                            .map((skill, skillIndex) => (
                              <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700 relative group"
                              >
                                <div className="flex items-center gap-3">
                                  {skill.logo && (
                                    <img 
                                      src={skill.logo} 
                                      alt={skill.name}
                                      className="w-6 h-6"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  )}
                                  <span className="font-medium text-gray-200">
                                    <EditableText
                                      value={skill.name}
                                      onChange={(value) => {
                                        const updated = skills.map(s => 
                                          s.id === skill.id ? { ...s, name: value } : s
                                        );
                                        onUpdateSkills(updated);
                                      }}
                                      isEditing={isEditing}
                                      className="font-medium text-gray-200"
                                      placeholder="Skill name"
                                    />
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-300"
                                      style={{ width: `${skill.level}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-400 w-8 text-center">
                                    {skill.level}%
                                  </span>
                                </div>
                                {isEditing && (
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => deleteSkill(skill.id)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </motion.button>
                                )}
                                {isEditing && (
                                  <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <EditableText
                                      value={skill.logo || ''}
                                      onChange={(value) => {
                                        const updated = skills.map(s => 
                                          s.id === skill.id ? { ...s, logo: value } : s
                                        );
                                        onUpdateSkills(updated);
                                      }}
                                      isEditing={isEditing}
                                      className="text-white text-xs"
                                      placeholder="Logo URL"
                                    />
                                  </div>
                                )}
                              </motion.div>
                            ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
