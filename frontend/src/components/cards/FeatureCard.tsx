import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`text-center p-8 rounded-xl transition-all duration-300 hover:shadow-lg ${
        isDark ? 'bg-gray-900 hover:bg-gray-700' : 'bg-white hover:shadow-xl'
      }`}
    >
      <div className="w-16 h-16 bg-[#1f48ff] rounded-xl flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className={`text-xl font-bold mb-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
