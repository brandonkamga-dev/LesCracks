// src/pages/ComingSoon.tsx
import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-[#1f48ff]/20 rounded-full flex items-center justify-center">
              <Construction className="w-12 h-12 text-[#1f48ff]" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            En <span className="text-[#1f48ff]">Construction</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Cette page est en cours de développement. <br />
            <span className="text-white font-semibold">Revenez bientôt</span> pour découvrir nos nouvelles ressources et événements.
          </p>

          {/* CTA */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1f48ff] text-white text-lg font-bold rounded-xl hover:bg-[#1a3de6] hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
