import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle, ArrowRight, Clock, Target, Award } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

const Accompagnement: React.FC = () => {

  const accompagnementInfo = {
    title: 'Accompagnement Sur Mesure',
    description: 'Un accompagnement personnalisé qui s\'adapte à vos besoins, objectifs et budget. Chaque parcours est unique.',
    basePrice: '5,000 FCFA/mois',
    features: [
      'Évaluation initiale complète et gratuite',
      'Plan de développement 100% personnalisé',
      'Sessions de mentoring adaptées à votre rythme',
      'Projets pratiques alignés sur vos objectifs',
      'Suivi de progression continu',
      'Accès prioritaire à tous nos événements',
      'Support technique et carrière illimité',
      'Révision CV, portfolio et préparation entretiens',
      'Accompagnement post-formation (3 mois)',
      'Garantie satisfaction ou remboursement'
    ]
  };

  const process = [
    {
      step: '01',
      title: 'Évaluation Initiale',
      description: 'Entretien approfondi pour comprendre vos objectifs, compétences actuelles et aspirations professionnelles.',
      duration: '1-2 heures',
      icon: Target
    },
    {
      step: '02',
      title: 'Plan Personnalisé',
      description: 'Création d\'un plan d\'accompagnement sur mesure avec objectifs clairs et timeline réaliste.',
      duration: '2-3 jours',
      icon: User
    },
    {
      step: '03',
      title: 'Accompagnement Actif',
      description: 'Sessions régulières de coaching, mentoring et suivi de progression avec ajustements si nécessaire.',
      duration: 'Selon programme',
      icon: Clock
    },
    {
      step: '04',
      title: 'Suivi Post-Formation',
      description: 'Support continu même après la fin du programme pour assurer votre réussite à long terme.',
      duration: '3-6 mois',
      icon: Award
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Accompagnement
              <span className="block text-[#1f48ff]">Sur Mesure</span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Un accompagnement personnalisé qui s'adapte à vos besoins, objectifs et budget.
              <span className="block mt-2 font-semibold text-[#1f48ff]">
                À partir de 5,000 FCFA/mois
              </span>
            </p>
            <a
              href="https://wa.me/237650830057?text=Bonjour ! Je veux commencer mon évaluation gratuite avec LesCracks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 md:py-5 bg-[#25D366] text-white text-base md:text-lg font-bold rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <WhatsAppIcon className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
              <span className="whitespace-nowrap">Commencer mon évaluation gratuite</span>
              <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Accompagnement Section */}
      <section className={`py-12 md:py-16 lg:py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Un Seul Tarif, Mille Possibilités
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Notre accompagnement s'adapte entièrement à vos besoins et objectifs spécifiques
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border ${
              isDark 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}
          >
            <div className="text-center mb-8 md:mb-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1f48ff] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {accompagnementInfo.title}
              </h3>
              <p className={`text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {accompagnementInfo.description}
              </p>
              
              <div className="bg-[#1f48ff] text-white rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
                <div className="text-xs sm:text-sm uppercase tracking-wide opacity-90 mb-2">Tarif de base</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{accompagnementInfo.basePrice}</div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">Ajustable selon vos besoins et budget</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              {accompagnementInfo.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#1f48ff] mr-2 md:mr-3 mt-0.5 md:mt-1 flex-shrink-0" />
                  <span className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://wa.me/237650830057?text=Bonjour ! Je veux commencer l'accompagnement sur mesure LesCracks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#25D366] text-white text-sm sm:text-base font-bold rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <WhatsAppIcon className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Choisir cette formule sur WhatsApp</span>
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Notre Processus
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Un accompagnement structuré en 4 étapes pour garantir votre réussite
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`text-center p-6 md:p-8 rounded-xl transition-all duration-300 ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className="relative mb-4 md:mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#1f48ff] rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <step.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 bg-[#ffcc00] text-black rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                
                <p className={`mb-3 md:mb-4 text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
                
                <div className={`text-xs sm:text-sm font-semibold ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Durée: {step.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Pourquoi Choisir Notre Accompagnement ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-center p-8 rounded-xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <div className="w-16 h-16 bg-[#1f48ff] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                100% Personnalisé
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Chaque parcours est unique et adapté à vos objectifs spécifiques et votre niveau de départ.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-center p-8 rounded-xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <div className="w-16 h-16 bg-[#1f48ff] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Flexible
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Horaires adaptés à votre emploi du temps et rythme d'apprentissage respecté.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-center p-8 rounded-xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <div className="w-16 h-16 bg-[#1f48ff] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Résultats Garantis
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Satisfaction garantie ou remboursement. Nous nous engageons sur vos résultats.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1f48ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Prêt à transformer votre carrière ?
            </h2>
            
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Commencez par une évaluation gratuite pour découvrir comment nous pouvons vous accompagner.
              <span className="block mt-2 font-semibold text-[#ffcc00]">
                Premier entretien offert • Sans engagement
              </span>
            </p>
            
            <a
              href="https://wa.me/237650830057?text=Bonjour ! Je veux démarrer mon évaluation gratuite avec LesCracks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-[#25D366] text-white text-lg font-bold rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <WhatsAppIcon className="mr-3 w-6 h-6" />
              Démarrer mon évaluation sur WhatsApp
              <ArrowRight className="ml-3 w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Accompagnement;
