// components/sections/RessourcesSection.tsx
import { motion } from "framer-motion";
import { Book, Video, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RessourcesSection = () => {
  const ressources = [
    {
      icon: Book,
      title: "Bibliothèque de guides",
      description:
        "Guides, fiches pratiques, mini-livres et ressources pédagogiques pour apprendre les fondamentaux à ton rythme.",
      link: "/guides",
    },
    {
      icon: Video,
      title: "Vidéothèque éducative",
      description:
        "Tutoriels, explications claires, vidéos pas à pas et replays des sessions premium.",
      link: "/videos",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F9FAFB] relative overflow-hidden">
      {/* Grille de fond */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Nos <span className="text-primary-yellow">ressources</span>
          </h2>
          <p className="mt-4 text-lg lg:text-xl text-slate-600 font-light max-w-3xl mx-auto">
            Deux espaces conçus pour t'aider à progresser, gratuitement et à ton rythme.
          </p>
        </motion.div>

        {/* Grille */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-dashed border-black/20 rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm">
            {ressources.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-10 lg:p-14 group relative transition-all duration-300"
                >
                  {/* Séparateur vertical */}
                  {index === 0 && (
                    <div className="absolute top-8 bottom-8 right-0 hidden lg:block border-r border-dashed border-black/20" />
                  )}

                  {/* Icône */}
                  <div className="mb-6 inline-block">
                    <div className="w-24 h-24 rounded-2xl bg-primary-blue/10 flex items-center justify-center transition-all duration-300">
                      <Icon
                        className="w-16 h-16 text-primary-blue transition-colors"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-yellow transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-md">
                    {item.description}
                  </p>

                  {/* Lien */}
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-primary-blue font-semibold
                    hover:text-primary-yellow 
                    text-base hover:gap-3 transition-all"
                  >
                    Accéder
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  {/* Coin décoratif */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t border-l border-primary-blue/0 group-hover:border-primary-blue group-hover:w-10 group-hover:h-10 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-16">
          <p className="text-base text-slate-600 mb-8 max-w-2xl mx-auto">
            👉 Idéal pour apprendre, pratiquer, découvrir et progresser gratuitement.
          </p>

          <Link
            to="/ressources"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-blue text-white text-lg font-bold rounded-xl transition-all hover:scale-105 hover:bg-primary-yellow hover:text-slate-900"
          >
            <Gift className="w-6 h-6" />
            Explorer toutes les ressources
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RessourcesSection;
