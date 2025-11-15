"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingAvatarProps {
  name: string;
  avatar: string;
  initialX?: number;
  initialY?: number;
  delay?: number;
  isInteractive?: boolean;
  color?: string; // Color for the cursor and button
  sectionSelector?: string; // Custom section selector for interactive mode
}

export default function FloatingAvatar({
  name,
  avatar,
  initialX = 0,
  initialY = 0,
  delay = 0,
  isInteractive = false,
  color = "#656BFF", // Default bright blue
  sectionSelector = "[data-hero-section]", // Default to hero section
}: FloatingAvatarProps) {
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const springX = useSpring(x, { stiffness: 50, damping: 30 });
  const springY = useSpring(y, { stiffness: 50, damping: 30 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(showTimer);
  }, [delay]);

  useEffect(() => {
    if (isInteractive) {
      const handleMouseMove = (e: MouseEvent) => {
        const section = document.querySelector(sectionSelector);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            x.set(e.clientX - rect.left - 30);
            y.set(e.clientY - rect.top - 30);
          }
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    } else {
      // Simulate cursor movement - like someone actively viewing/editing a design document
      // Small random movements within a radius to simulate natural cursor movement
      const simulateMovement = () => {
        // Random movement within a 25-45px radius (simulating natural cursor movement)
        const radius = 25 + Math.random() * 20;
        const angle = Math.random() * Math.PI * 2;
        const moveX = Math.cos(angle) * radius;
        const moveY = Math.sin(angle) * radius;
        
        x.set(moveX);
        y.set(moveY);
        
        // Return to center after movement
        setTimeout(() => {
          x.set(0);
          y.set(0);
        }, 800 + Math.random() * 400);
      };

      // Start at center (relative to parent position)
      x.set(0);
      y.set(0);

      // Initial movement after a delay
      const initialDelay = setTimeout(() => {
        simulateMovement();
      }, 1000 + delay * 500);

      // Simulate cursor movement periodically (like active collaboration)
      const interval = setInterval(() => {
        simulateMovement();
      }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds

      return () => {
        clearTimeout(initialDelay);
        clearInterval(interval);
      };
    }
  }, [isInteractive, initialX, initialY, x, y, delay]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.3, delay },
      }}
      style={{
        x: isInteractive ? springX : x,
        y: isInteractive ? springY : y,
      }}
      className="pointer-events-none relative"
    >
      {/* Cursor Icon */}
      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-10px",
          left: "-6px",
          width: "24px",
          height: "24px",
          zIndex: 2,
        }}
      >
        {/* Cursor SVG - Bright blue with white outline/shadow */}
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
          {/* White outline/shadow for depth */}
          <path
            d="M2 2L2 20L12 15L16 20L16 11L22 8L2 2Z"
            fill="white"
            stroke="white"
            strokeWidth="2"
          />
          {/* Colored cursor fill */}
          <path
            d="M4 4L4 18L11.5 13.5L14.5 18L14.5 10L19.5 8.5L4 4Z"
            fill={color}
          />
        </svg>
      </motion.div>

      {/* Name Tag - Pill-shaped button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "16px",
          left: "10px",
          backgroundColor: color,
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
          {name}
        </span>
      </motion.div>

      {/* Subtle glow effect - pulsing like active cursor */}
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
          backgroundColor: color,
          filter: "blur(10px)",
          zIndex: 1,
        }}
      />
    </motion.div>
  );
}
