import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Nos Cours', path: '/courses' },
    { name: 'Événements', path: '/events' },
    { name: 'Accompagnement', path: '/accompagnement' },
    { name: 'À propos', path: '/about' }
  ];

  return (
    <footer className={`transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'
      }`}>
      {/* Main Footer Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src="/images/lescracks.svg"
                    alt="LesCracks Logo"
                    className="h-60 sm:h-40 w-auto"
                  />
                </div>
                <div className="mb-6">
                  <p className="text-[#f59e0b] font-bold text-lg mb-3">
                    Former • Innover • Transformer
                  </p>
                  <p className="text-gray-300 leading-relaxed max-w-md">
                    Nous accompagnons les personnes voulant construire une carrière tech
                    remarquable et se démarquer des autres pour accéder aux opportunités du monde professionnel.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-3 text-[#1f48ff]" />
                    <span>Yaoundé & Douala, Cameroun</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-5 h-5 mr-3 text-[#1f48ff]" />
                    <span>+237 650 830 057</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-5 h-5 mr-3 text-[#1f48ff]" />
                    <span>contact@lescracks.tech</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 text-white">Navigation</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-[#ffcc00] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact CTA */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-6 text-white">Nous Contacter</h3>
                <p className="text-gray-300 mb-6">
                  Prêt à démarrer votre transformation ?
                </p>
                <a
                  href="https://wa.me/237650830057?text=Bonjour ! Je veux en savoir plus sur LesCracks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  Nous contacter sur WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © {currentYear} LesCracks. Tous droits réservés.
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 text-sm"
            >
            ❤️ Fait au Cameroun
            </motion.div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
