import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultLoader: React.FC = () => {
  
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative w-16 h-16">
          <motion.div
            className={`absolute inset-0 rounded-full border-4 border-t-[#1f48ff] ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Chargement...
        </p>
      </motion.div>
    </div>
  );
};

const LazyLoad: React.FC<LazyLoadProps> = ({ children, fallback }) => {
  return (
    <Suspense fallback={fallback || <DefaultLoader />}>
      {children}
    </Suspense>
  );
};

export default LazyLoad;
