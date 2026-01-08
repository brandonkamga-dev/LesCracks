// components/sections/FinalCtaSection.tsx
import { motion } from "framer-motion";
import { PostulerForm } from "@/components/home/PostulerForm";

const FinalCtaSection = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#020617] overflow-hidden">
      
      {/* Grille sombre subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60 pointer-events-none" />

      {/* Légère profondeur */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Titre */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
            Prêt à lancer
            <br />
            <span className="text-primary-yellow">ta carrière tech</span> ?
          </h2>

          {/* Sous-texte */}
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-14">
            Une formation sérieuse. Un accompagnement structuré.
            <br />
            <strong className="text-white">
              Une vraie montée en compétence.
            </strong>
          </p>

          {/* CTA - ouvre le modal */}
          <div className="flex justify-center">
            <PostulerForm 
              size="lg"
              className="px-12 py-6 text-xl font-bold rounded-2xl"
            />
          </div>

          {/* Texte rassurant */}
          <p className="mt-8 text-gray-400 text-base">
            Aucun prérequis. On commence à zéro, avec méthode et discipline.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
