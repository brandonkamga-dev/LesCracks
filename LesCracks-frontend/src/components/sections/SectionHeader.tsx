import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = "" }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`text-center mb-16 ${className}`}
    >
      <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h2>
      <p className={`text-xl max-w-3xl mx-auto ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
