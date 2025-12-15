// components/sections/FinalCtaSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCtaSection = () => {
  return (
    <section className="relative py-32 lg:py-40 bg-black overflow-hidden">
      {/* Fond avec gradient + grille subtile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/50 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(234,179,8,0.25)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,_rgba(59,130,246,0.25)_0%,_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Titre */}
          <h2 className="text-5xl sm:text-6xl lg:text-6xl font-black text-white leading-tight mb-8">
            Prêt à devenir un
            <br />
            <span className="text-yellow-400">crack</span> et
            <br />
            lancer ta carrière tech ?
          </h2>

          {/* Sous-titre */}
          <p className="text-xl lg:text-3xl text-gray-300 font-light max-w-4xl mx-auto mb-16 lg:mb-20">
            Rejoins des centaines de jeunes qui ont déjà transformé leur vie.
            <br className="hidden sm:block" />
            <span className="font-bold text-yellow-400">Il ne manque que toi.</span>
          </p>

          {/* CTA principal */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/postuler"
              className="group relative inline-flex items-center gap-4 px-12 py-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-2xl lg:text-3xl font-black rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/30 hover:shadow-blue-600/50 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-4">
                <Rocket className="w-10 h-10 group-hover:rotate-12 transition-transform" />
                Postuler maintenant
                <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" />
              </span>

              {/* Effet jaune */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </motion.div>

          {/* Texte rassurant */}
          <p className="mt-12 text-lg lg:text-xl text-gray-400 font-light">
            Aucun prérequis ? On commence à zéro ensemble.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
