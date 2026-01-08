// components/sections/HeroSection.tsx
import { Link } from 'react-router-dom';
import { Library } from 'lucide-react';
import { motion } from 'framer-motion';
import { PostulerForm } from '@/components/home/PostulerForm';

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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
            Devenez un
            <span className="block relative">
              <span className="relative z-10 text-primary-yellow">
                crack certifié
              </span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed opacity-95 mb-12">
            Nous vous formons et vous aidons à construire une carrière tech remarquable <span className='font-bold'>qui fait vraiment la différence</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

            {/* Bouton Postuler - taille et style identique */}
            <PostulerForm
              size="lg"
              fullWidth={false}
              className="rounded-2xl text-xl px-10 py-4"
            />

            {/* Bouton secondaire */}
            <Link
              to="/ressources"
              className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-[var(--primary)] text-white text-lg font-medium rounded-2xl transition-all duration-300 flex items-center gap-3 hover:scale-105"
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
