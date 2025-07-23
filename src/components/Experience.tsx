import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Experience } from '../types/portfolio'; // Make sure this import path is correct for your project
import { EditableText } from './EditableText'; // Make sure this import path is correct for your project

interface ExperienceProps {
  experiences: Experience[];
  onUpdateExperiences: (experiences: Experience[]) => void;
  isEditing: boolean;
}

export const ExperienceComponent: React.FC<ExperienceProps> = ({
  experiences,
  onUpdateExperiences,
  isEditing
}) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: 'New Position',
      company: 'Company Name',
      description: 'Job description here...\n\nThis is a new line.', // Added some initial newlines for testing
      duration: '2024 - Present',
      location: 'Location'
    };
    onUpdateExperiences([...experiences, newExperience]);
  };

  const deleteExperience = (id: string) => {
    onUpdateExperiences(experiences.filter(e => e.id !== id));
  };

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <p className="text-xl text-gray-600">My professional journey and achievements</p>
        </motion.div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <button
              onClick={addExperience}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Experience
            </button>
          </motion.div>
        )}

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }} // Simplified initial animation as we're not alternating sides
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              // Removed alternating side classes and made it full width on medium screens and up
              className={`relative flex flex-col items-center mb-12 md:flex-row md:justify-center`} // Changed layout for full width boxes
            >
     
              <div className={`md:w-4/5 lg:w-3/5 max-w-3xl p-6 bg-white rounded-lg shadow-lg relative ml-8 md:ml-0`}>
                {isEditing && (
                  <button
                    onClick={() => deleteExperience(experience.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 z-10" // Added z-10 to ensure it's above other content
                  >
                    Delete
                  </button>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">
                    <EditableText
                      value={experience.duration}
                      onChange={(value) => {
                        const updated = experiences.map(e =>
                          e.id === experience.id ? { ...e, duration: value } : e
                        );
                        onUpdateExperiences(updated);
                      }}
                      isEditing={isEditing}
                      className="text-sm text-blue-600 font-medium"
                      placeholder="Duration"
                    />
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  <EditableText
                    value={experience.title}
                    onChange={(value) => {
                      const updated = experiences.map(e =>
                        e.id === experience.id ? { ...e, title: value } : e
                      );
                      onUpdateExperiences(updated);
                    }}
                    isEditing={isEditing}
                    className="text-xl font-semibold text-gray-900"
                    placeholder="Job Title"
                  />
                </h3>

                <p className="text-blue-600 font-medium mb-2">
                  <EditableText
                    value={experience.company}
                    onChange={(value) => {
                      const updated = experiences.map(e =>
                        e.id === experience.id ? { ...e, company: value } : e
                      );
                      onUpdateExperiences(updated);
                    }}
                    isEditing={isEditing}
                    className="text-blue-600 font-medium"
                    placeholder="Company"
                  />
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    <EditableText
                      value={experience.location}
                      onChange={(value) => {
                        const updated = experiences.map(e =>
                          e.id === experience.id ? { ...e, location: value } : e
                        );
                        onUpdateExperiences(updated);
                      }}
                      isEditing={isEditing}
                      className="text-sm text-gray-500"
                      placeholder="Location"
                    />
                  </span>
                </div>

          
                {isEditing ? (
                  <EditableText
                    value={experience.description}
                    onChange={(value) => {
                      const updated = experiences.map(e =>
                        e.id === experience.id ? { ...e, description: value } : e
                      );
                      onUpdateExperiences(updated);
                    }}
                    isEditing={isEditing}
                    className="text-gray-600 text-sm leading-relaxed"
                    placeholder="Job description"
                    multiline
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {experience.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-4 leading-loose"> 
                        {line}
                      </p>
                    ))}
                  </p>
                )}
              </div>

            
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
