import { motion } from 'framer-motion'
import { Bot, BrainCog, Eye } from 'lucide-react'

const courses = [
  {
    code: 'CS 189',
    name: 'Machine Learning',
    skills: ['supervised learning', 'model evaluation', 'optimization', 'probability'],
    icon: BrainCog, status: 'Completed',
  },
  {
    code: 'CS C182',
    name: 'Deep Neural Networks',
    skills: ['deep learning', 'backpropagation', 'neural architectures', 'training dynamics'],
    icon: BrainCog, status: 'In progress',
  },
  {
    code: 'CS 180',
    name: 'Computer Vision',
    skills: ['image processing', 'feature matching', 'geometry', 'computational photography'],
    icon: Eye, status: 'In progress',
  },
  {
    code: 'EECS C106A',
    name: 'Introduction to Robotics',
    skills: ['robot kinematics', 'motion planning', 'control', 'robot perception'],
    icon: Bot, status: 'Completed',
  },
  { code: 'EECS C183', name: 'Natural Language Processing', skills: ['language models', 'text representations', 'NLP'], icon: BrainCog, status: 'In progress' },
]

const Coursework = () => {
  return (
    <section id="coursework" aria-labelledby="coursework-title" className="py-32 px-6 bg-primary/35">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-6">
            <span id="coursework-title">Coursework</span>
          </h2>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto">
            Selected technical classes and the practical skills I use from them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.code}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="card p-6 group"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/15 border border-cream/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <course.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-secondary">{course.code}</p>
                  <h3 className="mt-1 text-xl font-bold text-cream leading-snug">{course.name}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-cream/45">{course.status}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-cream/10 bg-cream/5 px-3 py-2 text-sm font-medium text-cream/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Coursework
