// components/sections/ProgrammesSection.tsx
import { motion } from 'framer-motion';
import { 
  Code2, 
  CircuitBoard, 
  Server, 
  Shield, 
  GraduationCap, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgrammesSection = () => {
  const formations = [
    {
      icon: Code2,
      title: 'Développement Web',
      description: 'Apprends React, Node.js et les technologies modernes pour créer des applications rapides et élégantes.',
      gradient: 'from-blue-400 to-cyan-400',
    },
    {
      icon: CircuitBoard,
      title: 'Data & Intelligence Artificielle',
      description: 'Manipulation de données, IA, modèles modernes et Python appliqué aux vrais problèmes.',
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      icon: Server,
      title: 'Réseaux & Systèmes',
      description: 'Serveurs, Linux, cloud, automatisation et architecture moderne.',
      gradient: 'from-green-400 to-emerald-400',
    },
    {
      icon: Shield,
      title: 'Cybersécurité',
      description: 'Sécurisation, détection des menaces, tests et bonnes pratiques du monde réel.',
      gradient: 'from-red-400 to-orange-400',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-blue-950 relative overflow-hidden">
      {/* Grille de fond légère */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:70px_70px] opacity-70 pointer-events-none" />

      {/* Glow assoupli */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,_rgba(59,130,246,0.18)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(147,197,253,0.15)_0%,_transparent_55%)]" />

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
            Nos 
            <span className="text-yellow-400"> Programmes</span>
          </h2>
          <p className="mt-4 text-lg lg:text-xl text-blue-200 font-light max-w-3xl mx-auto">
            Des parcours structurés pour t’amener au niveau pro, même si tu démarres de zéro.
          </p>
        </motion.div>

        {/* Tableau */}
        <div className="relative">
          <div className="absolute inset-0 border border-dashed border-white/25 rounded-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Formations */}
            <div className="p-8 lg:p-14">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                Formations pratiques
              </h3>
              <p className="text-base text-blue-100 leading-relaxed mb-10">
                4 domaines clés, projets concrets, accompagnement personnalisé.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {formations.map((formation, index) => {
                  const Icon = formation.icon;
                  return (
                    <div key={index} className="p-6 group relative">
                      
                      {index < 2 && (
                        <div className="absolute bottom-0 left-6 right-6 border-b border-dashed border-white/25" />
                      )}
                      {index % 2 === 0 && (
                        <div className="absolute top-6 bottom-6 right-0 hidden sm:block border-r border-dashed border-white/25" />
                      )}

                      <div className="mb-4 inline-block">
                        <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:border-white/35 transition-all">
                          <Icon className="w-9 h-9 text-white group-hover:text-yellow-400 transition-colors" strokeWidth={2} />
                        </div>
                      </div>

                      <h4 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {formation.title}
                      </h4>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        {formation.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accompagnement */}
            <div className="p-8 lg:p-14 bg-black/20 backdrop-blur-md border-l border-dashed border-white/25">
              <div className="mb-10">
                <div className="w-16 h-16 rounded-xl bg-yellow-400 flex items-center justify-center shadow-xl mb-5">
                  <GraduationCap className="w-10 h-10 text-black" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Accompagnement 360°
                </h3>
                <p className="text-base text-blue-100 leading-relaxed mb-6">
                  Un suivi complet pour construire un profil irrésistible pour les recruteurs.
                </p>
              </div>

              <ul className="space-y-4 text-blue-100 text-base">
                <li className="flex items-start gap-3">
                  <div className="mt-2 w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>Portfolio professionnel complet</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>CV et LinkedIn optimisés</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>GitHub propre et pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>Coaching entretiens techniques + RH</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>Stage optionnel en entreprise</span>
                </li>
              </ul>

              <p className="mt-10 text-blue-300 italic text-base">
                On te forme et on t’accompagne jusqu’à ta réussite.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-3 text-yellow-400 font-bold text-lg hover:gap-4 transition-all"
          >
            Voir tous les détails des programmes
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesSection;
