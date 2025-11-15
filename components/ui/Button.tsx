"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonBaseProps = Omit<HTMLMotionProps<"button">, "children">;

interface ButtonProps extends ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 uppercase tracking-wider";
  
  const variants = {
    primary:
      "bg-accent-primary text-white hover:bg-accent-secondary shadow-lg hover:shadow-xl hover:scale-105",
    secondary: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline:
      "bg-transparent text-neutral-900 border-2 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50",
    ghost: "bg-transparent text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs tracking-[0.5px]",
    md: "px-6 py-3 text-sm tracking-[0.5px]",
    lg: "px-8 py-4 text-base tracking-[0.5px]",
  };

  return (
    <motion.button
      whileHover={{ scale: variant === "primary" ? 1.02 : 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      style={{ letterSpacing: "0.5px" }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

