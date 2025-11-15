import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Relume Style
        primary: {
          50: "#FCFAF7", // Soft neutral hero background
          100: "#F5F6FA", // Alternative soft background
          700: "#1F2937", // Card backgrounds
          800: "#111827", // Dark sections
          900: "#0A0F1E", // Deep navy - backgrounds
        },
        // Accent Colors - Relume Style
        accent: {
          primary: "#656BFF", // Vibrant blue - primary CTA (Relume)
          secondary: "#98A8FA", // Light blue - hover states
          tertiary: "#8B5CF6", // Purple - secondary elements
          muted: "#A5B4FC", // Muted purple satin
        },
        // Neutral Colors
        neutral: {
          50: "#F9FAFB", // Light backgrounds
          100: "#F3F4F6", // Borders, dividers
          200: "#E5E7EB", // Light borders
          800: "#1F2937", // Text on light bg
          900: "#16181D", // Off-black headings (Relume)
        },
        // Semantic Colors
        success: "#10B981", // Green
        warning: "#F59E0B", // Amber
        info: "#3B82F6", // Blue
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Space Grotesk",
          "Inter",
          "Satoshi",
          "DM Sans",
          "SF Pro Display",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "var(--font-body)",
          "Inter",
          "Satoshi",
          "DM Sans",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "Fira Code",
          "monospace",
        ],
        sans: [
          "var(--font-body)",
          "Inter",
          "Space Grotesk",
          "Satoshi",
          "DM Sans",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        sm: "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        base: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
        lg: "clamp(1.125rem, 1rem + 0.625vw, 1.5rem)",
        xl: "clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)",
        "2xl": "clamp(1.5rem, 1.3rem + 1vw, 2.25rem)",
        "3xl": "clamp(1.875rem, 1.6rem + 1.375vw, 3rem)",
        "4xl": "clamp(2.25rem, 1.9rem + 1.75vw, 3.75rem)",
        "5xl": "clamp(3rem, 2.5rem + 2.5vw, 4.5rem)",
        "6xl": "clamp(3.75rem, 3rem + 3.75vw, 6rem)",
      },
      lineHeight: {
        tight: "1.15",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      spacing: {
        // Based on 4px base unit
        1: "0.25rem", // 4px
        2: "0.5rem", // 8px
        3: "0.75rem", // 12px
        4: "1rem", // 16px
        6: "1.5rem", // 24px
        8: "2rem", // 32px
        10: "2.5rem", // 40px
        12: "3rem", // 48px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
        32: "8rem", // 128px
        40: "10rem", // 160px
        48: "12rem", // 192px
      },
      borderRadius: {
        sm: "0.375rem", // 6px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        "3xl": "2rem", // 32px
        full: "9999px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

