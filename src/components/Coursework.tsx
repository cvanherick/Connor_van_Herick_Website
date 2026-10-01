import { motion } from 'framer-motion'
import { Binary, Bot, BrainCog, Database, Eye, LockKeyhole, Network, Sigma } from 'lucide-react'

export const courses = [
  { code: 'DATA C8', name: 'Foundations of Data Science', skills: ['Python', 'data analysis', 'statistics'], icon: Database, status: 'Completed' },
  { code: 'MATH 1B', name: 'Calculus', skills: ['calculus', 'integration', 'series'], icon: Sigma, status: 'Completed' },
  { code: 'CS 61A', name: 'Structure and Interpretation of Computer Programs', skills: ['Python', 'abstraction', 'recursion', 'interpreters'], icon: Binary, status: 'Completed' },
  { code: 'CS 61B', name: 'Data Structures', skills: ['Java', 'data structures', 'testing', 'software design'], icon: Network, status: 'Completed' },
  { code: 'CS 61C', name: 'Machine Structures', skills: ['C', 'RISC-V', 'memory', 'computer architecture'], icon: Binary, status: 'Completed' },
  { code: 'MATH 53', name: 'Multivariable Calculus', skills: ['multivariable calculus', 'gradients', 'optimization'], icon: Sigma, status: 'Completed' },
  { code: 'DATA C100', name: 'Principles & Techniques of Data Science', skills: ['pandas', 'SQL', 'modeling', 'data pipelines'], icon: Database, status: 'Completed' },
  { code: 'MATH 54', name: 'Linear Algebra and Differential Equations', skills: ['linear algebra', 'eigenvectors', 'differential equations'], icon: Sigma, status: 'Completed' },
  { code: 'COMPSCI 70', name: 'Discrete Mathematics and Probability Theory', skills: ['discrete math', 'probability', 'proofs'], icon: Sigma, status: 'Completed' },
  { code: 'DATA C140', name: 'Probability for Data Science', skills: ['probability', 'inference', 'distributions', 'statistical reasoning'], icon: Sigma, status: 'Completed' },
  { code: 'CS 161', name: 'Computer Security', skills: ['cryptography', 'threat modeling', 'access control', 'secure systems'], icon: LockKeyhole, status: 'Completed' },
  { code: 'CS 170', name: 'Efficient Algorithms', skills: ['algorithm design', 'graphs', 'dynamic programming', 'optimization'], icon: Network, status: 'Completed' },
  { code: 'CS 189', name: 'Machine Learning', skills: ['supervised learning', 'model evaluation', 'optimization', 'probability'], icon: BrainCog, status: 'Completed' },
  { code: 'CS C182', name: 'Deep Neural Networks', skills: ['deep learning', 'backpropagation', 'neural architectures', 'training dynamics'], icon: BrainCog, status: 'In progress' },
  { code: 'CS 180', name: 'Computer Vision', skills: ['image processing', 'feature matching', 'geometry', 'computational photography'], icon: Eye, status: 'In progress' },
  { code: 'EECS C106A', name: 'Introduction to Robotics', skills: ['robot kinematics', 'motion planning', 'control', 'robot perception'], icon: Bot, status: 'Completed' },
  { code: 'EECS C183', name: 'Natural Language Processing', skills: ['language models', 'text representations', 'NLP'], icon: BrainCog, status: 'In progress' },
]

interface CourseworkProps { archive?: boolean }

const Coursework = ({ archive = false }: CourseworkProps) => {
  const selectedCodes = ['CS 189', 'CS C182', 'CS 180', 'CS 170', 'CS 161', 'EECS C106A']
  const visibleCourses = archive ? courses : courses.filter((course) => selectedCodes.includes(course.code))

  return (
    <section id="coursework" aria-labelledby="coursework-title" className="px-6 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 max-w-2xl">
          <h2 className="section-heading mb-6"><span id="coursework-title">{archive ? 'Coursework Archive' : 'Selected Coursework'}</span></h2>
          <p className="max-w-xl text-lg leading-relaxed text-cream/65">{archive ? 'Transcript-derived coursework across computer science, data science, mathematics, and robotics.' : 'Selected ML, systems, robotics, and data science courses.'}</p>
        </motion.div>
        <div className="grid border-t border-cream/10 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course, index) => (
            <motion.article key={course.code} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: Math.min(index, 5) * 0.04 }} className="border-b border-cream/10 p-5 transition-colors hover:bg-surface/30 md:border-r md:last:border-r-0">
              <div className="flex items-start gap-3">
                <course.icon size={18} className="mt-0.5 shrink-0 text-accent" />
                <div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">{course.code} <span className="ml-2 text-cream/35">{course.status}</span></p><h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em] text-cream">{course.name}</h3></div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-cream/55">{course.skills.join(' · ')}</p>
            </motion.article>
          ))}
        </div>
        {!archive && <div className="mt-10 text-center"><a href="./coursework/" className="btn btn-secondary inline-flex">View More Coursework <span aria-hidden="true">→</span></a></div>}
      </div>
    </section>
  )
}

export default Coursework
