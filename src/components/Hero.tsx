import { motion } from 'framer-motion'
import { ArrowDown, Download, Linkedin, Mail, Github } from 'lucide-react'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: '20%', right: '10%' }}
        />
      </div>

      <div className="max-w-4xl text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent mb-6 leading-tight"
        >
          Connor van Herick
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl md:text-3xl font-medium text-slate-200 mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          UC Berkeley CS | Machine Learning Engineer Intern @ LendingClub
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Building production-minded software and machine learning systems.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed italic"
        >
          Targeting full-time software engineering and machine learning engineering roles after graduation.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
        >
          <Link to="experience" smooth={true} duration={800}>
            <motion.button className="btn btn-primary group flex items-center gap-2 px-8 py-4 text-lg">
              View Experience
              <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </Link>
          <motion.a 
            href="/resume.pdf" 
            download
            className="btn btn-secondary group flex items-center gap-2 px-8 py-4 text-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Download size={20} />
            Resume
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/connorvanherick" 
            target="_blank" 
            rel="noopener"
            className="btn btn-secondary group flex items-center gap-2 px-8 py-4 text-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Linkedin size={20} />
            LinkedIn
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex gap-6 justify-center">
            <motion.a href="https://github.com/connorvanherick" target="_blank" rel="noopener" className="w-14 h-14 bg-slate-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300" whileHover={{ rotate: 360 }}>
              <Github size={24} />
            </motion.a>
            <motion.a href="mailto:connor@connorvanherick.com" className="w-14 h-14 bg-slate-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300" whileHover={{ rotate: 360 }}>
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
