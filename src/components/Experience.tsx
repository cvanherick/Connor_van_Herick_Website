import { motion } from 'framer-motion'
import { BrainCog, BriefcaseBusiness, Users, Briefcase } from 'lucide-react'

const experiences = [
  {
    title: 'Machine Learning Engineer Intern',
    company: 'LendingClub — Collections Strategy',
    duration: 'Summer 2026',
    bullets: [
      'Contributing to machine learning engineering work on the Collections Strategy team',
      'Working at the intersection of predictive modeling, financial technology, and production decision systems',
      'Building practical experience with ML systems in a regulated, business-critical environment',
    ]
  },
  {
    title: 'Machine Learning Project Lead',
    company: "Arc'teryx — Data Science Society @ UC Berkeley",
    duration: 'Jan 2025 – May 2025',
    bullets: [
      'Led 9-person team building predictive ML models for retail labor allocation',
      'Supported 80+ North American stores with operational staffing insights',
      'Engineered 14 external-factor features; TensorFlow, XGBoost, SARIMAX, Prophet',
      'Cross-validation + hyperparameter tuning in Databricks',
    ]
  },
  {
    title: 'Data Science Consultant',
    company: 'Santa Clara County',
    duration: 'Aug 2024 – Dec 2024',
    bullets: [
      'Treatment outcome prediction on 46K+ patient records (AUC 0.85)',
      'LightGBM / Random Forests / Neural Networks',
      'SHAP model interpretability',
    ]
  },
  {
    title: 'Instructor & Team Lead',
    company: 'Cal Adventures',
    duration: '2022 – 2024',
    bullets: [
      'Leadership in high-pressure outdoor education environments',
      'Led teams of 20+ campers in wilderness settings',
      'Developed crisis management and team coordination skills',
    ]
  },
]

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6 bg-slate-950/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent mb-6">
            Experience
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Applied machine learning, data science, and technical leadership experience.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 relative">
          {/* Vertical timeline */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-slate-800 via-accent/50 to-slate-800 z-0"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`lg:col-span-6 mb-16 lg:mb-24 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:text-right'}`}
            >
              {/* Timeline dot */}
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-2xl mb-8 z-10 ${
                index === 0 ? 'bg-gradient-to-r from-accent to-blue-500 shadow-accent/30' :
                index === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/30' :
                'bg-gradient-to-r from-orange-500 to-amber-500 shadow-orange-500/30'
              }`}>
                {index === 0 && <BriefcaseBusiness size={32} className="text-white" />}
                {index === 1 && <BrainCog size={32} className="text-white" />}
                {index === 2 && <Users size={32} className="text-white" />}
                {index === 3 && <Briefcase size={32} className="text-white" />}
              </div>

              <div className={`card p-8 lg:p-10 shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-3 rounded-3xl backdrop-blur-xl border border-slate-800/50`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2 lg:mb-0">{exp.title}</h3>
                  <div className="flex items-center gap-4 text-slate-400 mt-2 lg:mt-0">
                    <span className="font-medium text-slate-200">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.duration}</span>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-300 leading-relaxed">
                  {exp.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
