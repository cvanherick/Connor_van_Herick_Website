import { motion } from 'framer-motion'
import { GraduationCap, Code2, BrainCog, TrendingUp } from 'lucide-react'

const About = () => {
  return (
    <section id="about" aria-labelledby="about-title" className="py-28 px-6 bg-primary/35">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-6">
            <span id="about-title">About Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto w-full max-w-sm"
          >
            <div className="relative overflow-hidden rounded-3xl border border-cream/15 bg-surface/75 p-2 shadow-2xl shadow-accent/15">
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
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-lg leading-relaxed text-cream"
          >
            <p className="text-2xl leading-relaxed text-cream">
              Hi! I'm Connor, a UC Berkeley student pursuing a BA in Computer Science and a BA in Data Science with an emphasis in Robotics. I'm passionate about building large-scale backend systems and machine learning pipelines that are reliable, efficient, and maintainable.
            </p>
            <p className="mt-6 text-xl leading-relaxed text-cream/75">
              Outside of tech, I love climbing and skiing. Both keep me curious, grounded, and comfortable pushing beyond my limits, whether I’m working through a route or exploring a new mountain. Feel free to connect at <a href="mailto:cvanherick@berkeley.edu" className="font-semibold text-accent hover:text-secondary transition-colors">cvanherick@berkeley.edu</a>.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          <div className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Outside of work</p>
            <h3 className="mt-2 text-3xl font-bold text-cream">Climbing, skiing, and sharing the work</h3>
          </div>
          <figure className="group overflow-hidden rounded-3xl border border-cream/10 bg-surface/70 md:col-span-2">
            <img src="./assets/happen-bank-presentation-optimized.jpg" alt="Connor presenting at the end of his Happen Bank internship" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            <figcaption className="px-5 py-4 text-sm font-medium text-cream/65">Presenting project results at the end of my Happen Bank internship.</figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
            <figure className="group overflow-hidden rounded-3xl border border-cream/10 bg-surface/70">
              <img src="./assets/skiing-optimized.jpg" alt="Connor skiing in the mountains" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <figcaption className="px-4 py-3 text-sm font-medium text-cream/65">Skiing in the Sierra.</figcaption>
            </figure>
            <figure className="group overflow-hidden rounded-3xl border border-cream/10 bg-surface/70">
              <img src="./assets/climbing-optimized.jpg" alt="Connor climbing outdoors" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <figcaption className="px-4 py-3 text-sm font-medium text-cream/65">Climbing outdoors.</figcaption>
            </figure>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-8 mt-20"
        >
          <div className="card p-8 text-center group hover:lift">
            <GraduationCap size={56} className="mx-auto mb-6 text-accent group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">UC Berkeley</h3>
            <p className="text-cream/60 mb-2">Computer Science BA + Data Science BA</p>
            <p className="text-cream/60 text-sm mb-2">Robotics emphasis</p>
            <p className="font-semibold text-accent text-xl">GPA: 3.81</p>
            <p className="text-cream/60 text-sm">Expected Spring 2027</p>
          </div>

          <div className="md:col-span-3 card p-8 group hover:lift">
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-3 p-4 bg-cream/5 rounded-xl border border-cream/10">
                <Code2 size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Systems</h4>
                  <p className="text-cream/60 text-sm">Secure + Scalable</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-cream/5 rounded-xl border border-cream/10">
                <BrainCog size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold">ML Focus</h4>
                  <p className="text-cream/60 text-sm">Predictive Modeling</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-cream/5 rounded-xl border border-cream/10">
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
