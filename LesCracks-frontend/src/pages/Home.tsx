// pages/Home.tsx
import HeroSection from '../components/home/HeroSection';
import ValueProposition from '@/components/home/ValueProposition';
import ProgrammesSection from '@/components/home/ProgrammesSection';
import RessourcesSection from '@/components/home/RessourceSection';
import TestimonialsSection from '@/components/home/TestimonialSection';
import FinalCtaSection from '@/components/home/FInalCtaSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ValueProposition />
      <ProgrammesSection />
      <RessourcesSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
};

export default Home;