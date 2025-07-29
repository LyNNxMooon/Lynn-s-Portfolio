import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Edit, Trash2, Plus } from 'lucide-react';
import { Project } from '../types/portfolio';
import { EditableText } from './EditableText';

interface ProjectDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProject: (project: Project) => void;
  isEditing: boolean;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  isOpen,
  onClose,
  onUpdateProject,
  isEditing
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const mockupImages = project.mockupImages || project.images;

  const addMockupImage = () => {
    const newImages = [...(project.mockupImages || []), 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=600'];
    onUpdateProject({ ...project, mockupImages: newImages });
  };

  const removeMockupImage = (index: number) => {
    const newImages = (project.mockupImages || []).filter((_, i) => i !== index);
    onUpdateProject({ ...project, mockupImages: newImages });
  };

  const updateMockupImage = (index: number, url: string) => {
    const newImages = [...(project.mockupImages || [])];
    newImages[index] = url;
    onUpdateProject({ ...project, mockupImages: newImages });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                <EditableText
                  value={project.name}
                  onChange={(value) => onUpdateProject({ ...project, name: value })}
                  isEditing={isEditing}
                  className="text-2xl font-bold text-white"
                  placeholder="Project name"
                />
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Project Gallery</h3>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addMockupImage}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                      Add Image
                    </motion.button>
                  )}
                </div>
                
                {mockupImages.length > 0 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={mockupImages[currentImageIndex]}
                        alt={`${project.name} mockup ${currentImageIndex + 1}`}
                        className="w-full h-96 object-cover rounded-lg"
                      />
                      {isEditing && (
                        <div className="absolute top-2 right-2 flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeMockupImage(currentImageIndex)}
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      )}
                      {isEditing && (
                        <div className="absolute bottom-2 left-2 right-2 bg-gray-800/90 p-2 rounded">
                          <EditableText
                            value={mockupImages[currentImageIndex]}
                            onChange={(value) => updateMockupImage(currentImageIndex, value)}
                            isEditing={isEditing}
                            className="text-white text-sm w-full"
                            placeholder="Image URL"
                          />
                        </div>
                      )}
                    </div>
                    
                    {mockupImages.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto">
                        {mockupImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              currentImageIndex === index
                                ? 'border-purple-500'
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Project Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">About This Project</h3>
                <div className="text-gray-300 leading-relaxed">
  {isEditing ? (
    // Render the EditableText when in editing mode
    <EditableText
      value={project.detailedDescription || project.description}
      onChange={(value) => onUpdateProject({ ...project, detailedDescription: value })}
      isEditing={isEditing}
      className="text-gray-300 leading-relaxed"
      placeholder="Detailed project description..."
      multiline
    />
  ) : (
    // Render the formatted paragraphs when in viewing mode
    <div className="text-gray-300 leading-relaxed"> {/* Wrap paragraphs in a div */}
      {(project.detailedDescription || project.description)
        .split('\n')
        .map((line, index) => (
          <p key={index} className="mb-4 leading-loose"> {/* Add spacing and line height */}
            {line}
          </p>
        ))}
    </div>
  )}
</div>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {(project.demoUrl || isEditing) && (
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Demo URL:</label>
                        <EditableText
                          value={project.demoUrl || ''}
                          onChange={(value) => onUpdateProject({ ...project, demoUrl: value })}
                          isEditing={isEditing}
                          className="text-white w-full"
                          placeholder="Demo URL"
                        />
                      </div>
                    ) : project.demoUrl ? (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Live Demo
                      </motion.a>
                    ) : null}
                  </div>
                )}
                
                {(project.githubUrl || isEditing) && (
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">GitHub URL:</label>
                        <EditableText
                          value={project.githubUrl || ''}
                          onChange={(value) => onUpdateProject({ ...project, githubUrl: value })}
                          isEditing={isEditing}
                          className="text-white w-full"
                          placeholder="GitHub URL"
                        />
                      </div>
                    ) : project.githubUrl ? (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600"
                      >
                        <Github className="w-5 h-5" />
                        View Source Code
                      </motion.a>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
