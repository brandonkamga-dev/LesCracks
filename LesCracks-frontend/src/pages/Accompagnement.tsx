import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PostulerForm } from "@/components/home/PostulerForm";

const Accompagnement: React.FC = () => {
  const features = [
    { label: "Formation dans l'un des domaines : Développement Web, Data, Cybersécurité, Réseaux" },
    { label: "Enseignement des concepts théoriques essentiels" },
    { label: "Pratique sur de nombreux projets concrets" },
    { label: "Développement des soft skills et posture professionnelle" },
    { label: "Accès à la communauté LesCracks" },
    { label: "Portfolio développeur à jour et déployé" },
    { label: "CV et LinkedIn optimisés" },
    { label: "Accès aux ressources et documentation LesCracks" },
    { label: "Accès au réseau professionnel LesCracks" },
  ];

  const programmes = [
    {
      title: "Formation pratique",
      included: [true, true, true, false, false, true, false, true, false],
      price: "À partir de 10 000 FCFA",
    },
    {
      title: "Formation pratique + Accompagnement 360°",
      included: [true, true, true, true, true, true, true, true, true],
      price: "À partir de 15 000 FCFA",
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
            Comparez nos offres et choisissez celle qui vous mènera vers le succès.
          </p>
        </motion.div>

        {/* Tableau comparatif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-gray-300 text-lg font-semibold"></th>
                {programmes.map((prog, i) => (
                  <th
                    key={i}
                    className={`px-6 py-4 text-white text-center text-lg font-bold ${
                      i === 1 ? "bg-white/5 backdrop-blur-sm rounded-t-2xl" : ""
                    }`}
                  >
                    {prog.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, idx) => (
                <tr key={idx} className="border-t border-white/10">
                  <td className="px-6 py-4 text-gray-400">{feat.label}</td>
                  {programmes.map((prog, i) => (
                    <td key={i} className="px-6 py-4 text-center">
                      {prog.included[idx] ? (
                        <span className="text-yellow-400 font-bold">&#10003;</span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Ligne prix */}
              <tr className="border-t border-white/10">
                <td className="px-6 py-4 text-gray-400 font-semibold">Prix</td>
                {programmes.map((prog, i) => (
                  <td key={i} className="px-6 py-4 text-center text-yellow-400 font-bold">
                    {prog.price}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* CTA global */}
        <div className="text-center mt-12">
          <PostulerForm />
        </div>
      </div>
    </section>
  );
};

export default Accompagnement;
