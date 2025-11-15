"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import FloatingAvatar from './ui/FloatingAvatar';
import './ui/ThreeColumnFeatures.css';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  index: number;
  buttonText?: string;
}

export default function ThreeColumnFeatures() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [mounted, setMounted] = useState(false);
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [guestCursorPosition, setGuestCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [cursorPositions, setCursorPositions] = useState<Array<{ x: number; y: number }>>([
    { x: 20, y: 30 }, // Top left area
    { x: 50, y: 35 }, // Top center area
    { x: 80, y: 32 }, // Top right area
    { x: 25, y: 70 }, // Bottom left area
    { x: 75, y: 68 }, // Bottom right area
  ]);
  
  const features = [
    {
      subtitle: "Plan",
      title: "Sitemaps",
      description: "Quickly map out your website pages with an AI-generated sitemap",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80",
      buttonText: "Give it a try"
    },
    {
      subtitle: "Structure",
      title: "Wireframes",
      description: "Effortlessly structure your pages and copy with distraction-free wireframes",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format&q=80",
      buttonText: "Give it a try"
    },
    {
      subtitle: "Conceptualise",
      title: "Style Guide",
      description: "Instantly create design concepts and apply the winning style across pages",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format&q=80",
      buttonText: "Give it a try"
    }
  ];

  useEffect(() => {
    setMounted(true);
    
    // Generate random positions for cursors within the section
    const generateRandomPositions = () => {
      const positions: Array<{ x: number; y: number }> = [];
      const areas = [
        { xRange: [15, 30], yRange: [25, 40] }, // Top left
        { xRange: [45, 55], yRange: [28, 42] }, // Top center
        { xRange: [70, 85], yRange: [25, 38] }, // Top right
        { xRange: [20, 35], yRange: [65, 80] }, // Bottom left
        { xRange: [65, 80], yRange: [63, 78] }, // Bottom right
      ];
      
      areas.forEach((area) => {
        const x = area.xRange[0] + Math.random() * (area.xRange[1] - area.xRange[0]);
        const y = area.yRange[0] + Math.random() * (area.yRange[1] - area.yRange[0]);
        positions.push({ x, y });
      });
      
      setCursorPositions(positions);
    };

    const timer = setTimeout(generateRandomPositions, 150);
    return () => clearTimeout(timer);
  }, []);

  // Handle mouse movement for GUEST cursor - tracks user's mouse over the section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = document.querySelector("[data-features-section]");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          // Calculate position in pixels relative to section
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
    const section = document.querySelector("[data-features-section]");
    if (section) {
      section.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (section) {
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView && svgRef.current) {
      const svg = svgRef.current;
      const tl = gsap.timeline();
      
      // Animate main vertical line descending (continuing from GlowLineConnector)
      const mainVertical = svg.querySelector('.line-main-vertical');
      tl.fromTo(
        mainVertical,
        { attr: { y2: 0 }, opacity: 0 },
        { attr: { y2: 230 }, opacity: 0, duration: 0.8, ease: "power2.out" }
      );

      // Animate branches with angular feel
      const leftBranch = svg.querySelector('.line-branch-left');
      const centerBranch = svg.querySelector('.line-branch-center');
      const rightBranch = svg.querySelector('.line-branch-right');
      
      // Left angular branch
      tl.fromTo(
        leftBranch,
        { 
          attr: { d: "M 600 230 L 600 230 L 600 230 L 600 230 L 600 230" },
          opacity: 0 
        },
        { 
          attr: { d: "M 600 230 L 600 234 L 450 238 L 300 238 L 300 248" },
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut"
        },
        "-=0.2"
      );
      
      // Center straight branch
      tl.fromTo(
        centerBranch,
        { attr: { y2: 230 }, opacity: 0 },
        { attr: { y2: 248 }, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );
      
      // Right angular branch
      tl.fromTo(
        rightBranch,
        { 
          attr: { d: "M 600 230 L 600 230 L 600 230 L 600 230 L 600 230" },
          opacity: 0 
        },
        { 
          attr: { d: "M 600 230 L 600 234 L 750 238 L 900 238 L 900 248" },
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut"
        },
        "-=0.6"
      );
      
      // Pulsing glow animation for all lines (circuit effect)
      const allLines = [mainVertical, leftBranch, centerBranch, rightBranch];
      allLines.forEach((line, index) => {
        if (line) {
          // Create pulsing animation with glow effect - circuit-like pulsing
          // Lines start invisible and pulse with glow
          const pulseTl = gsap.timeline({ repeat: -1, delay: index * 0.4 });
          
          // Pulse up with strong glow
          pulseTl.to(line, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            onStart: function() {
              line.setAttribute('filter', 'url(#glow-pulse-strong)');
            }
          })
          // Hold at peak
          .to(line, {
            opacity: 1,
            duration: 0.3,
            ease: "none"
          })
          // Fade down with normal glow
          .to(line, {
            opacity: 0.1,
            duration: 0.8,
            ease: "power2.in",
            onComplete: function() {
              line.setAttribute('filter', 'url(#glow-pulse)');
            }
          })
          // Hold at low
          .to(line, {
            opacity: 0.1,
            duration: 0.5,
            ease: "none"
          });
        }
      });
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef} 
      data-features-section
      className="relative pt-0 pb-32 bg-transparent overflow-visible" 
      style={{ 
        position: 'relative',
        cursor: 'none' // Hide system cursor when over this section
      }}
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
    >
      {/* Continuous wireframe-style connector SVG - Completely independent container */}
      <div 
        className="absolute left-0 w-full pointer-events-none" 
        style={{ 
          zIndex: 2, 
          top: '-420px', 
          height: '250px',
          position: 'absolute',
          pointerEvents: 'none'
        }}
      >
        <svg 
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 1200 250"
          preserveAspectRatio="xMidYMin meet"
        >
        <defs>
          {/* Red to Blue Gradient */}
          <linearGradient id="redBlueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="50%" stopColor="#ff6b9d" />
            <stop offset="100%" stopColor="#3575ff" />
          </linearGradient>
          
          {/* Glow filter for pulsing effect */}
          <filter id="glow-pulse">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Stronger glow for pulsing */}
          <filter id="glow-pulse-strong">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main continuous vertical line from top center */}
        <line 
          className="line-main-vertical"
          x1="600" 
          y1="0" 
          x2="600" 
          y2="230" 
          stroke="url(#redBlueGradient)" 
          strokeWidth="3" 
          strokeLinecap="round"
          filter="url(#glow-pulse)"
          opacity="0"
        />
        
        {/* Left branch - angular curve to Sitemaps */}
        <path
          className="line-branch-left"
          d="M 600 230 L 600 234 L 450 238 L 300 238 L 300 248"
          fill="none"
          stroke="url(#redBlueGradient)" 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeLinejoin="miter"
          filter="url(#glow-pulse)"
          opacity="0"
        />
        
        {/* Center branch - straight down to Wireframes */}
        <line 
          className="line-branch-center"
          x1="600" 
          y1="230" 
          x2="600" 
          y2="248" 
          stroke="url(#redBlueGradient)" 
          strokeWidth="3" 
          strokeLinecap="round"
          filter="url(#glow-pulse)"
          opacity="0"
        />
        
        {/* Right branch - angular curve to Style Guide */}
        <path
          className="line-branch-right"
          d="M 600 230 L 600 234 L 750 238 L 900 238 L 900 248"
          fill="none"
          stroke="url(#redBlueGradient)" 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeLinejoin="miter"
          filter="url(#glow-pulse)"
          opacity="0"
        />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6" style={{ marginTop: '90px', marginBottom: '-90px', cursor: 'none' }}>
        <div className="three-column-features-grid grid grid-cols-1 md:grid-cols-3 gap-12 z-10" style={{ cursor: 'none' }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 1.2 + (index * 0.2), 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="w-full"
            >
              <CardContainer containerClassName="w-full">
                <CardBody className="group relative rounded-[2rem] bg-white shadow-2xl border border-gray-100 p-8 flex flex-col transition-all duration-500 overflow-hidden w-full h-auto"
                  style={{ 
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15), 0 4px 8px rgba(0, 0, 0, 0.05)',
                    minHeight: '580px'
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                  
                  {/* Subtitle Label */}
                  <CardItem translateZ="50" className="relative z-10 mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-orange-600 bg-orange-50 rounded-lg">
                      {feature.subtitle}
                    </span>
                  </CardItem>

                  {/* Title */}
                  <CardItem translateZ="60" className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">
                      {feature.title}
                    </h3>
                  </CardItem>

                  {/* Description */}
                  <CardItem translateZ="40" className="relative z-10">
                    <p className="text-gray-600 text-base leading-relaxed font-normal mb-6 flex-grow">
                      {feature.description}
                    </p>
                  </CardItem>

                  {/* Button */}
                  <CardItem translateZ="30" className="relative z-10 mb-6 self-start">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-purple-600 transition-colors"
                    >
                      {feature.buttonText}
                      <ArrowRight size={18} />
                    </motion.button>
                  </CardItem>
                  
                  {/* Image Container */}
                  <CardItem translateZ="100" className="relative w-full mt-auto">
                    <motion.div 
                      className="relative w-full h-56 rounded-[1.5rem] overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="h-60 w-full object-cover rounded-xl group-hover:shadow-xl" 
                      />
                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </CardItem>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-transparent rounded-bl-[4rem] rounded-tr-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collaborative Cursors - Randomly positioned in features section */}
      <AnimatePresence>
        {mounted && cursorPositions.length === 5 && (
          <>
            {/* Random cursors positioned around the cards */}
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
                name="Emma"
                avatar="EW"
                initialX={0}
                initialY={0}
                delay={1}
                isInteractive={false}
                color="#FF4D4D"
              />
            </div>
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
                name="David"
                avatar="DC"
                initialX={0}
                initialY={0}
                delay={1.3}
                isInteractive={false}
                color="#FF6B9D"
              />
            </div>
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
                name="Lisa"
                avatar="LM"
                initialX={0}
                initialY={0}
                delay={1.6}
                isInteractive={false}
                color="#3575FF"
              />
            </div>
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
                name="Tom"
                avatar="TW"
                initialX={0}
                initialY={0}
                delay={1.9}
                isInteractive={false}
                color="#8B5CF6"
              />
            </div>
            <div 
              className="absolute hidden lg:block"
              style={{
                left: `${cursorPositions[4].x}%`,
                top: `${cursorPositions[4].y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 25,
              }}
            >
              <FloatingAvatar
                name="Anna"
                avatar="AK"
                initialX={0}
                initialY={0}
                delay={2.2}
                isInteractive={false}
                color="#10B981"
              />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* GUEST Cursor - Follows user's mouse when over features section - Direct tracking */}
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
              Guest
            </span>
          </div>

          {/* Subtle glow effect */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: "-6px",
              left: "-6px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#FBBF24",
              filter: "blur(10px)",
              zIndex: 1,
            }}
          />
        </div>
      )}
    </section>
  );
}
