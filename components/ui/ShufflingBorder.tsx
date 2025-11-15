"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface ShufflingBorderProps {
  children: ReactNode;
  className?: string;
}

export default function ShufflingBorder({
  children,
  className = "",
}: ShufflingBorderProps) {
  const [borderRadius, setBorderRadius] = useState("24px 40px 16px 32px");

  useEffect(() => {
    const borderSets = [
      "24px 40px 16px 32px",
      "32px 16px 40px 24px",
      "40px 24px 32px 16px",
      "16px 32px 24px 40px",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % borderSets.length;
      setBorderRadius(borderSets[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          borderRadius: borderRadius,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(45deg, #656BFF, #98A8FA, #A5B4FC, #656BFF)",
          backgroundSize: "400% 400%",
          padding: "2px",
          borderRadius: borderRadius,
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            borderRadius: "inherit",
            background:
              "linear-gradient(45deg, #656BFF, #98A8FA, #A5B4FC, #656BFF)",
            backgroundSize: "400% 400%",
          }}
          className="w-full h-full"
        >
          <div
            className="bg-white w-full h-full"
            style={{ borderRadius: "inherit" }}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
