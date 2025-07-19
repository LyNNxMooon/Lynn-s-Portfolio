import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  isEditing,
  className = '',
  placeholder = '',
  multiline = false
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    onChange(localValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.currentTarget.blur();
    }
  };

  if (!isEditing) {
    return <span className={className}>{value || placeholder}</span>;
  }

  return (
    <motion.div
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      className="relative"
    >
      {multiline ? (
        <textarea
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${className} bg-gray-800 border-2 border-purple-500 rounded-md px-2 py-1 focus:outline-none focus:border-cyan-400 resize-none text-white`}
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${className} bg-gray-800 border-2 border-purple-500 rounded-md px-2 py-1 focus:outline-none focus:border-cyan-400 text-white`}
        />
      )}
    </motion.div>
  );
};