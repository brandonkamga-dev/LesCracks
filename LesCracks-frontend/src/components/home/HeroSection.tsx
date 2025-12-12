// components/sections/HeroSection.tsx
import { Link } from 'react-router-dom';
import { ArrowRight, Library } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Les Cracks – Formation tech sérieuse et efficace"
          className="w-full h-full object-cover"
        />
        {/* Overlay sombre léger pour lisibilité */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Titre principal – sobre et impactant */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
            Devenez un
            <span className="block relative">
              <span className="relative z-10 text-yellow-400">
                crack certifié
              </span>
            </span>
          </h1>

          {/* Sous-titre ultra-clair – on dit exactement ce qu’on fait */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed opacity-95 mb-12">
            Nous vous formons et vous aidons à construire une carrière tech remarquable <span className='font-bold'>qui fait vraiment la différence</span>
          </p>

          {/* CTA – 2 boutons parfaitement logiques et sans redondance */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

            {/* Bouton principal – bleu → jaune au hover */}
            <Link
              to="/programmes"
              className="group relative px-10 py-6 bg-blue-600 text-white text-xl font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
            >
              <span className="relative z-10 flex items-center gap-3">
                Découvrir nos programmes
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              {/* Effet jaune qui monte au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>

            {/* Bouton secondaire – transparent */}
            <Link
              to="/ressources"
              className="px-10 py-6 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white text-xl font-medium rounded-2xl hover:bg-white/20 hover:border-white/60 transition-all duration-300 flex items-center gap-3 hover:scale-105"
            >
              <Library className="w-6 h-6" />
              Explorer nos ressources
            </Link>
          </div>

        </motion.div>
      </div>

      {/* Scroll indicator discret */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-9 border-2 border-white/40 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;