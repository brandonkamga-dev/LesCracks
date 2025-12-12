// components/layout/Navigation.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Rocket } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/20 backdrop-blur-xl shadow-xl border-b border-white/20'
          : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo texte – taille idéale, élégant et moderne */}
          <Link to="/" className="relative flex items-center gap-2 group">
            {/* Ampoule jaune – petite mais visible */}

            {/* Texte Les Cracks */}
            <span className="text-2xl lg:text-3xl font-black tracking-tight text-white">
              Les<span className="text-yellow-400">Cracks</span>
            </span>

            {/* Halo discret au hover */}
            <div className="absolute -inset-3 bg-yellow-400/10 rounded-full scale-0 blur-xl transition-transform duration-500 group-hover:scale-100" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/programmes" active={isActive('/programmes')}>Nos Programmes</NavLink>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-5 py-3 rounded-xl text-white hover:bg-white hover:text-gray-700 transition font-medium"
              >
                Nos Ressources
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-16 left-1/2 -translate-x-1/2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-3"
                  >
                    <DropdownLink to="/guides">Guides & Livres</DropdownLink>
                    <DropdownLink to="/videos">Vidéos & Replays</DropdownLink>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/events" active={isActive('/events')}>Événements</NavLink>
            <NavLink to="/about" active={isActive('/about')}> A propos</NavLink>
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/postuler"
              className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-900 transition shadow-lg flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Postuler maintenant
            </Link>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gray-800"
          >
            {mobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-6 py-8 space-y-4">
              <MobileLink to="/programmes">Nos Programmes</MobileLink>
              <div className="pl-4 space-y-2">
                <MobileLink to="/guides">Guides & Livres</MobileLink>
                <MobileLink to="/videos">Vidéos & Replays</MobileLink>
                <MobileLink to="/blog">Blog</MobileLink>
              </div>
              <MobileLink to="/success">Success Stories</MobileLink>
              <MobileLink to="/events">Événements</MobileLink>
              <MobileLink to="/about">L'équipe</MobileLink>
              <Link to="/postuler" className="block mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center rounded-xl font-bold">
                Postuler maintenant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* Composants auxiliaires */
const NavLink = ({ to, children, active }: any) => (
  <Link
    to={to}
    className={`px-5 py-3 rounded-xl font-medium transition ${active
        ? 'text-yellow-400' // texte actif jaune
        : 'text-white hover:bg-white hover:text-gray-700' // texte blanc par défaut, hover fond blanc et texte gris
      }`}
  >
    {children}
  </Link>
);

const DropdownLink = ({ to, children }: any) => (
  <Link to={to} className="block px-6 py-3 hover:bg-blue-50 transition text-gray-700">
    {children}
  </Link>
);

const MobileLink = ({ to, children }: any) => (
  <Link to={to} className="block py-3 text-lg font-medium text-gray-800">
    {children}
  </Link>
);

export default Navigation;
