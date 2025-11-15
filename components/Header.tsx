"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Button from "./ui/Button";

// Custom SVG Icons to match Relume's exact design
const SiteBuilderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="6" y="6" width="12" height="3" fill="currentColor"/>
    <rect x="6" y="12" width="8" height="2" fill="currentColor"/>
    <rect x="6" y="16" width="6" height="2" fill="currentColor"/>
  </svg>
);

const WebflowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 2L3.5 9L12.5 16L21.5 9L12.5 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M3.5 9V19C3.5 20.1 4.4 21 5.5 21H19.5C20.6 21 21.5 20.1 21.5 19V9" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const FigmaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor"/>
    <path d="M8 16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 8C8 10.2091 6.20914 12 4 12C1.79086 12 0 10.2091 0 8C0 5.79086 1.79086 4 4 4C6.20914 4 8 5.79086 8 8Z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const ReactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="currentColor"/>
    <path d="M12 1C16.5 1 23 4 23 12C23 20 16.5 23 12 23C7.5 23 1 20 1 12C1 4 7.5 1 12 1Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ChromeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M7 16L12 12L17 8" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 16L12 12L7 8" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const LibraryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="8" y="8" width="8" height="2" fill="currentColor"/>
    <rect x="8" y="12" width="6" height="2" fill="currentColor"/>
    <rect x="8" y="16" width="4" height="2" fill="currentColor"/>
  </svg>
);

const navItems = [
  { name: "Features", href: "/features" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
];

const productsMenuItems = [
  {
    name: "AI Site Builder",
    href: "/products/ai-site-builder",
    description: "Generate sitemaps, wireframes & style guides with AI",
    icon: <SiteBuilderIcon />,
    isNew: false,
  },
  {
    name: "Webflow Library",
    href: "/products/webflow-library", 
    description: "1,000+ responsive Webflow components",
    icon: <WebflowIcon />,
    isNew: false,
  },
  {
    name: "Figma Library",
    href: "/products/figma-library",
    description: "Complete Figma component library",
    icon: <FigmaIcon />,
    isNew: false,
  },
  {
    name: "React Library", 
    href: "/products/react-library",
    description: "React components with Tailwind CSS",
    icon: <ReactIcon />,
    isNew: false,
  },
  {
    name: "Chrome Extension",
    href: "/products/chrome-extension",
    description: "Copy components directly from any website",
    icon: <ChromeIcon />,
    isNew: false,
  },
  {
    name: "Libraries",
    href: "/products/libraries",
    description: "Browse all component libraries", 
    icon: <LibraryIcon />,
    isNew: false,
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollY > 20);
  }, [scrollY]);

  const shouldShowFullHeader = scrollDirection === "up" || scrollY < 100;
  const showMinimalHeader = scrollY > 100;

  return (
    <>
      {/* Full Header - Shows when scrolling up or at top */}
      <motion.header
        initial={{ y: -100 }}
        animate={{
          y: shouldShowFullHeader ? 0 : -100,
          opacity: shouldShowFullHeader ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? "h-20 backdrop-blur-md bg-white/90 shadow-md"
            : "h-16 md:h-20 bg-transparent"
        } transition-all duration-300 border-b ${
          isScrolled ? "border-neutral-200" : "border-transparent"
        }`}
      >

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-full max-w-7xl">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl md:text-2xl font-bold font-display"
            >
              <span className="text-neutral-900">
                DevAgency
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <motion.button
                className="flex items-center space-x-1 text-neutral-700 hover:text-neutral-900 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <span>Products</span>
                <motion.div
                  animate={{ rotate: isProductsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>

              {/* Products Dropdown Menu */}
              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 z-50"
                  >
                    <div className="space-y-1">
                      {productsMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group block p-3 rounded-lg hover:bg-neutral-50 transition-all duration-150"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-neutral-900 group-hover:text-neutral-800 text-sm">
                                  {item.name}
                                </h3>
                                {item.isNew && (
                                  <span className="px-2 py-0.5 bg-neutral-900 text-white text-xs rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-t border-neutral-100 mt-2 pt-3 px-3">
                      <Link 
                        href="/products"
                        className="group flex items-center justify-between w-full p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-neutral-900">View all products</span>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* CTA Group */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="primary" size="md" className="!bg-neutral-900 !text-white hover:!bg-neutral-800">
              Start Free Trial
              <ArrowRight size={16} />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-800 hover:text-neutral-900 transition-colors z-10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Products Section in Mobile */}
              <div className="space-y-2">
                <div className="text-neutral-900 font-semibold text-sm">Products</div>
                <div className="pl-4 space-y-3">
                  {productsMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-neutral-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-neutral-100 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-neutral-800 hover:text-neutral-900 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-4 border-t border-neutral-200 space-y-4">
                <Button variant="primary" className="w-full !bg-neutral-900 !text-white hover:!bg-neutral-800">
                  Start Free Trial
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>

      {/* Minimal Header - Always visible when scrolled down (Logo + Start Free Trial) */}
      {/* Minimal Header removed to prevent logo duplication and animation glitch */}
    </>
  );
}

// NavLink component with underline animation
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <motion.span
        className="relative text-neutral-800 hover:text-neutral-900 transition-colors duration-200 font-medium text-sm"
        whileHover="hover"
        initial="initial"
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
          variants={{
            initial: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </motion.span>
    </Link>
  );
}
