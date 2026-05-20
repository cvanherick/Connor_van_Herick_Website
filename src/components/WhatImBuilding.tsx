import { motion } from 'framer-motion'
import { Zap, Brain, Rocket } from 'lucide-react'

const WhatImBuilding = () => {
  const building = [
    {
      icon: Rocket,
      title: 'AI Systems',
      description: 'Intelligent infrastructure for the next generation of products.'
    },
    {
      icon: Brain,
      title: 'Startup Ideas',
      description: 'Exploring ambitious intersections of AI + human potential.'
    },
    {
      icon: Zap,
      title: 'Workflow Software',
      description: 'Tools that think with you - smarter, faster decision making.'
    },
    {
      icon: Rocket,
      title: 'ML Products',
      description: 'Deploying machine learning that drives real business impact.'
    }
  ]

  return (
    <section id="building" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cream via-white to-accent bg-clip-text text-transparent mb-6">
            What I'm Building
          </h2>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto">
            Thinking founder-mode • Always shipping
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {building.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.05 }}
              className="card p-10 text-center group hover:shadow-2xl hover:shadow-accent/20 transition-all duration-700 rounded-3xl relative overflow-hidden bg-surface/60 backdrop-blur-xl border border-cream/10 hover:border-accent/50"
            >
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-accent/20 to-secondary/15 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 backdrop-blur-sm">
                <item.icon size={48} className="text-accent drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-cream">{item.title}</h3>
              <p className="text-cream/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatImBuilding
