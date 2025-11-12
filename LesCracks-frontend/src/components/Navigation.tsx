import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Rocket } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Nos Cours', path: '/courses' },
    { name: 'Événements', path: '/events' },
    { name: 'Accompagnement', path: '/accompagnement' },
    { name: 'À propos', path: '/about' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? isDark 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-700'
            : 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-100'
          : isDark
            ? 'bg-gray-900/90 backdrop-blur-sm'
            : 'bg-white/90 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              className="flex items-center cursor-pointer relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <img 
                src="/images/lescracks.svg" 
                alt="LesCracks Logo" 
                className="h-56 sm:h-40 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <motion.span
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'bg-[#1f48ff] text-white'
                      : isDark
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <Link
              to="/accompagnement"
              className="inline-flex items-center px-6 py-3 bg-[#1f48ff] text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              <Rocket className="mr-2 w-5 h-5" />
              Commencer
            </Link>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-yellow-400' : 'text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </motion.button>
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#1f48ff]'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={`lg:hidden fixed inset-0 top-16 sm:top-20 z-40 ${
                isDark 
                  ? 'bg-gray-900 backdrop-blur-md' 
                  : 'bg-white backdrop-blur-md'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 px-6 py-8 space-y-4">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block"
                    >
                      <motion.div
                        className={`p-4 rounded-xl transition-all ${
                          isActivePath(item.path)
                            ? 'bg-[#1f48ff] text-white shadow-lg'
                            : isDark
                              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                      >
                        <span className="text-xl font-bold">{item.name}</span>
                      </motion.div>
                    </Link>
                  ))}
                  
                  <div className="pt-8">
                    <Link
                      to="/accompagnement"
                      className="flex items-center justify-center w-full px-8 py-4 bg-[#1f48ff] text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Rocket className="mr-2 w-5 h-5" />
                      Commencer
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navigation;
