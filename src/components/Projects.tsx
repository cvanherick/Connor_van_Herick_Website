import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { Project } from '../types'

const projects: Project[] = [
  {
    title: 'Secure File Sharing System',
    description: 'Built secure encrypted file storage and sharing system with invitation-based access and hierarchical revocation.',
    tech: ['Go', 'Cryptography', 'System Design', 'Access Control'],
    impact: '50+ adversarial tests passed • Production-ready security',
    github: 'https://github.com/secure-file-system',
  },
  {
    title: 'Retail ML Forecasting Dashboard',
    description: 'Predictive staffing forecasts for 80+ stores using advanced ensemble models.',
    tech: ['Python', 'TensorFlow', 'XGBoost', 'Databricks'],
    impact: 'Deployed across Arc\'teryx retail chain • Operational impact',
    github: 'https://github.com/retail-forecasting',
  },
  {
    title: 'Procedural Tile World + Enemy AI',
    description: 'Procedural world generation with seeded maps and DFS pathfinding enemy AI.',
    tech: ['Java', 'DFS', 'OOP'],
    impact: 'Complete game engine • Scalable AI architecture',
    github: 'https://github.com/tile-world-engine',
  },
  {
    title: 'RISC-V CPU Design',
    description: 'Pipelined 32-register CPU with forwarding, hazard detection and full ISA implementation.',
    tech: ['C', 'Verilog', 'Logisim'],
    impact: 'Functional 5-stage pipeline • Verified design',
    github: 'https://github.com/riscv-cpu',
  },
  {
    title: 'Scheme Interpreter',
    description: 'Full Scheme interpreter with tail recursion, closures, and special forms support.',
    tech: ['Python', 'Language Design', 'Parsing'],
    impact: 'Complete Scheme subset • Educational tool',
    github: 'https://github.com/scheme-interpreter',
  },
]

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent mb-6">
            Projects
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Technical depth through production-grade systems and ML projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group overflow-hidden rounded-3xl hover:shadow-2xl hover:shadow-accent/20 transition-all duration-700 hover:-translate-y-4 overflow-clip"
              whileHover={{ y: -20 }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent h-48 rounded-t-3xl" />
              
              <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-3xl overflow-hidden group-hover:from-accent/10 group-hover:to-blue-900/20 transition-all duration-700" />
              
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{project.description}</p>
                
                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, tIndex) => (
                    <span key={tIndex} className="px-4 py-2 bg-slate-900/60 backdrop-blur-sm rounded-2xl text-sm font-medium border border-slate-700/50 hover:bg-slate-800/50 transition-all group-hover:border-accent/50">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Impact */}
                <p className="font-semibold text-accent text-xl mb-6 bg-accent/5 px-4 py-2 rounded-xl">
                  {project.impact}
                </p>
                
                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener" className="flex items-center gap-2 p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-accent transition-all group-hover:scale-105 flex-1 justify-center">
                      <Github size={20} />
                      Code
                    </a>
                  )}
                  <a href="#" className="flex items-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-accent to-blue-500 hover:from-blue-500 hover:to-accent text-white font-medium shadow-lg hover:shadow-accent/30 transition-all group-hover:scale-105 flex-1 justify-center">
                    <ExternalLink size={20} />
                    Live
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
