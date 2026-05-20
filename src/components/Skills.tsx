import { motion } from 'framer-motion'
import { Code2, Database, BrainCog, Layers, Lock, Zap, Terminal, Github } from 'lucide-react'

const skills = [
  // Languages
  { name: 'Python', icon: Code2, category: 'Languages' },
  { name: 'Java', icon: Code2, category: 'Languages' },
  { name: 'Go', icon: Code2, category: 'Languages' },
  { name: 'C', icon: Code2, category: 'Languages' },
  { name: 'SQL', icon: Database, category: 'Languages' },
  
  // ML/Data
  { name: 'TensorFlow', icon: BrainCog, category: 'ML/Data' },
  { name: 'XGBoost', icon: BrainCog, category: 'ML/Data' },
  { name: 'LightGBM', icon: BrainCog, category: 'ML/Data' },
  { name: 'Pandas', icon: Database, category: 'ML/Data' },
  { name: 'NumPy', icon: Layers, category: 'ML/Data' },
  { name: 'SHAP', icon: BrainCog, category: 'ML/Data' },
  
  // Systems
  { name: 'Cryptography', icon: Lock, category: 'Systems' },
  { name: 'CPU Arch', icon: Zap, category: 'Systems' },
  { name: 'System Design', icon: Layers, category: 'Systems' },
  { name: 'ROS 2', icon: Layers, category: 'Systems' },
  
  // Tools
  { name: 'Git', icon: Github, category: 'Tools' },
  { name: 'Databricks', icon: Terminal, category: 'Tools' },
  { name: 'Docker', icon: Layers, category: 'Tools' },
  { name: 'Dash / Plotly', icon: Database, category: 'Tools' },
  { name: 'DuckDB', icon: Database, category: 'Tools' },
]

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-primary/35">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-6">
            Skills
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
  icon: any
  category: string
}

const SkillBadge = ({ skill, index }: { skill: Skill, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.03 }}
    whileHover={{ scale: 1.15, y: -8, boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4)' }}
    className="group relative p-6 bg-gradient-to-br from-surface/70 to-primary/30 backdrop-blur-xl border border-cream/10 rounded-2xl hover:border-accent/50 hover:from-accent/10 hover:to-secondary/10 transition-all duration-500 cursor-pointer overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/10 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-2xl" />
    <skill.icon size={36} className="text-accent group-hover:scale-110 transition-transform duration-300 flex-shrink-0 relative z-10" />
    <span className="block font-semibold text-lg mt-3 text-cream relative z-10 group-hover:text-accent transition-colors">
      {skill.name}
    </span>
  </motion.div>
)

export default Skills
