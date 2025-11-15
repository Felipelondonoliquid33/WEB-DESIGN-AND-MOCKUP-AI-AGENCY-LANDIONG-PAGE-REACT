"use client";

import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const cards = [
  {
    title: "AI Website Builder",
    description: "Generate stunning websites with AI in seconds.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop",
    glow: "from-blue-400 via-cyan-400 to-blue-600",
  },
  {
    title: "Automated Workflows",
    description: "Connect and automate your business processes.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
    glow: "from-pink-500 via-fuchsia-500 to-purple-600",
  },
  {
    title: "Analytics Dashboard",
    description: "Visualize and evolve with real-time insights.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    glow: "from-green-400 via-emerald-400 to-teal-600",
  },
];

export default function AnimatedThreeColumn() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 bg-transparent">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(0,255,255,0.25)" }}
              className="relative rounded-3xl overflow-hidden bg-white shadow-xl group border border-neutral-200 hover:border-transparent transition-all duration-300"
              style={{ minHeight: 380 }}
            >
              {/* Neon Glow */}
              <div
                className={`absolute -inset-1 z-0 rounded-3xl pointer-events-none opacity-80 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl bg-gradient-to-br ${card.glow}`}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center p-6">
                  <motion.div
                    whileHover={{ scale: 1.07, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-full h-48 flex items-center justify-center"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={320}
                      height={200}
                      className="rounded-2xl object-cover shadow-lg border border-white"
                      style={{ boxShadow: "0 0 32px 0 rgba(0,255,255,0.10)" }}
                    />
                  </motion.div>
                </div>
                <div className="px-6 pb-8 pt-2 text-center">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 drop-shadow-lg">
                    {card.title}
                  </h3>
                  <p className="text-neutral-600 text-base">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
