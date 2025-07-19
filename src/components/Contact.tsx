import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Mail, Phone } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { EditableText } from './EditableText';

interface ContactProps {
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  isEditing: boolean;
}

export const Contact: React.FC<ContactProps> = ({ 
  personalInfo, 
  onUpdatePersonalInfo, 
  isEditing 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.open(`mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-black"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300">Let's discuss your next project or opportunity</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg shadow-lg border border-gray-800"
              >
                <Mail className="w-6 h-6 text-cyan-400" />
                <div className="flex-1">
                  <p className="font-medium text-white">Email</p>
                  {isEditing ? (
                    <EditableText
                      value={personalInfo.email}
                      onChange={(value) => onUpdatePersonalInfo({ ...personalInfo, email: value })}
                      isEditing={isEditing}
                      className="text-cyan-400"
                      placeholder="Email address"
                    />
                  ) : (
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  )}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg shadow-lg border border-gray-800"
              >
                <Github className="w-6 h-6 text-cyan-400" />
                <div className="flex-1">
                  <p className="font-medium text-white">GitHub</p>
                  {isEditing ? (
                    <EditableText
                      value={personalInfo.github}
                      onChange={(value) => onUpdatePersonalInfo({ ...personalInfo, github: value })}
                      isEditing={isEditing}
                      className="text-cyan-400"
                      placeholder="GitHub URL"
                    />
                  ) : (
                    <a 
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Profile
                    </a>
                  )}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg shadow-lg border border-gray-800"
              >
                <Phone className="w-6 h-6 text-cyan-400" />
                <div className="flex-1">
                  <p className="font-medium text-white">Phone</p>
                  {isEditing ? (
                    <EditableText
                      value={personalInfo.phone}
                      onChange={(value) => onUpdatePersonalInfo({ ...personalInfo, phone: value })}
                      isEditing={isEditing}
                      className="text-cyan-400"
                      placeholder="Phone number"
                    />
                  ) : (
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg shadow-2xl p-8 border border-gray-800">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-white placeholder-gray-400"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 font-medium shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};