"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MarqueeMockup() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinColumnRef = useRef<HTMLDivElement>(null);
  const animatedColumnRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pinColumnRef.current && animatedColumnRef.current && wrapRef.current && sectionRef.current) {
      // Calculate when to start hiding the pinned column
      const hideStart = "bottom 75%";
      const hideEnd = "bottom 60%";
      
      // Natural hide animation for pinned column - starts early and completes before pin ends
      const hideAnimation = gsap.to(pinColumnRef.current, {
        opacity: 0,
        x: -150,
        scale: 0.85,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: hideStart,
          end: hideEnd,
          scrub: 1,
        },
      });

      // Create timeline with pin and scrub - pin ends before hide animation completes
      const tl = gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          pin: true,
          trigger: pinColumnRef.current,
          start: "top top",
          endTrigger: wrapRef.current,
          end: hideEnd, // Pin ends when hide animation completes
          anticipatePin: 1,
          pinSpacing: true,
          onLeave: () => {
            // Reset position when pin ends to prevent overlap
            gsap.set(pinColumnRef.current, { clearProps: "all" });
          },
        },
      });

      // Animate the right column content
      tl.to(animatedColumnRef.current, {
        y: -200,
        opacity: 0.3,
        scale: 0.95,
        ease: "power2.out",
      })
      .to(animatedColumnRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "power2.in",
      }, "-=0.5");

      // Cleanup
      return () => {
        tl.kill();
        if (hideAnimation) hideAnimation.kill();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars && (trigger.vars.trigger === pinColumnRef.current || trigger.vars.trigger === wrapRef.current)) {
            trigger.kill();
          }
        });
      };
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-transparent relative overflow-hidden"
    >
      <div 
        ref={wrapRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ minHeight: "200vh" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Pinned */}
          <div 
            ref={pinColumnRef}
            className="sticky top-20 lg:top-24"
            style={{ zIndex: 1 }}
          >
            <div className="bg-white rounded-[22px] shadow-lg overflow-hidden p-8 lg:p-12">
              <div className="mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Mockup Builder
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Create stunning wireframes and mockups with our AI-powered builder. 
                  Design faster, iterate smarter.
                </p>
              </div>
              
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=640&h=400&fit=crop&q=80"
                  alt="Web Page Wireframe Mockup"
                  width={640}
                  height={400}
                  className="w-full h-auto block object-cover"
                  unoptimized
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
                  Wireframes
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                  Mockups
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                  Prototypes
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Animated */}
          <div 
            ref={animatedColumnRef}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Step 1: Design
              </h3>
              <p className="text-gray-600">
                Start with our intuitive design tools. Create wireframes, add components, 
                and structure your layout with ease.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Step 2: Customize
              </h3>
              <p className="text-gray-600">
                Personalize your mockup with colors, typography, and spacing. 
                Make it uniquely yours.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Step 3: Export
              </h3>
              <p className="text-gray-600">
                Export your designs in multiple formats. Share with your team 
                or clients instantly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 shadow-md border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start?
              </h3>
              <p className="text-gray-700 mb-6">
                Join thousands of designers creating beautiful mockups with our platform.
              </p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
