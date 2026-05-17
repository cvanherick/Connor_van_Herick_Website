import { motion } from 'framer-motion'
import { GraduationCap, Code2, BrainCog, TrendingUp } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent mb-6">
            About
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card max-w-3xl mx-auto p-12 text-lg leading-relaxed text-slate-200"
        >
          <p className="mb-8 text-xl">
            Computer Science student at UC Berkeley with experience leading machine learning projects, building secure systems, and designing scalable software products.
          </p>
          <p className="mb-8 text-xl">
            My work spans predictive modeling, AI-driven decision systems, cryptographic infrastructure, and full-stack product thinking.
          </p>
          <p className="text-xl">
            I'm especially interested in the future of intelligent systems, startups, and human-AI collaboration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-8 mt-24"
        >
          <div className="card p-8 text-center group hover:lift">
            <GraduationCap size={56} className="mx-auto mb-6 text-accent group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">UC Berkeley</h3>
            <p className="text-slate-400 mb-2">Computer Science</p>
            <p className="font-semibold text-accent text-xl">GPA: 3.86</p>
            <p className="text-slate-400 text-sm">May 2027</p>
          </div>

          <div className="md:col-span-3 card p-8 group hover:lift">
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-xl">
                <Code2 size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Systems</h4>
                  <p className="text-slate-400 text-sm">Secure + Scalable</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-xl">
                <BrainCog size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold">ML Focus</h4>
                  <p className="text-slate-400 text-sm">Predictive Modeling</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-xl">
                <TrendingUp size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Products</h4>
                  <p className="text-slate-400 text-sm">AI Systems</p>
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

