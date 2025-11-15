"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Badge from "./ui/Badge";
import AvatarStack from "./ui/AvatarStack";
import FloatingAvatar from "./ui/FloatingAvatar";

const trustBadgeAvatars = [
  { id: "1", initials: "JD" },
  { id: "2", initials: "SM" },
  { id: "3", initials: "AK" },
  { id: "4", initials: "RL" },
  { id: "5", initials: "TM" },
  { id: "6", initials: "CW" },
  { id: "7", initials: "BP" },
];

// Mockup positions - distributed around the center, moved more to the sides
// Using percentage-based positioning for responsive layout
const mockupPositions = [
  { top: "10%", left: "3%", rotate: -3, delay: 0.2, seed: 1 },
  { top: "12%", right: "3%", rotate: 2, delay: 0.3, seed: 2 },
  { top: "42%", left: "2%", rotate: -2, delay: 0.4, seed: 3 },
  { top: "45%", right: "2%", rotate: 3, delay: 0.5, seed: 4 },
  { bottom: "15%", left: "5%", rotate: -2, delay: 0.6, seed: 5 },
  { bottom: "12%", right: "5%", rotate: 2, delay: 0.7, seed: 6 },
];

// Random website/app interface images from Unsplash
// Using different search terms for variety
const mockupImageSources = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", // Dashboard
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop", // Website
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", // Analytics
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop", // Interface
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop", // App UI
  "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=300&fit=crop", // Design
];

