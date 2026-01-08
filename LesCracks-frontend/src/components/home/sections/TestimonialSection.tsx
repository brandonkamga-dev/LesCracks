// components/sections/TestimonialsSection.tsx
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollOneStep = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCard = container.querySelector("div.flex-shrink-0") as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const testimonials = [
    {
      name: "Cédric Darel",
      role: "Étudiant à UY1 – Cameroun",
      content:
        "Chez LesCracks, j’ai acquis des compétences solides mais surtout une vraie vision. Aujourd’hui je suis fondateur de XyberClan, une startup dédiée aux solutions digitales.",
    },
    {
      name: "Loïc Scott",
      role: "Étudiant à Xinyu University – Chine",
      content:
        "Avant j’étais dispersé. Grâce à l’accompagnement, j’ai gagné en maturité, en discipline et j’avance désormais avec clarté.",
    },
    {
      name: "Félix Kamdjo",
      role: "Étudiant à Polytechnique de Douala – Cameroun",
      content:
        "Une méthode adaptée à notre réalité locale. L’accompagnement est exigeant, structuré et orienté résultats.",
    },
  ];

  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-28 bg-[#F9FAFB] relative overflow-hidden">
      {/* Grille de fond douce */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900">
            Ils ont rejoint <span className="text-primary-yellow">Les Cracks</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Des parcours réels. Des transformations concrètes.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Bouton gauche */}
          <button
            onClick={() => scrollOneStep("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 rounded-full bg-white border border-black/20
            flex items-center justify-center hover:bg-black hover:text-white transition
            hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Bouton droit */}
          <button
            onClick={() => scrollOneStep("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 rounded-full bg-white border border-black/20
            flex items-center justify-center hover:bg-black hover:text-white transition
            hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-hidden px-4 sm:px-16"
          >
            <div className="flex gap-6">
              {infiniteTestimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % testimonials.length) * 0.08 }}
                  className="flex-shrink-0 w-[340px] sm:w-[400px]"
                >
                  <div className="h-full p-8 bg-white border border-black/10 rounded-2xl hover:border-black/20 transition flex flex-col">
                    {/* Quote */}
                    <div className="text-4xl text-primary-yellow mb-4">“</div>

                    <p className="text-slate-700 text-base leading-relaxed mb-6 flex-grow">
                      {t.content}
                    </p>

                    <div className="pt-4 border-t border-black/10">
                      <div className="font-semibold text-slate-900">
                        {t.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex justify-center gap-4 mt-10 sm:hidden">
            <button
              onClick={() => scrollOneStep("left")}
              className="w-10 h-10 rounded-full bg-white border border-black/20 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollOneStep("right")}
              className="w-10 h-10 rounded-full bg-white border border-black/20 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
