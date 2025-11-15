"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Copy, FileCode, Smartphone } from "lucide-react";

const exportOptions = [
  {
    icon: Code,
    name: "React",
    description: "Copy as React components",
    shortcut: "⌘C",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileCode,
    name: "Next.js",
    description: "Export to Next.js project",
    shortcut: "⌘C",
    color: "from-gray-700 to-gray-900",
  },
  {
    icon: Smartphone,
    name: "React Native",
    description: "Copy as React Native components",
    shortcut: "⌘C",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Copy,
    name: "HTML/CSS",
    description: "Copy as HTML and CSS",
    shortcut: "⌘C",
    color: "from-orange-500 to-red-500",
  },
];

export default function Export() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 bg-white border-y border-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Export to your{" "}
            <span className="bg-gradient-to-r from-primary-600 to-accent-orange bg-clip-text text-transparent">
              preferred platform
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform works with the tools you already love. Copy any
            component and paste wherever you need.
          </p>
        </motion.div>

        {/* Export Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {option.name}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {option.description}
                  </p>

                  {/* Shortcut */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500 font-mono">
                      {option.shortcut}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Copy size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Hover effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Ready to export? Copy any component and paste it into your project.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

