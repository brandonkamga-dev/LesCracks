import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const FloatingLights: React.FC = () => {
  const { isDark } = useTheme();

  const lights = [
    { size: 400, x: '10%', y: '20%', delay: 0, duration: 20 },
    { size: 300, x: '80%', y: '60%', delay: 2, duration: 25 },
    { size: 350, x: '50%', y: '80%', delay: 4, duration: 22 },
    { size: 250, x: '70%', y: '10%', delay: 1, duration: 18 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lights.map((light, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: light.size,
            height: light.size,
            left: light.x,
            top: light.y,
            background: isDark
              ? 'radial-gradient(circle, rgba(31, 72, 255, 0.15) 0%, rgba(31, 72, 255, 0) 70%)'
              : 'radial-gradient(circle, rgba(31, 72, 255, 0.08) 0%, rgba(31, 72, 255, 0) 70%)',
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: light.duration,
            delay: light.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingLights;
