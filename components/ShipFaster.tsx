"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";

export default function ShipFaster() {
  const [inViewRef, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (inView && titleRef.current && descriptionRef.current) {
      // Wait for fonts to load
      document.fonts.ready.then(() => {
        // Store original text
        const titleText = titleRef.current!.textContent || "";
        const descText = descriptionRef.current!.textContent || "";
        
        // Clear and set up for typewriter effect
        titleRef.current!.textContent = "";
        descriptionRef.current!.textContent = "";
        
        gsap.set([titleRef.current, descriptionRef.current], { 
          opacity: 1,
          filter: 'none',
        });

        // Master timeline to control both animations
        const masterTimeline = gsap.timeline();

        // Typewriter effect for title
        const titleChars = titleText.split("");
        
        titleChars.forEach((char, i) => {
          masterTimeline.to(titleRef.current, {
            duration: 0,
            onComplete: () => {
              if (titleRef.current) {
                titleRef.current.textContent = titleText.substring(0, i + 1);
              }
            }
          }, i * 0.03);
        });

        // Add pause between title and description
        masterTimeline.to({}, { duration: 0.3 });

        // Typewriter effect for description (starts after title)
        const descChars = descText.split("");
        
        descChars.forEach((char, i) => {
          masterTimeline.to(descriptionRef.current, {
            duration: 0,
            onComplete: () => {
              if (descriptionRef.current) {
                descriptionRef.current.textContent = descText.substring(0, i + 1);
              }
            }
          }, i * 0.02);
        });
      });
    }
  }, [inView]);

  return (
    <section
      ref={inViewRef}
      className="py-32 lg:py-40 bg-transparent relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div>
          {/* Copy about AI mockup and concept creator */}
          <div className="max-w-4xl mx-auto relative z-10" style={{ isolation: 'isolate' }}>
            <p 
              ref={titleRef}
              className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed mb-4 text-justify"
              style={{ opacity: 0, filter: 'none', WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
            >
              The best AI-powered mockup and web concept creator in the market
            </p>
            <p 
              ref={descriptionRef}
              className="text-base sm:text-lg text-gray-900 leading-relaxed text-justify"
              style={{ opacity: 0, filter: 'none', WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
            >
              Transform your ideas into stunning mockups, wireframes, and design concepts instantly with our cutting-edge AI technology. Build faster, design smarter, ship sooner.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-primary-500/10 to-accent-orange/10 rounded-full blur-3xl pointer-events-none z-0" />
    </section>
  );
}

