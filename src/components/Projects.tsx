import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { Project } from '../types/portfolio';
import { EditableText } from './EditableText';
import { ProjectDetail } from './ProjectDetail';

interface ProjectsProps {
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  isEditing: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onUpdateProjects, isEditing }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'New Project',
      description: 'Project description here...',
      detailedDescription: 'Detailed project description here...',
      technologies: ['Flutter', 'Dart'],
      demoUrl: '',
      githubUrl: '',
      images: ['https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400'],
      mockupImages: ['https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=600'],
      featured: false
    };
    onUpdateProjects([...projects, newProject]);
  };

  const deleteProject = (id: string) => {
    onUpdateProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (updatedProject: Project) => {
    const updated = projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    onUpdateProjects(updated);
  };

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  return (
    <>
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-300">A showcase of my recent work and achievements</p>
          </motion.div>

          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <button
                onClick={addProject}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Add New Project
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`bg-gray-900 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 border cursor-pointer ${
                  project.featured 
                    ? 'border-gradient-to-r from-purple-500 to-cyan-500' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}
                onClick={() => openProjectDetail(project)}
              >
                <div className="relative">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    <EditableText
                      value={project.name}
                      onChange={(value) => {
                        const updated = projects.map(p => 
                          p.id === project.id ? { ...p, name: value } : p
                        );
                        onUpdateProjects(updated);
                      }}
                      isEditing={isEditing}
                      className="text-xl font-semibold text-white"
                      placeholder="Project name"
                    />
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    <EditableText
                      value={project.description}
                      onChange={(value) => {
                        const updated = projects.map(p => 
                          p.id === project.id ? { ...p, description: value } : p
                        );
                        onUpdateProjects(updated);
                      }}
                      isEditing={isEditing}
                      className="text-gray-300 text-sm leading-relaxed"
                      placeholder="Project description"
                      multiline
                    />
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.demoUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demoUrl, '_blank');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectDetail(project);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm border border-gray-700"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <ProjectDetail
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdateProject={updateProject}
        isEditing={isEditing}
      />
    </>
  );
};