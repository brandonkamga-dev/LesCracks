import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface Course {
  id?: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  youtubeUrl: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
  onAnalytics?: (courseId: string, action: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index, onAnalytics }) => {
  const { isDark } = useTheme();

  const handleClick = async () => {
    // Tracker le clic sur l'API
    if (course.id) {
      try {
        await fetch(`http://localhost:5000/api/cours/${course.id}/track-click`, {
          method: 'POST'
        });
      } catch (error) {
        console.error('Erreur tracking:', error);
      }
    }

    // Analytics callback (optionnel)
    if (onAnalytics && course.id) {
      onAnalytics(course.id, 'youtube_click');
    }

    // Ouvrir YouTube dans un nouvel onglet
    window.open(course.youtubeUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="h-48 bg-[#1f48ff] flex items-center justify-center">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Play className="w-16 h-16 text-white" />
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            {course.level}
          </span>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {course.duration}
          </span>
        </div>
        
        <h3 className={`text-xl font-bold mb-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {course.title}
        </h3>
        
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {course.description}
        </p>
        
        <button
          onClick={handleClick}
          className="flex items-center justify-center space-x-2 w-full bg-[#1f48ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1a3dd9] transition-colors duration-200"
        >
          <Play className="w-5 h-5" />
          <span>Voir le cours</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
