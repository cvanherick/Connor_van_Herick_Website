import { motion } from 'framer-motion'
import { Binary, Bot, BrainCog, Database, Eye, LockKeyhole, Network, Sigma } from 'lucide-react'

const courses = [
  {
    code: 'CS 61A',
    name: 'Structure and Interpretation of Computer Programs',
    skills: ['Python', 'abstraction', 'recursion', 'interpreters'],
    icon: Binary,
  },
  {
    code: 'CS 61B',
    name: 'Data Structures',
    skills: ['Java', 'data structures', 'testing', 'software design'],
    icon: Network,
  },
  {
    code: 'CS 61C',
    name: 'Machine Structures',
    skills: ['C', 'RISC-V', 'memory', 'computer architecture'],
    icon: Binary,
  },
  {
    code: 'CS 161',
    name: 'Computer Security',
    skills: ['cryptography', 'threat modeling', 'access control', 'secure systems'],
    icon: LockKeyhole,
  },
  {
    code: 'CS 170',
    name: 'Efficient Algorithms',
    skills: ['algorithm design', 'graphs', 'dynamic programming', 'optimization'],
    icon: Network,
  },
  {
    code: 'CS 189',
    name: 'Machine Learning',
    skills: ['supervised learning', 'model evaluation', 'optimization', 'probability'],
    icon: BrainCog,
  },
  {
    code: 'CS C182',
    name: 'Deep Neural Networks',
    skills: ['deep learning', 'backpropagation', 'neural architectures', 'training dynamics'],
    icon: BrainCog,
  },
  {
    code: 'CS 180',
    name: 'Computer Vision',
    skills: ['image processing', 'feature matching', 'geometry', 'computational photography'],
    icon: Eye,
  },
  {
    code: 'Data C100',
    name: 'Principles & Techniques of Data Science',
    skills: ['pandas', 'SQL', 'modeling', 'data pipelines'],
    icon: Database,
  },
  {
    code: 'Data C140',
    name: 'Probability for Data Science',
    skills: ['probability', 'inference', 'distributions', 'statistical reasoning'],
    icon: Sigma,
  },
  {
    code: 'EECS C106A',
    name: 'Robotic Manipulation and Interaction',
    skills: ['robot kinematics', 'motion planning', 'control', 'robot perception'],
    icon: Bot,
  },
  {
    code: 'Math 54 / 53',
    name: 'Linear Algebra and Multivariable Calculus',
    skills: ['linear algebra', 'eigenvectors', 'gradients', 'multivariable optimization'],
    icon: Sigma,
  },
]

const Coursework = () => {
  return (
    <section id="coursework" className="py-32 px-6 bg-primary/35">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-6">
            Coursework
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
