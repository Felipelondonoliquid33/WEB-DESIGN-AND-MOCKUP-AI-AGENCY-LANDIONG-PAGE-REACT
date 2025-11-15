"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Map, Layout, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

// Dynamically import 3D model component to avoid SSR issues
const Model3D = dynamic(() => import("./ui/Model3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
      <div className="text-gray-400">Loading 3D model...</div>
    </div>
  ),
});

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    id: "plan",
    title: "Plan",
    subtitle: "Sitemaps",
    description:
      "Transform your vision into production-ready web designs with our cutting-edge AI companion. Our intelligent system understands your brand, analyzes your requirements, and generates pixel-perfect sitemaps that serve as the foundation for exceptional digital experiences. From initial concept to final deployment, our AI-powered platform ensures every page, user flow, and interaction is meticulously planned and optimized for success.",
    icon: Map,
    features: [
      "Map out key content",
      "Scope projects better",
      "AI-powered structure",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "structure",
    title: "Structure",
    subtitle: "Wireframes",
    description:
      "Achieve your first draft in the first minute. Watch AI magically turn your sitemap into wireframes with real components and copy. Getting sign off has never been so easy.",
    icon: Layout,
    features: [
      "Editing super powers",
      "No AI-template gimmicks",
      "1000+ real components",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "conceptualize",
    title: "Conceptualize",
    subtitle: "Style Guide",
    description:
      "Streamline one of the most time-consuming stages of app design. Create visual concepts, lock in a design system, and export to your preferred tools.",
    icon: Palette,
    features: [
      "Streamline approvals",
      "Build faster",
      "Export instantly",
    ],
    gradient: "from-orange-500 to-red-500",
  },
];

// Feature Item Component with GSAP ScrollTrigger animation
function FeatureItem({ 
  feature, 
  stepIndex, 
  featureIndex, 
  gradient 
}: { 
  feature: string; 
  stepIndex: number; 
  featureIndex: number; 
  gradient: string;
}) {
  const featureRef = useRef<HTMLLIElement>(null);
  const [inViewRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (featureRef.current) {
      const element = featureRef.current;
      
      // Set initial state
      gsap.set(element, {
        opacity: 0,
        x: -30,
        scale: 0.95,
      });

      // Create ScrollTrigger animation
      const animation = gsap.to(element, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      return () => {
        animation.kill();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars && trigger.vars.trigger === element) {
            trigger.kill();
          }
        });
      };
    }
  }, []);

  return (
    <li
      ref={(el) => {
        featureRef.current = el;
        inViewRef(el);
      }}
      className="group relative flex items-center gap-4 transition-all duration-300"
      style={{ fontFamily: 'system-ui, -apple-system, "Inter", sans-serif' }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-lg blur-xl transition-opacity duration-300 -z-10`} />
      
      {/* Icon - Black and minimalistic with glow */}
      <div className="flex-shrink-0 relative">
        <CheckCircle2 
          className="text-gray-900 group-hover:text-gray-700 transition-all duration-300 group-hover:drop-shadow-lg" 
          size={22}
          style={{
            filter: 'drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 -z-10`} />
      </div>
      
      {/* Text with subtle glow */}
      <span className="text-base font-medium text-gray-800 group-hover:text-gray-900 transition-all duration-300 relative">
        {feature}
        <span className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 -z-10`} />
      </span>
    </li>
  );
}

export default function Process() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="process"
      ref={ref}
      className="py-24 lg:py-32 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Prompt to{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Production
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From concept to deployment, we streamline every step of your app
            development journey.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-24 lg:space-y-32">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-16`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}
                    >
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-mono">
                        {step.title}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900" style={{ 
                        fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", "Monaco", "Consolas", monospace',
                        letterSpacing: '-0.02em'
                      }}>
                        {step.subtitle}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base text-gray-700 leading-relaxed text-justify max-w-xl" style={{ 
                    fontFamily: 'system-ui, -apple-system, "Inter", sans-serif',
                    letterSpacing: '0.01em'
                  }}>
                    {step.description}
                  </p>

                  <ul className="space-y-4">
                    {step.features.map((feature, featureIndex) => (
                      <FeatureItem
                        key={featureIndex}
                        feature={feature}
                        stepIndex={index}
                        featureIndex={featureIndex}
                        gradient={step.gradient}
                      />
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    whileTap={{ scale: 0.98, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
                    className="relative inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium text-sm overflow-hidden transition-all duration-200"
                    style={{
                      fontFamily: 'system-ui, -apple-system, "Inter", sans-serif',
                      letterSpacing: '0.02em',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    <span className="relative z-10">Give it a try</span>
                    <ArrowRight size={16} className="relative z-10" />
                    {/* Material Design ripple effect background */}
                    <motion.span
                      className="absolute inset-0 bg-white"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                    className="relative"
                  >
                    {index === 0 ? (
                      // 3D Model for Sitemaps (first step) - directly on background
                      <div className="h-[500px] w-full">
                        <Model3D 
                          modelPath="/https___storage_googleapis_com_ai_services_quality_jobs_h0qce_input_png (1).glb"
                          className="w-full h-full"
                        />
                      </div>
                    ) : (
                      // Original wireframe visual for other steps
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-2xl border border-gray-200">
                        <div className="bg-white rounded-lg p-6 space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="grid grid-cols-3 gap-4 mt-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                              <div
                                key={item}
                                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Decorative gradient - only for non-3D steps */}
                    {index !== 0 && (
                      <div
                        className={`absolute -z-10 top-4 ${
                          isEven ? "left-4" : "right-4"
                        } w-full h-full bg-gradient-to-br ${step.gradient} opacity-20 rounded-2xl blur-2xl`}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

