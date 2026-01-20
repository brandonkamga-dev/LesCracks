import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

const About: React.FC = () => {
  const [openFAQs, setOpenFAQs] = useState<boolean[]>(new Array(6).fill(false));

  const faqs = [
    {
      question: "Qu'est-ce que LesCracks ?",
      answer: "LesCracks est une agence éducative dédiée à la formation en technologie, avec des programmes intensifs et pratiques pour aider les jeunes talents à bâtir des carrières solides."
    },
    {
      question: "Qui peut rejoindre LesCracks ?",
      answer: "Tous ceux qui veulent se lancer dans la tech, débutants ou avec des bases. La pédagogie s’adapte au niveau de chacun."
    },
    {
      question: "Quels sont vos domaines de formation ?",
      answer: "Développement Web Full Stack, Mobile, Intelligence Artificielle, Data Science et Cybersécurité, selon les besoins actuels du marché."
    },
    {
      question: "Comment se déroule l'accompagnement ?",
      answer: "Pratique intensive, mentor dédié, projets concrets, suivi personnalisé et accès au réseau professionnel pour faciliter l’insertion."
    },
    {
      question: "Quels sont les tarifs ?",
      answer: "Tarifs variables selon durée et intensité du programme. Facilités de paiement et bourses pour profils méritants."
    },
    {
      question: "Comment s'inscrire ?",
      answer: "Contactez-nous via WhatsApp ou via le formulaire du site. Un entretien permettra d’évaluer votre niveau et de vous guider dans le processus."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* HERO */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            À Propos de <span className="text-primary-yellow">LesCracks</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Nous formons les futurs acteurs du numérique à travers des programmes axés sur la pratique, la rigueur et la progression mesurable.
          </motion.p>
        </div>
      </section>

      {/* FONDATEUR */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-92 h-92 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/20">
              <img
                src="/images/photo-brandon.jpeg"
                alt="Brandon Kamga - Fondateur"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">Brandon Kamga</h3>
            <p className="text-lg font-semibold text-primary-yellow mb-6">
              Formateur • Développeur Full Stack • Passionné ML
            </p>
            <div className="space-y-4 text-gray-300 mb-8">
              <p>Fondateur et formateur passionné, expert en développement Full Stack et Machine Learning, dédié à l'accompagnement des jeunes talents africains.</p>
              <p><span className="font-semibold text-white">Le constat :</span> beaucoup de jeunes négligent leur profil et manquent d'encadrement structuré.</p>
              <p><span className="font-semibold text-white">La solution :</span> un accompagnement pratique, structuré et orienté marché pour rendre les jeunes employables.</p>
            </div>
            <a
              href="https://wa.me/237650830057?text=Bonjour Brandon !"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-yellow text-black rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300"
            >
              <WhatsAppIcon className="w-5 h-5 mr-2" />
              Contacter Brandon
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Questions <span className="text-primary-yellow">Fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur LesCracks et nos programmes
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQs(prev => prev.map((val, i) => i === idx ? !val : val))}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFAQs[idx] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary-yellow" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQs[idx] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-gray-300"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1f48ff]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              Prêt à transformer ta carrière tech ?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/237650830057?text=Bonjour ! Je veux en savoir plus sur LesCracks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-yellow text-black text-lg font-bold rounded-xl hover:bg-yellow-500 transition-all shadow-lg"
              >
                <WhatsAppIcon className="mr-3 w-6 h-6" />
                Nous contacter
                <ArrowRight className="ml-3 w-6 h-6" />
              </a>
              <Link
                to="/accompagnement"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-bold rounded-xl hover:bg-white hover:text-[#1f48ff] transition-all"
              >
                Voir nos programmes
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
