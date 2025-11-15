"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Zap,
  Shield,
  GitBranch,
  Cloud,
  Smartphone,
  Database,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "Build robust applications with modern frameworks and best practices.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "AI-Powered Tools",
    description:
      "Leverage AI to accelerate development and automate repetitive tasks.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Enterprise-grade security built into every application from the start.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: GitBranch,
    title: "MCP Development",
    description:
      "Expert Model Context Protocol development for advanced AI integrations.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Cloud,
    title: "Cloud Deployment",
    description:
      "Seamless deployment to AWS, Vercel, and other cloud platforms.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Scalable database architecture optimized for performance and reliability.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Applications built to scale globally with CDN and edge computing.",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function Features() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50"
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
            Our{" "}
            <span className="bg-gradient-to-r from-primary-600 to-accent-orange bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive development and deployment services to bring your
            vision to life.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

