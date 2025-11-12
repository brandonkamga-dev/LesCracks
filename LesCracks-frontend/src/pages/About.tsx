import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, ArrowRight, Code, Globe, Rocket, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { useTheme } from '../contexts/ThemeContext';

const About: React.FC = () => {
  const { isDark } = useTheme();

  const pillars = [
    {
      icon: Code,
      title: 'Approche pratique',
      subtitle: '80 % de pratique, 20 % de théorie',
      description: 'Chaque concept est immédiatement appliqué à travers des projets concrets et pertinents.'
    },
    {
      icon: Target,
      title: 'Structure et méthode',
      subtitle: 'Apprentissage progressif',
      description: 'Un apprentissage progressif, étape par étape, pour garantir une montée en compétence claire et durable.'
    },
    {
      icon: Globe,
      title: 'Pertinence marché',
      subtitle: 'Aligné avec les besoins réels',
      description: 'Des programmes conçus en lien avec les tendances et besoins réels du secteur technologique.'
    },
    {
      icon: Award,
      title: 'Excellence et discipline',
      subtitle: 'Culture de la qualité',
      description: 'Une culture d\'effort, de constance et de qualité pour former des profils capables de performer à haut niveau.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Rigueur et exigence',
      description: 'Chaque apprentissage est orienté vers des résultats concrets et mesurables.'
    },
    {
      icon: TrendingUp,
      title: 'Apprentissage continu',
      description: 'Nous évoluons avec la technologie pour offrir des méthodes toujours actuelles et pertinentes.'
    },
    {
      icon: Zap,
      title: 'Impact réel',
      description: 'Chaque projet doit créer de la valeur : pour l\'apprenant, pour l\'entreprise, et pour la communauté.'
    },
    {
      icon: Heart,
      title: 'Humanité et engagement',
      description: 'Nous croyons à un accompagnement humain, accessible et bienveillant, au service de la réussite individuelle.'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-5xl lg:text-6xl font-bold mb-8 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              À propos de
              <span className="block text-[#1f48ff]">LesCracks</span>
            </h1>
            
            <div className="mb-12">
              <p className="text-[#f59e0b] font-bold text-2xl mb-6">
                Former • Innover • Transformer
              </p>
              <p className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                LesCracks est une agence éducative dédiée à celles et ceux qui veulent construire une carrière solide dans la technologie.
              </p>
              <p className={`text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mt-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Nous aidons les débutants à apprendre de manière claire, pratique et structurée pour devenir des professionnels visibles et compétents dans le monde numérique.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`p-8 rounded-2xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              } shadow-lg`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#1f48ff] rounded-lg flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-3xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Notre Mission
                </h2>
              </div>
              <p className={`text-lg leading-relaxed mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Démocratiser l'accès aux compétences technologiques grâce à une approche concrète et structurée.
              </p>
              <p className={`text-base leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Nous formons les futurs acteurs du numérique à travers des programmes axés sur la pratique, la rigueur et la progression mesurable. Chaque apprenant est guidé pour transformer ses connaissances en compétences réelles et exploitables.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`p-8 rounded-2xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              } shadow-lg`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#f59e0b] rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-3xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Notre Vision
                </h2>
              </div>
              <p className={`text-lg leading-relaxed mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Devenir la référence en matière d'apprentissage tech structuré en Afrique et au-delà.
              </p>
              <p className={`text-base leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Nous voulons connecter les talents émergents aux opportunités du marché technologique mondial tout en favorisant un apprentissage ancré dans la réalité des besoins des entreprises.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Nos Piliers
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Les fondements de notre approche pédagogique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                } hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-14 h-14 bg-[#1f48ff] rounded-lg flex items-center justify-center mb-4">
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {pillar.title}
                </h3>
                <p className={`text-sm font-semibold mb-3 ${
                  isDark ? 'text-[#f59e0b]' : 'text-[#1f48ff]'
                }`}>
                  {pillar.subtitle}
                </p>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Nos Valeurs
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Les principes qui guident chacune de nos actions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-900' : 'bg-white'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-12 h-12 bg-[#1f48ff] rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`p-12 rounded-2xl ${
              isDark ? 'bg-gray-800' : 'bg-[#1f48ff]'
            } text-white text-center`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Notre Approche
            </h2>
            <p className="text-2xl font-semibold mb-6">
              Apprendre en construisant. Évoluer en créant.
            </p>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-4">
              Nos formations reposent sur des projets réels, inspirés des besoins concrets du marché. Chaque participant développe un portfolio professionnel solide et apprend à se positionner comme un acteur crédible dans la tech.
            </p>
            <p className="text-xl font-semibold mt-8 max-w-3xl mx-auto">
              Chez LesCracks, on n'apprend pas la théorie pour la théorie : on apprend pour agir, créer et bâtir une carrière durable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Prêt à transformer ta carrière tech ?
            </h2>
            <p className={`text-xl mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Rejoins une communauté de créateurs qui apprennent, progressent et construisent ensemble.
              <span className="block mt-2 font-semibold text-[#f59e0b]">
                Découvrez comment nous pouvons vous accompagner dans votre transformation
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://wa.me/237650830057?text=Bonjour ! Je veux en savoir plus sur LesCracks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 bg-[#25D366] text-white text-lg font-bold rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <WhatsAppIcon className="mr-3 w-6 h-6" />
                Nous contacter sur WhatsApp
                <ArrowRight className="ml-3 w-6 h-6" />
              </a>
              
              <Link
                to="/accompagnement"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-[#1f48ff] text-[#1f48ff] text-lg font-bold rounded-xl hover:bg-[#1f48ff] hover:text-white transition-all duration-300"
              >
                <Rocket className="mr-3 w-6 h-6" />
                Voir nos programmes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
