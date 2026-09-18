import { motion } from 'framer-motion'
import { Code2, Database, BrainCog, Layers, Terminal, Github } from 'lucide-react'

const skills = [
  { name: 'Python', evidence: 'PySpark pipelines, modeling, and data products', icon: Code2, category: 'Languages' },
  { name: 'SQL', evidence: '73M+ record decisioning workflows', icon: Database, category: 'Languages' },
  { name: 'Java / C / Go', evidence: 'Graphs, systems, security, and low-level projects', icon: Code2, category: 'Languages' },
  { name: 'ML + Data', evidence: 'XGBoost, scikit-learn, TensorFlow/PyTorch, Databricks', icon: BrainCog, category: 'ML/Data' },
  { name: 'Distributed Data', evidence: 'PySpark, Spark SQL, and feature pipelines', icon: Terminal, category: 'ML/Data' },
  { name: 'Robotics', evidence: 'ROS 2, MoveIt 2, RealSense, and NumPy', icon: Layers, category: 'Systems' },
  { name: 'Systems', evidence: 'Cryptography, access control, RISC-V, and testing', icon: Layers, category: 'Systems' },
  { name: 'Tools', evidence: 'Docker, Git, JUnit, and Valgrind-ready workflows', icon: Github, category: 'Tools' },
]

const Skills = () => {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-32 px-6 bg-primary/35">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="section-heading mb-6">
            <span id="skills-title">Skills</span>
          </h2>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto">
            Technical foundation across ML, systems, and production tools
          </p>
        </motion.div>

        {/* Category groups */}
        <div className="space-y-16 mb-24">
          <div>
            <h3 className="text-2xl font-bold text-accent mb-8 text-center">Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.filter(s => s.category === 'Languages').map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-accent mb-8 text-center">ML / Data</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.filter(s => s.category === 'ML/Data').map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index + 6} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-accent mb-8 text-center">Systems</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.filter(s => s.category === 'Systems').map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index + 14} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-accent mb-8 text-center">Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.filter(s => s.category === 'Tools').map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index + 18} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface Skill {
  name: string
  evidence: string
  icon: any
  category: string
}

const SkillBadge = ({ skill, index }: { skill: Skill, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.03 }}
    className="group relative rounded-xl border border-cream/10 bg-surface/45 p-4 transition-colors duration-300 hover:border-accent/40 hover:bg-accent/5"
  >
    <skill.icon size={24} className="text-accent transition-transform duration-300 group-hover:scale-105" />
    <span className="mt-2 block text-sm font-semibold text-cream/80 transition-colors group-hover:text-accent">
      {skill.name}
    </span>
    <span className="mt-1 block text-xs leading-relaxed text-cream/60">{skill.evidence}</span>
  </motion.div>
)

export default Skills
