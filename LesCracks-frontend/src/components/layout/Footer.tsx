// components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo + accroche */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-black tracking-tight flex items-center">
            Les<span className="text-yellow-400">Cracks</span>
          </Link>
          <p className="text-gray-400 max-w-sm">
            Formez-vous, construisez votre carrière tech et rejoignez une communauté qui fait vraiment la différence.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="hover:text-yellow-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/programmes" className="hover:text-yellow-400 transition">Nos Programmes</Link></li>
            <li><Link to="/guides" className="hover:text-yellow-400 transition">Guides & Livres</Link></li>
            <li><Link to="/videos" className="hover:text-yellow-400 transition">Vidéos & Replays</Link></li>
            <li><Link to="/events" className="hover:text-yellow-400 transition">Événements</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400 transition">À propos</Link></li>
          </ul>
        </div>

        {/* CTA & Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-2">Rejoignez-nous</h3>
          <p className="text-gray-400">Postulez dès maintenant et commencez votre parcours tech.</p>
          <Link
            to="/postuler"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl font-bold hover:from-blue-700 hover:to-blue-900 transition shadow-lg text-white"
          >
            Postuler maintenant
          </Link>
          <p className="text-gray-500 text-sm mt-6">
            &copy; {new Date().getFullYear()} Les Cracks. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Ligne séparatrice */}
      <div className="border-t border-white/10 mt-12"></div>
    </footer>
  );
};

export default Footer;
