// components/sections/ProgrammesSection.tsx
import { motion } from "framer-motion";
import {
  Code2,
  CircuitBoard,
  Server,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProgrammesSection = () => {
  const domaines = [
    {
      icon: Code2,
      title: "Développement Web",
      description:
        "React, Node.js et outils modernes pour construire des applications professionnelles.",
    },
    {
      icon: CircuitBoard,
      title: "Data & Intelligence Artificielle",
      description:
        "Analyse de données, Python, modèles IA et résolution de problèmes concrets.",
    },
    {
      icon: Server,
      title: "Réseaux & Systèmes",
      description:
        "Linux, serveurs, cloud, automatisation et architectures modernes.",
    },
    {
      icon: Shield,
      title: "Cybersécurité",
      description:
        "Sécurité offensive et défensive, audits, bonnes pratiques terrain.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#020617] relative overflow-hidden">
      {/* Background doux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Nos <span className="text-primary-yellow/90">Programmes</span>
          </h2>
          <p className="mt-4 text-lg lg:text-xl text-gray-400 font-light max-w-3xl mx-auto">
            Deux niveaux de programmes, un seul objectif : te rendre compétent et
            employable.
          </p>
        </motion.div>

        {/* Programmes */}
        <div className="relative">
          <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* PROGRAMME 1 */}
            <div className="p-8 lg:p-14">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-yellow/90 mb-3">
                Programme 1 — Formation pratique
              </h3>
              <p className="text-base text-gray-400 leading-relaxed mb-10 max-w-xl">
                Apprentissage technique intensif basé sur la pratique, les
                projets réels et les standards du marché.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {domaines.map((domaine, index) => {
                  const Icon = domaine.icon;
                  return (
                    <div key={index} className="relative p-6 group">
                      {/* séparateur horizontal léger */}
                      {index < 2 && (
                        <div className="absolute bottom-0 left-6 right-6 border-b border-white/10" />
                      )}

                      <div className="mb-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                          <Icon className="w-8 h-8 text-primary-blue/90 group-hover:text-primary-yellow transition-colors" />
                        </div>
                      </div>

                      <h4 className="text-lg lg:text-xl font-semibold text-white mb-2 group-hover:text-primary-yellow transition-colors">
                        {domaine.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {domaine.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-8 text-gray-400 italic">
                Idéal si tu veux te former sérieusement et monter en compétence
                technique.
              </p>
            </div>

            {/* PROGRAMME 2 */}
            <div className="p-8 lg:p-14 bg-white/5 backdrop-blur-sm border-l border-white/10">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-yellow/90 mb-3">
                Programme 2 — Formation + Accompagnement 360°
              </h3>
              <p className="text-base text-gray-400 leading-relaxed mb-6 max-w-xl">
                Tout le contenu du Programme 1, avec un accompagnement complet
                jusqu’à ton insertion professionnelle.
              </p>

              <p className="mb-4 text-primary-yellow/90 font-semibold">
                Inclus en plus de la formation technique :
              </p>

              <ul className="space-y-4 text-gray-300 text-base">
                {[
                  "Portfolio professionnel (projets réels)",
                  "CV et LinkedIn optimisés",
                  "GitHub structuré et professionnel",
                  "Coaching entretiens techniques & RH",
                  "Stage ou immersion professionnelle (optionnel)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-primary-yellow rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-gray-400 italic">
                On ne te forme pas seulement. On t’emmène jusqu’au niveau
                recrutable.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/accompagnement"
            className="inline-flex items-center gap-3 text-primary-yellow/90 hover:text-primary-yellow font-semibold text-lg transition-all"
          >
            Voir le détail des 2 programmes
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesSection;
