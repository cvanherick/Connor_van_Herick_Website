import { motion } from 'framer-motion'
import { GraduationCap, Code2, BrainCog, TrendingUp } from 'lucide-react'

const About = () => {
  return (
    <section id="about" aria-labelledby="about-title" className="px-6 py-24 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="section-heading mb-6">
            <span id="about-title">About Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto w-full max-w-sm"
          >
            <div className="relative overflow-hidden rounded-2xl border border-cream/10 bg-surface/50 p-2">
              <img
                src="./assets/headshot.jpeg"
                alt="Connor van Herick"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover object-[50%_28%]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-lg leading-relaxed text-cream"
          >
            <p className="text-xl leading-relaxed text-cream">
              Hi! I'm Connor, a UC Berkeley student pursuing a BA in Computer Science and a BA in Data Science with an emphasis in Robotics. I'm passionate about building large-scale backend systems and machine learning pipelines that are reliable, efficient, and maintainable.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-cream/70">
              Outside of tech, I love climbing and skiing. Both keep me curious, grounded, and comfortable pushing beyond my limits. <a href="./outside-work/" className="font-semibold text-accent transition-colors hover:text-secondary">See what I’m up to outside of work <span aria-hidden="true">→</span></a>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <a href="./outside-work/" className="group flex items-center justify-between gap-6 border-y border-cream/10 py-6 transition-colors hover:border-accent/40">
            <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">Personal context</p><h3 className="mt-2 text-xl font-semibold text-cream">Climbing, skiing, and community</h3><p className="mt-2 text-cream/60">A short look at what keeps me curious outside of engineering.</p></div>
            <span className="shrink-0 text-2xl text-accent transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 grid border-t border-cream/10 md:grid-cols-4"
        >
          <div className="border-b border-cream/10 p-6 md:border-b-0 md:border-r">
            <GraduationCap size={30} className="mb-5 text-accent" />
            <h3 className="mb-2 text-xl font-semibold">UC Berkeley</h3>
            <p className="text-cream/60 mb-2">Computer Science BA + Data Science BA</p>
            <p className="text-cream/60 text-sm mb-2">Robotics emphasis</p>
            <p className="text-lg font-semibold text-accent">GPA: 3.81</p>
            <p className="text-cream/60 text-sm">Expected Spring 2027</p>
          </div>

          <div className="p-6 md:col-span-3">
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              <div className="flex items-center gap-3">
                <Code2 size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Systems</h4>
                  <p className="text-cream/60 text-sm">Secure + Scalable</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BrainCog size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold">ML Focus</h4>
                  <p className="text-cream/60 text-sm">Predictive Modeling</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Products</h4>
                  <p className="text-cream/60 text-sm">AI Systems</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
