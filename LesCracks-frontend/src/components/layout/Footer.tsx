import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { PostulerForm } from '@/components/home/PostulerForm';

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo + accroche */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-black tracking-tight flex items-center">
            Les<span className="text-primary-yellow">Cracks</span>
          </Link>
          <p className="text-gray-400 max-w-sm">
            Formez-vous, construisez votre carrière tech et rejoignez une communauté qui transforme vraiment votre avenir.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="hover:text-primary-yellow transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-primary-yellow transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-primary-yellow transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-primary-yellow transition"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white/90">Liens utiles</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/accompagnement" className="hover:text-primary-yellow transition">Nos Programmes</Link></li>
            <li><Link to="/ressources" className="hover:text-primary-yellow transition">Guides & Livres</Link></li>
            <li><Link to="/ressources" className="hover:text-primary-yellow transition">Vidéos & Replays</Link></li>
            <li><Link to="/evenements" className="hover:text-primary-yellow transition">Événements</Link></li>
            <li><Link to="/a-propos" className="hover:text-primary-yellow transition">À propos</Link></li>
          </ul>
        </div>

        {/* CTA & Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-2 text-white/90">Rejoignez-nous</h3>
          <p className="text-gray-400">Postulez dès maintenant et commencez votre parcours tech.</p>
          <PostulerForm />
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
