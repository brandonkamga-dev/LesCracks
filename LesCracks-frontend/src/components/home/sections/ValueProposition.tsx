import { Book, Hammer, Briefcase, Award, Network } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: Book,
      title: 'Un apprentissage encadré, même si tu pars de zéro',
      description:
        "Nos mentors t'accompagnent pas à pas, sans prérequis. On croit en toi, même si tu démarres de rien.",
      number: '01',
    },
    {
      icon: Hammer,
      title: 'Méthode 100% pratique : tu apprends en construisant',
      description:
        'Pas de théorie interminable. Tu codes, tu crées, tu construis des projets réels dès le premier jour.',
      number: '02',
    },
    {
      icon: Briefcase,
      title: 'Accompagnement carrière complet',
      description:
        "CV, GitHub, LinkedIn, entretiens : on te guide jusqu'à ce que ton profil soit irrésistible pour les recruteurs.",
      number: '03',
    },
    {
      icon: Award,
      title: 'Un vrai profil professionnel + portfolio à la fin',
      description:
        'Tu repars avec un portfolio concret qui prouve tes compétences et impressionne les employeurs.',
      number: '04',
    },
    {
      icon: Network,
      title: 'Communauté jeune, motivée et active',
      description:
        "Rejoins des centaines de jeunes comme toi : échanges, motivation, entraide et événements réguliers.",
      number: '05',
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-black overflow-hidden">
      {/* Grille de fond subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:70px_70px] opacity-70 pointer-events-none" />

      {/* Glow bleu */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.12)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(37,99,235,0.1)_0%,_transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Titre */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Pourquoi rejoindre <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Les Cracks
            </span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            On ne fait pas que t’accompagner : on t’aide à devenir un vrai pro de la tech.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group p-8 lg:p-10 text-left relative transition-all duration-500 hover:bg-white/5"
              >
                {/* Numéro */}
                <div className="absolute top-4 right-4 text-7xl lg:text-8xl font-black text-white/5 group-hover:text-white/10 transition">
                  {value.number}
                </div>

                {/* Icône */}
                <div className="relative mb-6 inline-block">
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-14 h-14 text-white group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="mt-2 h-1 w-10 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full opacity-60" />
                </div>

                {/* Texte */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {value.title}
                </h3>

                <p className="text-gray-400 text-base leading-relaxed">
                  {value.description}
                </p>

                {/* Séparateurs */}
                {index < 3 && (
                  <div className="absolute bottom-0 left-8 right-8 border-b border-dotted border-white/15" />
                )}
                {index % 3 !== 2 && (
                  <div className="absolute top-8 bottom-8 right-0 hidden md:block border-r border-dotted border-white/15" />
                )}

                {/* Coin décoratif */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-yellow-400/0 group-hover:border-yellow-400 group-hover:w-6 group-hover:h-6 transition-all" />
              </div>
            );
          })}

          {/* Cellule vide stylisée */}
          <div className="p-8 lg:p-10 relative hidden md:flex items-center justify-center hover:bg-white/5 transition">
            <div className="opacity-40 group-hover:opacity-100 transition">
              <div className="w-14 h-14 mx-auto border-4 border-dashed border-blue-400/50 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
              </div>
              <p className="mt-3 text-gray-500 text-sm text-center">Et bien plus...</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-10 h-px bg-gray-700" />
            <span>Prêt à transformer ta carrière ?</span>
            <div className="w-10 h-px bg-gray-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
