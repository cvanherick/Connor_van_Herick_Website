import { motion } from 'framer-motion'
import { FileText, Mail, Linkedin, Github } from 'lucide-react'

const Hero = () => {
  return (
    <section id="hero" aria-labelledby="hero-title" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,184,166,0.22),transparent_38%,rgba(245,158,11,0.14)_78%)]"
          animate={{ 
            opacity: [0.45, 0.75, 0.45]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cream via-white to-accent bg-clip-text text-transparent mb-6 leading-tight"
        >
          <span id="hero-title">Connor van Herick</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl md:text-3xl font-medium text-cream/90 mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          ML engineer building reliable AI, data, and decision systems
          <span className="block text-xl md:text-2xl text-cream/60 mt-3">UC Berkeley · Computer Science + Data Science · Spring 2027</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
        >
          <motion.a 
            href="./Connor_van_Herick_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary group flex items-center gap-2 px-8 py-4 text-lg"
          >
            <FileText size={20} />
            View Resume
          </motion.a>
          <motion.a
            href="https://github.com/cvanherick"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary group flex items-center gap-2 px-8 py-4 text-lg"
          >
            <Github size={20} />
            GitHub
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/connor-vanherick/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary group flex items-center gap-2 px-8 py-4 text-lg"
          >
            <Linkedin size={20} />
            LinkedIn
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex gap-6 justify-center">
            <motion.a aria-label="Email Connor" href="mailto:cvanherick@berkeley.edu" className="w-12 h-12 bg-cream/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cream/10 hover:border-accent/50 hover:bg-accent/15 transition-colors duration-300">
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
