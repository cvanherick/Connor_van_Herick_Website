import { motion } from 'framer-motion'
import { Bot, ExternalLink, Network, ScanSearch } from 'lucide-react'

const WhatImBuilding = () => {
  const current = [
    {
      icon: ScanSearch,
      title: 'CS 180 · Computer Vision',
      description: 'Building image-processing and computational photography systems, with Project 1 documented online.',
      href: 'https://cvanherick.github.io/Connor_van_Herick_CS180/projects/project1/',
    },
    {
      icon: Bot,
      title: 'Berkeley Law · Clean Slate Initiative',
      description: 'Designing reliable agentic infrastructure, web-scraping pipelines, and integrity checks for research workflows.',
    },
    {
      icon: Network,
      title: 'Cadre Agent Team Framework',
      description: 'Evolving a YAML-driven framework for composing, validating, and evaluating AI agent teams.',
    }
  ]

  return (
    <section id="building" aria-labelledby="building-title" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cream via-white to-accent bg-clip-text text-transparent mb-6">
            <span id="building-title">Currently</span>
          </h2>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto">
            A few concrete systems I’m actively developing or documenting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {current.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 text-center group rounded-3xl relative overflow-hidden bg-surface/60 backdrop-blur-xl border border-cream/10"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent/20 to-secondary/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <item.icon size={40} className="text-accent drop-shadow-lg" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-cream">{item.title}</h3>
              <p className="text-cream/60 leading-relaxed">{item.description}</p>
              {item.href && (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-secondary transition-colors">
                  View CS 180 work <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatImBuilding
