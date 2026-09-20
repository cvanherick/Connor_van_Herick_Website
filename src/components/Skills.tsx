import { motion } from 'framer-motion'
import { Code2, Database, BrainCog, Layers, Lock, Zap, Terminal, Github } from 'lucide-react'

const skills = [
  { name: 'Python', evidence: 'PySpark pipelines, modeling, and data products', icon: Code2, category: 'Languages' },
  { name: 'Java', evidence: 'Data structures, software design, and applications', icon: Code2, category: 'Languages' },
  { name: 'Go', evidence: 'Backend and systems programming', icon: Code2, category: 'Languages' },
  { name: 'C', evidence: 'Low-level programming and machine structures', icon: Code2, category: 'Languages' },
  { name: 'SQL', evidence: '73M+ record decisioning workflows', icon: Database, category: 'Languages' },
  { name: 'RISC-V', evidence: 'CPU architecture and assembly-level systems', icon: Code2, category: 'Languages' },
  { name: 'Scheme', evidence: 'Interpreters, abstraction, and recursion', icon: Code2, category: 'Languages' },
  { name: 'x86', evidence: 'Computer architecture and low-level debugging', icon: Code2, category: 'Languages' },
  { name: 'Regex', evidence: 'Text processing and data cleaning', icon: Code2, category: 'Languages' },
  { name: 'TensorFlow / PyTorch', evidence: 'Deep learning and neural network training', icon: BrainCog, category: 'ML/Data' },
  { name: 'XGBoost', evidence: 'Uplift modeling and structured prediction', icon: BrainCog, category: 'ML/Data' },
  { name: 'LightGBM', evidence: 'Efficient gradient-boosted modeling', icon: BrainCog, category: 'ML/Data' },
  { name: 'Pandas', evidence: 'Data wrangling, analysis, and feature engineering', icon: Database, category: 'ML/Data' },
  { name: 'NumPy', evidence: 'Numerical computing and robotics workflows', icon: Layers, category: 'ML/Data' },
  { name: 'SHAP', evidence: 'Model explanations and feature attribution', icon: BrainCog, category: 'ML/Data' },
  { name: 'Scikit-learn', evidence: 'Classical ML, evaluation, and pipelines', icon: BrainCog, category: 'ML/Data' },
  { name: 'Matplotlib / Seaborn', evidence: 'Exploratory analysis and communication', icon: Database, category: 'ML/Data' },
  { name: 'Cryptography', evidence: 'Secure systems and threat-aware design', icon: Lock, category: 'Systems' },
  { name: 'CPU Architecture', evidence: 'RISC-V, memory, and machine structures', icon: Zap, category: 'Systems' },
  { name: 'System Design', evidence: 'Reliable services and maintainable architectures', icon: Layers, category: 'Systems' },
  { name: 'ROS 2', evidence: 'Robotics middleware, perception, and control', icon: Layers, category: 'Systems' },
  { name: 'Git', evidence: 'Version control and collaborative delivery', icon: Github, category: 'Tools' },
  { name: 'Databricks', evidence: 'Large-scale analytics and model workflows', icon: Terminal, category: 'Tools' },
  { name: 'PySpark', evidence: 'Distributed data processing and feature pipelines', icon: Terminal, category: 'Tools' },
  { name: 'Spark SQL', evidence: 'Distributed querying and transformation', icon: Database, category: 'Tools' },
  { name: 'Trino / Hive', evidence: 'Data lake querying and warehouse workflows', icon: Database, category: 'Tools' },
  { name: 'DataGrip', evidence: 'Database exploration and SQL development', icon: Terminal, category: 'Tools' },
  { name: 'Docker', evidence: 'Reproducible development and deployment', icon: Layers, category: 'Tools' },
  { name: 'Dash / Plotly', evidence: 'Interactive data products and dashboards', icon: Database, category: 'Tools' },
  { name: 'DuckDB', evidence: 'Local analytical workflows and prototyping', icon: Database, category: 'Tools' },
  { name: 'Jupyter', evidence: 'Research, experimentation, and communication', icon: Terminal, category: 'Tools' },
  { name: 'VS Code / IntelliJ', evidence: 'Daily development and debugging workflows', icon: Terminal, category: 'Tools' },
  { name: 'JUnit / Valgrind', evidence: 'Testing, profiling, and correctness checks', icon: Terminal, category: 'Tools' },
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
                <SkillBadge key={skill.name} skill={skill} index={index + 9} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-accent mb-8 text-center">Systems</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.filter(s => s.category === 'Systems').map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index + 17} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-accent mb-8 text-center">Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.filter(s => s.category === 'Tools').map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index + 21} />
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
