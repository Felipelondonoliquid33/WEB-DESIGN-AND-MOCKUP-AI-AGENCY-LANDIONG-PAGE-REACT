"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

const stats = [
  { value: 500, suffix: "+", label: "Apps Built" },
  { value: 700, suffix: "k+", label: "Developers Trust Us" },
  { value: 50, suffix: "+", label: "Countries Served" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export default function AnimatedNumbers() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const valueRefs = useRef<{ value: number }[]>([]);

  useEffect(() => {
    // Initialize value objects
    stats.forEach((_, index) => {
      if (!valueRefs.current[index]) {
        valueRefs.current[index] = { value: 0 };
      }
    });
  }, []);

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        const numberRef = numberRefs.current[index];
        const valueObj = valueRefs.current[index];
        if (!numberRef || !valueObj) return;

        // Reset to 0 and set initial display
        valueObj.value = 0;
        numberRef.textContent = "0";

        // Animate from 0 to target value
        gsap.to(valueObj, {
          value: stat.value,
          duration: 1.5, // 500ms+ as requested (using 1.5s for smooth animation)
          delay: index * 0.15,
          ease: "power2.out",
          onUpdate: function () {
            // Update the displayed number with rounding
            const currentValue = Math.round(valueObj.value);
            numberRef.textContent = currentValue.toString();
          },
        });
      });
    } else {
      // Reset to 0 when not in view
      stats.forEach((_, index) => {
        const numberRef = numberRefs.current[index];
        const valueObj = valueRefs.current[index];
        if (numberRef && valueObj) {
          valueObj.value = 0;
          numberRef.textContent = "0";
        }
      });
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="pt-8 lg:pt-12 pb-12 lg:pb-16 bg-transparent"
      style={{ marginTop: '-50px' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
              }}
            >
              <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2" style={{ color: '#111827' }}>
                <span ref={(el) => (numberRefs.current[index] = el)}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-gray-800 text-lg font-medium" style={{ color: '#1f2937' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

