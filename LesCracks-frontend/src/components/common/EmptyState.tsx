import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  actionText, 
  onAction 
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16"
    >
      <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <Icon className={`w-12 h-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
      
      <h3 className={`text-2xl font-bold mb-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      
      <p className={`text-lg mb-8 max-w-md mx-auto ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {description}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 bg-[#1f48ff] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
