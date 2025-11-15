"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  animated?: boolean;
  className?: string;
}

export default function Badge({
  children,
  icon,
  animated = false,
  className = "",
}: BadgeProps) {
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 10 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm font-medium text-neutral-800 shadow-sm ${className}`}
    >
      {icon || <Sparkles size={14} className="text-accent-primary" />}
      <span>{children}</span>
    </motion.div>
  );
}

