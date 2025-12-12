// components/sections/TestimonialsSection.tsx
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

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

    const scrollDistance =
      direction === "right" ? scrollAmount : -scrollAmount;

    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "right" && container.scrollLeft + scrollAmount >= maxScroll - 10) {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });

      setTimeout(
        () => container.scrollTo({ left: 0, behavior: "instant" }),
        500
      );
    } else if (direction === "left" && container.scrollLeft <= 10) {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });

      setTimeout(
        () => container.scrollTo({ left: maxScroll, behavior: "instant" }),
        500
      );
    } else {
      container.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  const testimonials = [
    { type: "text", name: "Amine", role: "Dev Frontend", content: "En 8 mois je suis passé de zéro à un CDI dans une startup." },
    { type: "video", name: "Sarah", duration: "1:24", thumbnail: "/images/testimonials/sarah-thumb.jpg" },
    { type: "text", name: "Karim", role: "Alternant Cybersécu", content: "5 entretiens en 1 mois, 3 offres. Leur coaching est incroyable." },
    { type: "video", name: "Léa & Enzo", duration: "1:58", thumbnail: "/images/testimonials/lea-enzo-thumb.jpg" },
    { type: "text", name: "Yanisse", role: "Data Analyst", content: "J’ai progressé 10× plus vite que seul sur YouTube." },
  ];

  const infiniteTestimonials = [...testimonials, ...testimonials.slice(0, 2)];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
            Ils ont rejoint <span className="text-yellow-400">Les Cracks</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">Et leur vie pro a changé.</p>
        </motion.div>

        {/* Navigation */}
        <div className="relative">

          {/* Left button */}
          <button
            onClick={() => scrollOneStep("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
            w-10 h-10 rounded-full bg-white/10 backdrop-blur 
            border border-white/20 flex items-center justify-center 
            hover:bg-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Right button */}
          <button
            onClick={() => scrollOneStep("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
            w-10 h-10 rounded-full bg-white/10 backdrop-blur 
            border border-white/20 flex items-center justify-center 
            hover:bg-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slider */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-hidden overflow-y-hidden scroll-smooth px-12"
          >
            <div className="flex gap-6 py-6">
              {infiniteTestimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % testimonials.length) * 0.08 }}
                  className="flex-shrink-0 w-[360px] sm:w-[420px] aspect-square"
                >
                  {/* TEXT CARD */}
                  {t.type === "text" ? (
                    <div className="bg-white/5 h-full p-8 border border-white/10 rounded-3xl hover:bg-white/10 transition flex flex-col justify-between">
                      <p className="text-white text-lg italic">
                        “{t.content}”
                      </p>

                      <div className="flex items-center gap-4 mt-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-black text-lg">
                          {t.name.charAt(0)}
                        </div>

                        <div>
                          <div className="text-white font-semibold">{t.name}</div>
                          <div className="text-gray-400 text-sm">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* VIDEO CARD */
                    <div className="relative h-full rounded-3xl overflow-hidden cursor-pointer group">
                      <img
                        src={t.thumbnail}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <div className="absolute bottom-0 w-full px-4 py-3 bg-black/60 text-white text-sm">
                        <div className="flex justify-between">
                          <span className="font-semibold">{t.name}</span>
                          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                            {t.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
