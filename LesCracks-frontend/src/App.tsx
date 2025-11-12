import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GlobalLoader from './components/common/GlobalLoader';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Events from './pages/Events';
import About from './pages/About';
import Accompagnement from './pages/Accompagnement';
import AdminLogin from './pages/AdminLogin';
import AdminRoutes from './pages/admin';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      {!isAdminRoute && <Navigation />}
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/accompagnement" element={<Accompagnement />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </motion.main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement initial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <GlobalLoader 
          isLoading={isLoading} 
          message="Chargement de LesCracks..." 
        />
        
        {!isLoading && (
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <AppContent />
          </div>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;