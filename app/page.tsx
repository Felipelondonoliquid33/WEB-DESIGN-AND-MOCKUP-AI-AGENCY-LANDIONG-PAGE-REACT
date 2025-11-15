"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowInputBar from "@/components/GlowInputBar";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import ShipFaster from "@/components/ShipFaster";
import MarqueeMockup from "@/components/MarqueeMockup";
// import ThreeColumnReveal from "@/components/ThreeColumnReveal";
import ThreeColumnFeatures from "@/components/ThreeColumnFeatures";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import TrustedBy from "@/components/TrustedBy";
import FallingText from "@/components/FallingText";
import InteractiveBorder from "@/components/ui/InteractiveBorder";
import Squares from "@/components/Squares";

const AnimatedNumbers = dynamic(() => import("@/components/AnimatedNumbers"), {
  ssr: false,
});

// Animated connector line component - just vertical line connecting input to features
function GlowLineConnector() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div style={{ position: 'relative', width: '100%', height: '100px', display: 'flex', justifyContent: 'center', zIndex: 2 }}>
      {/* Vertical line from input bar extending down */}
      <motion.div
        ref={ref}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3px',
          height: '100px',
          background: 'linear-gradient(180deg, #ff4d4d 0%, #ff6b9d 50%, #3575ff 100%)',
          borderRadius: '4px',
          transformOrigin: 'top',
          zIndex: 3,
        }}
      />
    </div>
  );
}

export default function Home() {
  const handleShuffle = () => {
    // Handle shuffle action - can be customized as needed
    console.log("Shuffle clicked");
  };

  return (
    <main className="min-h-screen bg-white relative" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Animated sketch sheet background - covers entire page */}
      <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(0, 0, 0, 0.15)"
          hoverFillColor="rgba(51, 51, 51, 0.2)"
        />
      </div>
      
      {/* Header and Hero - transparent to show animated squares */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Header />
        <InteractiveBorder onShuffle={handleShuffle}>
          <Hero />
        </InteractiveBorder>
      </div>
      
      {/* Content section - squares visible here */}
      <div className="relative" style={{ zIndex: 1 }}>
        <TrustedBy />
        {/* 3-column animated section below TrustedBy */}
        {/* <ThreeColumnReveal /> */}
        {/* Glow input bar with animated border above features */}
        <GlowInputBar />
        {/* Connecting animated glow line */}
        <GlowLineConnector />
        {/* Advanced animated features section */}
        <ThreeColumnFeatures />
        <ShipFaster />
        <MarqueeMockup />
        <Process />
        <Testimonials />
        <AnimatedNumbers />
        <FallingText
          text="Unleash the power of AI Build your application in minutes See the future request your free demo today"
          highlightWords={["AI", "Build", "future", "demo"]}
          highlightClass="highlighted"
          trigger="click"
          fontSize="calc(2rem + 10px)"
          letterGap="10px"
          demoLink="/request-demo"
        />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