// Text reveal animation variants
const textRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [guestCursorPosition, setGuestCursorPosition] = useState<{ x: number; y: number } | null>(null);
  // Default positions that avoid center text area - will be randomized on mount
  const [cursorPositions, setCursorPositions] = useState<Array<{ x: number; y: number }>>([
    { x: 18, y: 25 }, // Mario - Top left area
    { x: 82, y: 28 }, // Jessica - Top right area
    { x: 22, y: 72 }, // Sarah - Bottom left area
    { x: 78, y: 68 }, // Alex - Bottom right area
  ]);

  useEffect(() => {
    setMounted(true);
    
    // Generate random positions for cursors, avoiding center text area
    const generateRandomPositions = () => {
      const positions: Array<{ x: number; y: number }> = [];
      const areas = [
        { xRange: [12, 28], yRange: [20, 38] }, // Top left
        { xRange: [72, 88], yRange: [18, 36] }, // Top right
        { xRange: [15, 32], yRange: [65, 80] }, // Bottom left
        { xRange: [70, 85], yRange: [62, 78] }, // Bottom right
      ];
      
      areas.forEach((area) => {
        const x = area.xRange[0] + Math.random() * (area.xRange[1] - area.xRange[0]);
        const y = area.yRange[0] + Math.random() * (area.yRange[1] - area.yRange[0]);
        positions.push({ x, y });
      });
      
      setCursorPositions(positions);
    };

    // Small delay to ensure component is mounted, then randomize positions
    const timer = setTimeout(generateRandomPositions, 150);
    return () => clearTimeout(timer);
  }, []);

  // Handle mouse movement for GUEST cursor - Direct tracking without delay
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.querySelector("[data-hero-section]");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          // Calculate position in pixels relative to hero section
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setGuestCursorPosition({ x, y });
        } else {
          setGuestCursorPosition(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setGuestCursorPosition(null);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    const heroSection = document.querySelector("[data-hero-section]");
    if (heroSection) {
      heroSection.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (heroSection) {
        heroSection.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      data-hero-section
      ref={ref}
      onMouseEnter={() => {
        setIsHeroHovered(true);
        document.body.style.cursor = 'none';
      }}
      onMouseLeave={() => {
        setIsHeroHovered(false);
        document.body.style.cursor = 'auto';
      }}
      className="group relative min-h-screen flex items-center overflow-hidden bg-transparent pt-20 md:pt-24 transition-all duration-[400ms] ease-out transform-gpu hover:-translate-y-2 hover:scale-[1.01]"
    >
      {/* Mockups Container - Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {mounted && mockupPositions.map((pos, index) => {
            // Determine initial x offset: pares hacia izquierda (-48px), impares hacia derecha (+48px)
            const initialX = index % 2 === 0 ? -48 : 48;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, x: initialX }}
                animate={inView ? { 
                  opacity: isHeroHovered ? 1 : 0.8, 
                  scale: isHeroHovered ? 1.07 : 1, 
                  x: isHeroHovered ? 0 : initialX,
                } : {}}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  duration: 1.2,
                  delay: pos.delay,
                }}
                className="absolute hidden xl:block"
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  width: "clamp(200px, 18vw, 320px)",
                  zIndex: isHeroHovered ? 10 : 1,
                }}
              >
                <div
                  className="w-full aspect-[4/3] bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden cursor-pointer relative"
                  style={{
                    transform: `rotate(${pos.rotate}deg)`,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                  }}
                >
                {/* Random Website/App Interface Image */}
                <Image
                  src={mockupImageSources[index % mockupImageSources.length]}
                  alt={`Website mockup ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 0px, 320px"
                  style={{
                    objectFit: "cover",
                  }}
                />
                {/* Optional overlay for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Main Content - Centered */}
      <div
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ maxWidth: "1200px" }}
      >
        <div className="flex flex-col items-center text-center pt-14 pb-16 lg:pt-20 lg:pb-24" style={{ marginTop: '-10px' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            className="mb-6"
          >
            <Badge animated icon={<Sparkles size={14} />}>
              Access our new AI-Powered MPC software and solutions
            </Badge>
          </motion.div>

          {/* Trust Badge - Centered above title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <AvatarStack avatars={trustBadgeAvatars} max={5} size="md" />
              <span className="text-sm text-neutral-600 whitespace-nowrap">
                Designers & Developers trust us
              </span>
            </div>
          </motion.div>

          {/* Heading - Centered */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-bold font-display leading-[1.1] text-neutral-900 mb-6 px-4"
            style={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1A1A1A",
            }}
          >
            {/* GSAP Typing Effect */}
            {/* @ts-expect-error Async Server Component import */}
            {typeof window !== 'undefined' && (
              <>
                {require('./ui/TextType').default && (
                  require('./ui/TextType').default({
                    text: 'We build software that connects, automates, and evolves.',
                    as: 'span',
                    typingSpeed: 75,
                    pauseDuration: 2000,
                    showCursor: true,
                    cursorCharacter: '|',
                    className: 'inline-block',
                  })
                )}
              </>
            )}
          </motion.h1>

          {/* Subheading - Centered, max-width: 680px */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-[22px] text-neutral-800 leading-relaxed max-w-[680px] mx-auto font-normal mb-8"
            style={{
              fontWeight: 400,
              lineHeight: "1.6",
            }}
          >
            We drive the development of apps, webapps, and systems powered by MCP servers — modular infrastructure, intelligent APIs, and real automation.
          </motion.p>
        </div>
      </div>

      {/* Collaborative Cursors - Randomly positioned in hero section */}
      <AnimatePresence>
        {mounted && cursorPositions.length === 4 && (
          <>
            {/* Mario - Random position */}
            <div 
              className="absolute hidden lg:block"
              style={{
                left: `${cursorPositions[0].x}%`,
                top: `${cursorPositions[0].y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 25,
              }}
            >
              <FloatingAvatar
                name="Mario"
                avatar="MS"
                initialX={0}
                initialY={0}
                delay={1}
                isInteractive={false}
                color="#656BFF"
              />
            </div>
            {/* Jessica - Random position */}
            <div 
              className="absolute hidden lg:block"
              style={{
                left: `${cursorPositions[1].x}%`,
                top: `${cursorPositions[1].y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 25,
              }}
            >
              <FloatingAvatar
                name="Jessica"
                avatar="JD"
                initialX={0}
                initialY={0}
                delay={1.5}
                isInteractive={false}
                color="#8B5CF6"
              />
            </div>
            {/* Sarah - Random position */}
            <div 
              className="absolute hidden lg:block"
              style={{
                left: `${cursorPositions[2].x}%`,
                top: `${cursorPositions[2].y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 25,
              }}
            >
              <FloatingAvatar
                name="Sarah"
                avatar="SM"
                initialX={0}
                initialY={0}
                delay={2}
                isInteractive={false}
                color="#EC4899"
              />
            </div>
            {/* Alex - Random position */}
            <div 
              className="absolute hidden lg:block"
              style={{
                left: `${cursorPositions[3].x}%`,
                top: `${cursorPositions[3].y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 25,
              }}
            >
              <FloatingAvatar
                name="Alex"
                avatar="AK"
                initialX={0}
                initialY={0}
                delay={2.5}
                isInteractive={false}
                color="#10B981"
              />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* GUEST Cursor - Follows user's mouse when over hero - Direct tracking */}
      {guestCursorPosition && (
        <div 
          className="absolute hidden lg:block pointer-events-none"
          style={{
            left: `${guestCursorPosition.x}px`,
            top: `${guestCursorPosition.y}px`,
            transform: 'translate(-30px, -30px)',
            zIndex: 30,
            transition: 'none',
          }}
        >
          {/* Cursor Icon */}
          <div
            style={{
              position: "absolute",
              top: "-10px",
              left: "-6px",
              width: "24px",
              height: "24px",
              zIndex: 2,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))",
              }}
            >
              <path
                d="M2 2L2 20L12 15L16 20L16 11L22 8L2 2Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M4 4L4 18L11.5 13.5L14.5 18L14.5 10L19.5 8.5L4 4Z"
                fill="#FBBF24"
              />
            </svg>
          </div>

          {/* Name Tag */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "10px",
              backgroundColor: "#FBBF24",
              borderRadius: "24px",
              padding: "6px 14px",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "13px",
                fontWeight: "600",
                fontFamily: "system-ui, -apple-system, 'Inter', sans-serif",
                letterSpacing: "0.02em",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              GUEST
            </span>
          </div>

          {/* Subtle glow effect */}
          <div
            style={{
              position: "absolute",
              top: "-6px",
              left: "-6px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#FBBF24",
              filter: "blur(10px)",
              opacity: 0.3,
              zIndex: 1,
            }}
          />
        </div>
      )}

      {/* Background Abstract Shapes - Subtle gradient */}
      <div 
        className="absolute inset-0 -z-0 opacity-10"
        style={{ 
          background: "radial-gradient(circle at 50% 50%, rgba(101, 107, 255, 0.08), transparent 70%)",
        }}
      />
    </section>
  );
}
