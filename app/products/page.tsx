"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Code, Palette, Globe, Layers, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import Badge from "@/components/ui/Badge";
import MacbookScrollDemo from "@/components/macbook-scroll-demo";

export default function ProductsPage() {
  const products = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Site Builder",
      description: "Generate complete websites in minutes with our AI-powered site builder. From sitemaps to style guides.",
      features: ["AI-powered generation", "Real-time collaboration", "Export to any platform"],
      pricing: "Starting at $29/month",
      isPopular: true,
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Component Library",
      description: "1000+ responsive components built with best practices for React, Next.js, and Tailwind CSS.",
      features: ["1000+ components", "Mobile responsive", "Copy & paste ready"],
      pricing: "Starting at $19/month",
      isPopular: false,
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design System",
      description: "Complete design systems and style guides that maintain consistency across your projects.",
      features: ["Pre-built themes", "Custom branding", "Design tokens"],
      pricing: "Starting at $39/month",
      isPopular: false,
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Prompt to Sitemap",
      description: "The best way to start off your new project. Use AI to map out all your key pages with just a few sentences about your company.",
      image: "🗺️",
      features: ["Map out key content", "Scope projects better"],
    },
    {
      step: "02", 
      title: "Sitemap to Wireframe",
      description: "Achieve your first draft in the first minute. Sit back and watch AI magically turn your Sitemap into wireframes in one click.",
      image: "📐",
      features: ["Editing super powers", "No AI-template gimmicks"],
    },
    {
      step: "03",
      title: "Wireframes to Style Guide", 
      description: "Streamline one of the most time-consuming stages of web design with our Style Guide Builder—create visual concepts.",
      image: "🎨",
      features: ["Streamline approvals", "Build faster"],
    },
    {
      step: "04",
      title: "Export Everywhere",
      description: "Site Builder works with the tools you already love and respects your process. Copy any component and paste wherever you need.",
      image: "🚀",
      features: ["Figma integration", "React components"],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6">AI-Powered Development Tools</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <GradientText>Websites designed</GradientText>
              <br />
              & built faster with AI
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Use AI as your design ally, not a replacement. Instantly generate Sitemaps, 
              Wireframes and Style Guides for marketing websites—all in minutes
            </p>

            {/* Macbook scroll hero animation */}
            <div className="relative -mt-4">
              <MacbookScrollDemo />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="!bg-neutral-900 !text-white hover:!bg-neutral-800">
                Try the Site Builder
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="lg">
                Take it for a spin with an example
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">Plan Sitemaps</h3>
              <p className="text-neutral-600 mb-4">Quickly map out your website pages with an AI-generated sitemap</p>
              <Button variant="ghost" size="sm">Give it a try</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">📐</div>
              <h3 className="text-xl font-semibold mb-2">Structure Wireframes</h3>
              <p className="text-neutral-600 mb-4">Effortlessly structure your pages and copy with distraction-free wireframes</p>
              <Button variant="ghost" size="sm">Give it a try</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Conceptualise Style Guide</h3>
              <p className="text-neutral-600 mb-4">Instantly create design concepts and apply the winning style across pages</p>
              <Button variant="ghost" size="sm">Give it a try</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ship faster</h2>
            <p className="text-xl text-neutral-600">From concept to completion in four simple steps</p>
          </div>

          <div className="space-y-20">
            {workflow.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-sm text-neutral-400 mb-2">{item.step}</div>
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-neutral-600 mb-6">{item.description}</p>
                  <div className="space-y-3">
                    {item.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                        <span className="text-neutral-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`bg-neutral-50 rounded-2xl p-12 text-center ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <div className="text-8xl mb-4">{item.image}</div>
                  <div className="text-neutral-500">Preview coming soon</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Building Blocks</h2>
            <p className="text-xl text-neutral-600">Choose the perfect tools for your workflow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative ${
                  product.isPopular ? 'ring-2 ring-neutral-900' : ''
                }`}
              >
                {product.isPopular && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="bg-neutral-900 text-white">Most Popular</Badge>
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
                    {product.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                  <p className="text-neutral-600">{product.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-neutral-100">
                  <div className="text-lg font-semibold mb-4">{product.pricing}</div>
                  <Button 
                    variant={product.isPopular ? "primary" : "ghost"} 
                    size="md" 
                    className={product.isPopular ? "!bg-neutral-900 !text-white hover:!bg-neutral-800 w-full" : "w-full"}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Export to<br />
                <GradientText>Figma, Webflow & React</GradientText>
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Site Builder works with the tools you already love and respects your process. 
                Copy any component and paste wherever you need.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" size="sm">Copy to Figma ⌘C</Button>
                <Button variant="ghost" size="sm">Copy to Webflow ⌘C</Button>
                <Button variant="ghost" size="sm">Copy to React ⌘C</Button>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-12 text-center">
              <Download className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
              <div className="text-neutral-500">Export tools preview</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Experience the power of our AI Site Builder today
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              Build a website in under 5 minutes. Yes really.
            </p>
            <Button variant="primary" size="lg" className="!bg-white !text-neutral-900 hover:!bg-neutral-100">
              Try the Site Builder
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-sm text-neutral-400 mt-4">700k+ Designers & Developers trust our platform</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}