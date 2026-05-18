import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Project } from '../types'

const projects: Project[] = [
  {
    title: 'Retail ML Forecasting Dashboard',
    description: 'Led development of predictive staffing forecasts using retail traffic, sales, seasonality, and external-factor features.',
    tech: ['Python', 'TensorFlow', 'XGBoost', 'Databricks', 'SARIMAX'],
    impact: 'Forecasting for 80+ Arc\'teryx stores • 9-person ML team lead',
    logo: './assets/arcteryx-logo.png',
    logoAlt: 'Arc\'teryx logo',
  },
  {
    title: 'Treatment Outcome Prediction',
    description: 'Modeled behavioral health treatment outcomes from county patient records using ensemble methods and interpretable ML.',
    tech: ['Python', 'LightGBM', 'Random Forests', 'Neural Networks', 'SHAP'],
    impact: '46K+ patient records • AUC 0.85',
  },
  {
    title: 'Vision-Guided Robotic Game Player',
    description: 'Built a ROS 2 autonomy stack that lets a UR7e robot arm perceive, plan, and place physical game pieces.',
    tech: ['Python', 'ROS 2', 'MoveIt 2', 'RealSense', 'NumPy'],
    impact: 'End-to-end hardware pipeline • Perception, planning, control',
    demo: 'https://sites.google.com/berkeley.edu/blokushumanvsrobot/intro?authuser=0',
  },
  {
    title: 'Secure File Sharing System',
    description: 'Built encrypted file storage and sharing with invitation-based access, secure user state, and hierarchical revocation.',
    tech: ['Go', 'Cryptography', 'System Design', 'Access Control'],
    impact: '50+ adversarial tests passed • Security-focused systems design',
  },
  {
    title: 'Performance Attribution Dashboard',
    description: 'Created an interactive portfolio analytics app for Brinson-Fachler attribution using uploaded portfolio snapshots.',
    tech: ['Python', 'Dash', 'Plotly', 'Pandas', 'DuckDB'],
    impact: 'Single-page analytics tool • Local data processing + visualizations',
  },
  {
    title: 'RISC-V CPU Design',
    description: 'Designed a RISC-V CPU datapath with ALU, register file, memory, immediate generation, and control logic.',
    tech: ['Logisim', 'RISC-V', 'Digital Logic', 'C'],
    impact: 'Functional CPU components • Unit and integration test coverage',
    demo: './case-studies/riscv-cpu.html',
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
            Selected work across machine learning, robotics, systems, and data products.
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
              
              <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-3xl overflow-hidden group-hover:from-accent/10 group-hover:to-blue-900/20 transition-all duration-700 flex items-center justify-center">
                {project.logo && (
                  <img
                    src={project.logo}
                    alt={project.logoAlt ?? `${project.title} logo`}
                    className="h-24 w-24 object-contain invert opacity-80 drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                  />
                )}
              </div>
              
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
                
                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener" className="flex items-center gap-2 p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-accent transition-all group-hover:scale-105 flex-1 justify-center">
                      <Github size={20} />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener" className="flex items-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-accent to-blue-500 hover:from-blue-500 hover:to-accent text-white font-medium shadow-lg hover:shadow-accent/30 transition-all group-hover:scale-105 flex-1 justify-center">
                      <ExternalLink size={20} />
                      Project Site
                    </a>
                  )}
                  {!project.github && !project.demo && (
                    <span className="flex items-center gap-2 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50 text-slate-400 flex-1 justify-center">
                      <Github size={20} />
                      Repo cleanup in progress
                    </span>
                  )}
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
