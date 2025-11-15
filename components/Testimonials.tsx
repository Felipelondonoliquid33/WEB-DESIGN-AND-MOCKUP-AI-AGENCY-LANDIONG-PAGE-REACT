"use client";

import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "The team delivered an incredible app that exceeded our expectations. The AI-powered features have transformed our workflow completely.",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, InnovateLab",
    content:
      "Fast, reliable, and professional. They took our idea from concept to production in record time. Highly recommended!",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "CTO, DataFlow Systems",
    content:
      "The MCP development work was outstanding. Our AI integration is now seamless and scalable. Amazing team to work with.",
    rating: 5,
    avatar: "ER",
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!scrollerRef.current || !inView) return;

    const scroller = scrollerRef.current;
    const cards = scroller.querySelectorAll('.testimonial-card');
    
    if (cards.length === 0) return;

    // Duplicate cards for seamless loop
    cards.forEach(card => {
      const clone = card.cloneNode(true) as HTMLElement;
      scroller.appendChild(clone);
    });

    // Calculate total width
    const firstCard = cards[0] as HTMLElement;
    const cardWidth = firstCard.offsetWidth;
    const gap = 32; // 2rem gap
    const totalWidth = (cardWidth + gap) * cards.length;

    // Set up infinite horizontal scroll with GSAP
    animationRef.current = gsap.to(scroller, {
      x: -totalWidth,
      duration: 30, // 30 seconds for full loop
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    // Pause on hover
    scroller.addEventListener('mouseenter', () => {
      animationRef.current?.pause();
    });

    scroller.addEventListener('mouseleave', () => {
      animationRef.current?.play();
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="pt-24 lg:pt-32 pb-8 lg:pb-12 bg-transparent relative overflow-hidden"
      style={{ marginBottom: '-50px' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ color: '#111827' }}>
            Helping developers{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent" style={{ 
              backgroundImage: 'linear-gradient(to right, #9333ea, #db2777, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              streamline their workflow
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto" style={{ color: '#374151' }}>
            See what our clients have to say about working with us.
          </p>
        </div>

        {/* Horizontal Infinite Scroll */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(250, 250, 250, 1), rgba(250, 250, 250, 0))'
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, rgba(250, 250, 250, 1), rgba(250, 250, 250, 0))'
            }}
          />
          
          <div 
            ref={scrollerRef}
            className="flex gap-8"
            style={{
              willChange: 'transform',
              cursor: 'grab'
            }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card flex-shrink-0"
                style={{ width: '400px', maxWidth: '90vw' }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-200/50 flex flex-col h-full" style={{ minHeight: '400px' }}>
                  {/* Quote Icon */}
                  <Quote className="text-primary-600 mb-6" size={40} />

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-yellow-400"
                        size={20}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-800 mb-8 flex-grow leading-relaxed text-base" style={{ color: '#1f2937' }}>
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base" style={{ color: '#111827' }}>
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600" style={{ color: '#4b5563' }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

