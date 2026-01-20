// pages/Home.tsx
import HeroSection from '../components/home/sections/HeroSection';
import ValueProposition from '@/components/home/sections/ValueProposition';
import ProgrammesSection from '@/components/home/sections/ProgrammesSection';
import RessourcesSection from '@/components/home/sections/RessourceSection';
import TestimonialsSection from '@/components/home/sections/TestimonialSection';
import FinalCtaSection from '@/components/home/sections/FinalCtaSection';

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