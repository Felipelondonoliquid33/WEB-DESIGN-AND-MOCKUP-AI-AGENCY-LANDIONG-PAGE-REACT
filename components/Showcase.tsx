"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "AI-powered shopping experience",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "SaaS Dashboard",
    description: "Enterprise analytics platform",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Mobile Banking App",
    description: "Secure financial services",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "Healthcare Portal",
    description: "Patient management system",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Learning Platform",
    description: "Interactive education hub",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    name: "Real Estate App",
    description: "Property management solution",
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function Showcase() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-24 lg:py-32 bg-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-primary-400 to-accent-orange bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore some of the amazing applications we've built for our
            clients.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              {/* Project Visual */}
              <div
                className={`h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1">
                    {project.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-white font-semibold flex items-center gap-2"
                >
                  View Project
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors duration-200 inline-flex items-center gap-2"
          >
            View All Projects
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

