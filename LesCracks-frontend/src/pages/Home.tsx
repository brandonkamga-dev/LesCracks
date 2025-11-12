import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Target, Globe, Rocket, Calendar, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import HeroSection from '../components/sections/HeroSection';
import SectionHeader from '../components/sections/SectionHeader';
import FeatureCard from '../components/cards/FeatureCard';
import CourseCard, { Course } from '../components/cards/CourseCard';
import EventCard, { Event } from '../components/cards/EventCard';
import AnimatedGrid from '../components/backgrounds/AnimatedGrid';
import FloatingLights from '../components/backgrounds/FloatingLights';
import { useGSAPHero, useGSAPStagger } from '../hooks/useGSAPAnimation';

const Home: React.FC = () => {
  const { isDark } = useTheme();
  const [courses, setCourses] = useState<Course[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les cours publics
        const coursesResponse = await fetch('http://localhost:5000/api/cours/public');
        const coursesData = await coursesResponse.json();
        
        // Récupérer les événements publics
        const eventsResponse = await fetch('http://localhost:5000/api/evenements/public');
        const eventsData = await eventsResponse.json();

        if (coursesData.success) {
          // Adapter les données du backend au format frontend
          const adaptedCourses = coursesData.data.slice(0, 3).map((course: any) => ({
            id: course.id_cours.toString(),
            title: course.titre,
            description: course.description,
            duration: course.duree,
            level: course.niveau?.nom || 'Non défini',
            youtubeUrl: course.lien_youtube
          }));
          setCourses(adaptedCourses);
        }

        if (eventsData.success) {
          // Adapter les données du backend au format frontend
          const adaptedEvents = eventsData.data.slice(0, 2).map((event: any) => ({
            id: event.id_evenement.toString(),
            title: event.titre,
            date: new Date(event.date).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            }),
            time: event.heure,
            location: event.lieu,
            type: event.type_evenement?.nom || 'Événement',
            description: event.description
          }));
          setUpcomingEvents(adaptedEvents);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Apprentissage Structuré',
      description: 'Fini le chaos. Un chemin clair étape par étape.'
    },
    {
      icon: Target,
      title: 'Construire son Identité',
      description: 'Développez votre marque personnelle et votre confiance.'
    },
    {
      icon: Globe,
      title: 'Accès aux Opportunités',
      description: 'Apprenez à repérer et saisir les bonnes occasions.'
    },
    {
      icon: Rocket,
      title: 'Mentorat Personnel',
      description: 'Un guide expérimenté pour éviter les pièges.'
    }
  ];

  const handleAnalytics = (itemId: string, action: string) => {
    // TODO: Implement analytics tracking
    console.log(`Analytics: ${action} on item ${itemId}`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Hero Section */}
      <HeroSection
        title="Apprends la tech. Progresse vite."
        subtitle="Deviens un vrai crack."
        description="On t'aide à apprendre sans te perdre, à bâtir ton profil pro et à passer du débutant au créateur confiant."
        slogan="Former • Innover • Transformer"
        primaryButtonText="Prendre un accompagnement"
        primaryButtonLink="/accompagnement"
        secondaryButtonText="Voir nos cours"
        secondaryButtonLink="/courses"
      />

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Pourquoi choisir LesCracks ?"
            subtitle="Nous vous aidons à vous former, innover et vous transformer pour devenir remarquable dans le monde tech."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nos Cours Pratiques"
            subtitle="Formations concrètes pour développer des compétences remarquables et accéder aux meilleures opportunités."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                onAnalytics={handleAnalytics}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 bg-[#1f48ff] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="mr-3 w-5 h-5" />
              Voir tous les cours
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Événements"
            subtitle="Workshops, meetups et bootcamps pour développer vos compétences et votre réseau"
          />

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onAnalytics={handleAnalytics}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/events"
              className="inline-flex items-center px-8 py-4 bg-[#1f48ff] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Calendar className="mr-3 w-5 h-5" />
              Voir tous les événements
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl lg:text-5xl font-bold mb-8 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              À propos de LesCracks
            </h2>
            
            <div className="mb-12">
              <p className="text-[#f59e0b] font-bold text-2xl mb-6">
                Former • Innover • Transformer
              </p>
              <p className={`text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                LesCracks est une agence éducative dédiée à celles et ceux qui veulent construire une carrière solide dans la technologie.
              </p>
              <p className={`text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto mt-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Nous aidons les débutants à apprendre de manière claire, pratique et structurée pour devenir des professionnels visibles et compétents dans le monde numérique.
              </p>
            </div>
            
            <div className={`grid md:grid-cols-3 gap-8 mb-12 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Notre Mission
                </h3>
                <p className="leading-relaxed">
                  Démocratiser l'accès aux compétences technologiques grâce à une approche concrète et structurée. Former les futurs acteurs du numérique.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Notre Approche
                </h3>
                <p className="leading-relaxed">
                  Apprendre en construisant. Évoluer en créant. 80% de pratique, 20% de théorie. On n'apprend pas la théorie pour la théorie.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Notre Vision
                </h3>
                <p className="leading-relaxed">
                  Devenir la référence en matière d'apprentissage tech structuré en Afrique et au-delà. Connecter les talents aux opportunités.
                </p>
              </div>
            </div>
            
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 bg-[#1f48ff] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              En savoir plus sur nous
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </motion.div>
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
              Prêt à construire une carrière tech remarquable ?
            </h2>
            
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Rejoignez LesCracks et transformez-vous pour devenir remarquable dans le monde tech. 
              Accédez aux meilleures opportunités professionnelles.
              <span className="block mt-4 font-bold text-[#f59e0b] text-2xl">
                Former • Innover • Transformer
              </span>
            </p>
            
            <Link
              to="/accompagnement"
              className="inline-flex items-center justify-center px-10 py-5 bg-[#ffcc00] text-black text-xl font-bold rounded-xl hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Rocket className="mr-3 w-6 h-6" />
              Commencer mon accompagnement
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;