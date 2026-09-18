import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden px-6 pb-20 pt-36 md:pb-28 md:pt-48">
      <div className="pointer-events-none absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <p className="eyebrow mb-6">ML / AI Systems / Software Engineering</p>
          <h1 id="hero-title" className="max-w-4xl text-6xl font-semibold tracking-[-0.07em] text-cream md:text-8xl">Connor<br className="hidden md:block" /> van Herick</h1>
          <p className="mt-8 max-w-2xl text-2xl leading-snug text-cream/85 md:text-3xl">Building reliable AI, data, and decision systems.</p>
          <p className="mt-5 text-base font-medium text-cream/55 md:text-lg">UC Berkeley · Computer Science + Data Science · Spring 2027</p>
          <p className="mt-6 max-w-2xl text-sm font-semibold leading-relaxed text-accent md:text-base">ML systems across 73M+ financial records · agentic research infrastructure · robotics</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="./Connor_van_Herick_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex items-center gap-2">View Resume <ArrowUpRight size={17} /></a>
            <a href="https://github.com/cvanherick" target="_blank" rel="noopener noreferrer" className="btn btn-secondary inline-flex items-center gap-2">GitHub <Github size={17} /></a>
            <a href="https://www.linkedin.com/in/connor-vanherick/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary inline-flex items-center gap-2">LinkedIn <Linkedin size={17} /></a>
          </div>
          <a aria-label="Email Connor" href="mailto:cvanherick@berkeley.edu" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cream/55 transition-colors hover:text-accent"><Mail size={16} /> cvanherick@berkeley.edu</a>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .12 }} className="hero-panel relative p-5 md:p-7">
          <div className="mb-8 flex items-center justify-between border-b border-cream/10 pb-4 text-xs font-bold uppercase tracking-[.2em] text-cream/45"><span>Systems in motion</span><span className="text-accent">01 / 03</span></div>
          <div className="space-y-4">
            <div className="signal-node"><span className="signal-index">01</span><div><strong>Large-scale data</strong><small>73M+ records · PySpark · SQL</small></div></div>
            <div className="signal-line" />
            <div className="signal-node active"><span className="signal-index">02</span><div><strong>Model + orchestrate</strong><small>Uplift models · agentic workflows</small></div></div>
            <div className="signal-line" />
            <div className="signal-node"><span className="signal-index">03</span><div><strong>Ship decisions</strong><small>Robotics · secure systems · impact</small></div></div>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-cream/10 pt-5">
            <div><strong className="block text-2xl tracking-tight text-cream">73M+</strong><span className="text-xs text-cream/45">records</span></div>
            <div><strong className="block text-2xl tracking-tight text-cream">2.04%</strong><span className="text-xs text-cream/45">reduction</span></div>
            <div><strong className="block text-2xl tracking-tight text-cream">ROS 2</strong><span className="text-xs text-cream/45">robotics</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
