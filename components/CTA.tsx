"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 lg:py-32 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-200 inline-flex items-center gap-2 shadow-xl"
              style={{
                boxShadow: '0 10px 40px rgba(147, 51, 234, 0.3), 0 4px 12px rgba(219, 39, 119, 0.2)'
              }}
            >
              Try for free today
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 border-2 border-gray-300 shadow-lg"
            >
              Schedule a Demo
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <p className="text-sm text-gray-600 mt-6 font-medium">
            No credit card required • Free 7-day trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}

