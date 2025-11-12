import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Rocket } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import AnimatedGrid from '../backgrounds/AnimatedGrid';
import FloatingLights from '../backgrounds/FloatingLights';
import { useGSAPHero } from '../../hooks/useGSAPAnimation';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  slogan: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  slogan,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink
}) => {
  const { isDark } = useTheme();
  const heroRef = useGSAPHero();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedGrid />
        <FloatingLights />
      </div>

      {/* Content */}
      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="hero-title">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
              <span className="block text-[#1f48ff] mt-2">{subtitle}</span>
            </h1>
          </div>
          
          <div className="hero-subtitle">
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {description}
              <span className="block mt-3 md:mt-4 font-bold text-[#f59e0b] text-lg sm:text-xl md:text-2xl">
                {slogan}
              </span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
            <Link
              to={primaryButtonLink}
              className="hero-button w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-10 py-4 md:py-5 bg-[#1f48ff] text-white text-base md:text-lg font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
            >
              <Rocket className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
              <span className="whitespace-nowrap">{primaryButtonText}</span>
              <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6" />
            </Link>
            
            <Link
              to={secondaryButtonLink}
              className={`hero-button w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-10 py-4 md:py-5 border-2 border-[#1f48ff] text-[#1f48ff] text-base md:text-lg font-bold rounded-xl hover:bg-[#1f48ff] hover:text-white transition-all duration-300 hover:scale-105 ${
                isDark ? 'hover:bg-[#1f48ff]' : ''
              }`}
            >
              <Play className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
              <span className="whitespace-nowrap">{secondaryButtonText}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
