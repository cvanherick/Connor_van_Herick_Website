import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden px-6 pb-20 pt-36 md:pb-28 md:pt-48">
      <div className="pointer-events-none absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(20,184,166,0.9)]" aria-hidden="true" />
            ML / AI Systems / Software Engineering
          </div>
          <h1 id="hero-title" className="max-w-4xl text-6xl font-semibold tracking-[-0.07em] text-cream md:text-8xl">Connor<br className="hidden md:block" /> van Herick</h1>
          <p className="mt-8 max-w-2xl text-2xl leading-snug text-cream/85 md:text-3xl">ML Engineer building production-minded data, modeling, and robotics systems.</p>
          <p className="mt-5 text-base font-medium text-cream/65 md:text-lg">UC Berkeley · Computer Science + Data Science · Graduating Spring 2027</p>
          <p className="mt-6 max-w-2xl text-sm font-semibold leading-relaxed text-accent md:text-base">73M+ financial records · uplift modeling · ROS 2 robotics</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="./Connor_van_Herick_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex items-center gap-2">View Resume <ArrowUpRight size={17} /></a>
            <a href="#projects" className="btn btn-secondary inline-flex items-center gap-2">See selected work <ArrowDown size={17} /></a>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a aria-label="Email Connor" href="mailto:cvanherick@berkeley.edu" className="inline-flex items-center gap-2 text-link"><Mail size={16} /> cvanherick@berkeley.edu</a>
            <a href="https://github.com/cvanherick" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-link"><Github size={16} /> GitHub</a>
            <a href="https://www.linkedin.com/in/connor-vanherick/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-link"><Linkedin size={16} /> LinkedIn</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .12 }} className="hero-panel relative overflow-hidden p-3 md:p-5">
          <img src="./assets/connor-headshot.jpg?v=3" alt="Connor van Herick smiling outdoors" className="aspect-[4/5] w-full rounded-2xl object-cover object-center" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
