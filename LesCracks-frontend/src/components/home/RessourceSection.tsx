// components/sections/RessourcesSection.tsx
import { motion } from 'framer-motion';
import { Book, Video, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RessourcesSection = () => {
  const ressources = [
    {
      icon: Book,
      title: 'Bibliothèque de guides',
      description:
        'Guides, fiches pratiques, mini-livres et ressources pédagogiques pour apprendre les fondamentaux à ton rythme.',
      link: '/guides',
    },
    {
      icon: Video,
      title: 'Vidéothèque éducative',
      description:
        'Tutoriels, explications claires, vidéos pas à pas et replays des sessions premium.',
      link: '/videos',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-black relative overflow-hidden">

      {/* Grille fond plus légère */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glows doux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(59,130,246,0.12)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(234,179,8,0.07)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            📚 Nos <span className="text-yellow-400">ressources gratuites</span>
          </h2>
          <p className="mt-4 text-lg lg:text-xl text-gray-400 font-light max-w-3xl mx-auto">
            Deux espaces conçus pour t’aider à progresser, gratuitement et à ton rythme.
          </p>
        </motion.div>

        {/* Grille */}
        <div className="relative">
          <div className="absolute inset-0  pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {ressources.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-10 lg:p-14 group relative hover:bg-white/5 transition-all duration-400"
                >
                  {/* Ligne verticale séparatrice */}
                  {index === 0 && (
                    <div className="absolute top-8 bottom-8 right-0 hidden lg:block border-r border-dashed border-white/15" />
                  )}

                  {/* Icône */}
                  <div className="mb-6 inline-block">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500/40 transition-all duration-300">
                      <Icon className="w-9 h-9 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-md">
                    {item.description}
                  </p>

                  {/* Lien */}
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-yellow-400 font-semibold text-base hover:gap-3 transition-all"
                  >
                    Accéder
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  {/* Petit coin décoratif */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t border-l border-yellow-400/0 group-hover:border-yellow-400 group-hover:w-10 group-hover:h-10 transition-all duration-400" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-14">
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto">
            👉 Idéal pour apprendre, pratiquer, découvrir et progresser gratuitement.
          </p>

          <Link
            to="/ressources"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
          >
            <Gift className="w-6 h-6" />
            <span className="relative z-10 flex items-center gap-2">
              Explorer toutes les ressources
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RessourcesSection;
