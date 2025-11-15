"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { 
  SiGoogle, 
  SiApple, 
  SiAmazon, 
  SiMeta, 
  SiNetflix, 
  SiTesla, 
  SiSpotify,
  SiAdobe,
  SiSamsung
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";

const companies = [
  {
    name: "Google",
    icon: SiGoogle,
    color: "#4285F4"
  },
  {
    name: "Apple",
    icon: SiApple,
    color: "#000000"
  },
  {
    name: "Microsoft",
    icon: FaMicrosoft,
    color: "#00A4EF"
  },
  {
    name: "Amazon",
    icon: SiAmazon,
    color: "#FF9900"
  },
  {
    name: "Meta",
    icon: SiMeta,
    color: "#1877F2"
  },
  {
    name: "Netflix",
    icon: SiNetflix,
    color: "#E50914"
  },
  {
    name: "Tesla",
    icon: SiTesla,
    color: "#CC0000"
  },
  {
    name: "Spotify",
    icon: SiSpotify,
    color: "#1DB954"
  },
  {
    name: "Adobe",
    icon: SiAdobe,
    color: "#FF0000"
  },
  {
    name: "Samsung",
    icon: SiSamsung,
    color: "#1428A0"
  }
];

export default function TrustedBy() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const targets = containerRef.current.querySelectorAll(".company-logo");
    const numberOfTargets = targets.length;
    const duration = 1.5;
    const pause = 1;
    const stagger = duration + pause;
    const repeatDelay = stagger * (numberOfTargets - 1) + pause;

    // Position all elements outside container and scale to 0
    gsap.set(targets, {
      xPercent: 200,
      scale: 0,
      opacity: 0
    });

    // Create timeline with repeat
    const tl = gsap.timeline({
      defaults: {
        duration: duration,
        ease: "power2.inOut"
      }
    });

    // Animation 1: Slide in from right and scale up
    tl.to(targets, {
      xPercent: "-=100",
      scale: 1,
      opacity: 1,
      transformOrigin: "center left",
      stagger: {
        each: stagger,
        repeat: -1,
        repeatDelay: repeatDelay
      }
    });

    // Animation 2: Move to center
    tl.to(
      targets,
      {
        xPercent: "-=100",
        stagger: {
          each: stagger,
          repeat: -1,
          repeatDelay: repeatDelay
        }
      },
      stagger
    );

    // Animation 3: Move towards left
    tl.to(
      targets,
      {
        xPercent: "-=100",
        stagger: {
          each: stagger,
          repeat: -1,
          repeatDelay: repeatDelay
        }
      },
      stagger * 2
    );

    // Animation 4: Scale down and exit left
    tl.to(
      targets,
      {
        xPercent: "-=100",
        transformOrigin: "center right",
        scale: 0,
        opacity: 0,
        stagger: {
          each: stagger,
          repeat: -1,
          repeatDelay: repeatDelay
        }
      },
      stagger * 3
    );

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            Trusted by leading brands and companies
          </h2>
          <p className="text-lg text-neutral-600">
            From global enterprises to innovative startups
          </p>
        </motion.div>

        {/* GSAP Logo Animation Container */}
        <div className="relative h-32 flex items-center justify-center overflow-hidden">
          <div 
            ref={containerRef}
            className="relative w-full max-w-2xl h-20 flex items-center justify-center"
          >
            {/* Grid overlay for positioning - all logos stack in center */}
            <div className="absolute inset-0 grid grid-cols-1 items-center justify-items-center">
              {companies.map((company) => {
                const IconComponent = company.icon;
                return (
                  <div
                    key={company.name}
                    className="company-logo absolute flex items-center justify-center"
                    style={{
                      gridArea: "1 / 1 / 2 / 2",
                      width: "auto",
                      height: "auto"
                    }}
                    title={company.name}
                  >
                    <div className="flex items-center justify-center p-4">
                      <IconComponent 
                        size={80} 
                        color={company.color}
                        className="drop-shadow-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Static fallback for accessibility */}
        <div className="mt-12 hidden md:block">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-30">
            {companies.slice(0, 5).map((company) => {
              const IconComponent = company.icon;
              return (
                <div
                  key={`fallback-${company.name}`}
                  className="flex items-center justify-center"
                  title={company.name}
                >
                  <IconComponent 
                    size={32} 
                    color={company.color}
                    className="opacity-60"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
