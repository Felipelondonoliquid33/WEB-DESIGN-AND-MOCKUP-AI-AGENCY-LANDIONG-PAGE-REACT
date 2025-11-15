"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import './ui/GlowInputBar.css';

export default function GlowInputBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && borderRef.current && formRef.current) {
      // GSAP timeline for entrance animation
      const tl = gsap.timeline();
      
      // Animate the border from left to right
      tl.fromTo(
        borderRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1, ease: "power3.out" }
      );
      
      // Animate the form appearing with a bounce
      tl.fromTo(
        formRef.current,
        { scale: 0.95, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.4"
      );
    }
  }, [isInView]);

  return (
    <motion.div 
      className="glow-input-bar-wrapper" 
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated Glow Border */}
      <div
        ref={borderRef}
        className="glow-input-bar-animated-border"
      />
      <form className="glow-input-bar-form" ref={formRef}>
        <textarea
          className="glow-input-bar-textarea"
          placeholder="Describe a company in a sentence or two..."
          maxLength={5000}
          rows={1}
        />
        <motion.button 
          type="submit" 
          className="glow-input-bar-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="glow-input-bar-icon">✨</span> Generate
        </motion.button>
      </form>
    </motion.div>
  );
}
