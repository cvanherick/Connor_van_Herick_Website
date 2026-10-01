import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden px-6 pb-24 pt-36 md:pb-28 md:pt-44">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <p className="eyebrow mb-5">ML engineering · systems · robotics</p>
          <h1 id="hero-title" className="max-w-4xl text-6xl font-semibold tracking-[-0.065em] text-cream md:text-7xl">Connor<br className="hidden md:block" /> van Herick</h1>
          <p className="mt-5 text-base font-medium text-cream/65 md:text-lg">UC Berkeley · Computer Science + Data Science · Spring 2027</p>
          <p className="mt-7 max-w-xl text-lg font-medium leading-relaxed text-cream/80 md:text-xl">I build reliable machine learning, data, and robotics systems that turn messy inputs into useful decisions.</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="./Connor_van_Herick_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex items-center gap-2">View Resume <ArrowUpRight size={17} /></a>
            <a href="#projects" className="btn btn-secondary inline-flex items-center gap-2">See selected work <ArrowDown size={17} /></a>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a aria-label="Email Connor" href="mailto:cvanherick@berkeley.edu" className="inline-flex items-center gap-2 text-link"><Mail size={16} /> Email</a>
            <a href="https://github.com/cvanherick" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-link"><Github size={16} /> GitHub</a>
            <a href="https://www.linkedin.com/in/connor-vanherick/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-link"><Linkedin size={16} /> LinkedIn</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .12 }} className="hero-panel relative overflow-hidden p-2">
          <img src="./assets/connor-headshot.jpg?v=4" alt="Connor van Herick smiling outdoors" width="960" height="1200" fetchPriority="high" decoding="async" className="aspect-[4/5] w-full rounded-xl object-cover object-center" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
