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
  const selectedCodes = ['CS 189', 'CS C182', 'CS 180', 'EECS C106A', 'EECS C183']
  const visibleCourses = archive ? courses : courses.filter((course) => selectedCodes.includes(course.code))

  return (
    <section id="coursework" aria-labelledby="coursework-title" className="py-28 px-6 bg-primary/35">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-6"><span id="coursework-title">{archive ? 'Coursework Archive' : 'Selected Coursework'}</span></h2>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto">{archive ? 'Transcript-derived coursework across computer science, data science, mathematics, and robotics.' : 'Selected ML, computer vision, robotics, and NLP courses.'}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleCourses.map((course, index) => (
            <motion.div key={course.code} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.04 }} className="card p-6 group">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/15 border border-cream/10 flex items-center justify-center text-accent flex-shrink-0"><course.icon size={24} /></div>
                <div><p className="text-sm font-bold uppercase tracking-wide text-secondary">{course.code}</p><h3 className="mt-1 text-xl font-bold text-cream leading-snug">{course.name}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-wider text-cream/45">{course.status}</p></div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">{course.skills.map((skill) => <span key={skill} className="rounded-xl border border-cream/10 bg-cream/5 px-3 py-2 text-sm font-medium text-cream/70">{skill}</span>)}</div>
            </motion.div>
          ))}
        </div>
        {!archive && <div className="mt-10 text-center"><a href="./coursework/" className="btn btn-secondary inline-flex">View Full Coursework <span aria-hidden="true">→</span></a></div>}
      </div>
    </section>
  )
}

export default Coursework
