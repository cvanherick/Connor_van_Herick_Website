import { motion } from 'framer-motion'
import { BrainCog, Briefcase, BriefcaseBusiness, Users } from 'lucide-react'

interface ExperienceItem {
  title: string
  company: string
  duration: string
  note?: string
  bullets: string[]
  logo?: string
  logoAlt?: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Machine Learning Engineer Intern',
    company: 'LendingClub — Collections Strategy',
    duration: 'Summer 2026',
    logo: './assets/lendingclub-logo.svg',
    logoAlt: 'LendingClub logo',
    bullets: [
      'Incoming Machine Learning Engineer Intern on the Collections Strategy team',
      'Working at the intersection of predictive modeling, financial technology, and production decision systems',
      'Focused on practical ML systems in a regulated, business-critical environment',
    ]
  },
  {
    title: 'Machine Learning Project Lead',
    company: "Arc'teryx — Data Science Society @ UC Berkeley",
    duration: 'Jan 2025 – May 2025',
    note: 'NDA project',
    logo: './assets/arcteryx-logo.png',
    logoAlt: 'Arc\'teryx logo',
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
    note: 'NDA project',
    logo: './assets/santa-clara-county-seal.svg',
    logoAlt: 'Santa Clara County seal',
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
  {
    title: 'Membership Officer & Incoming Treasurer',
    company: 'UC Berkeley Climbing Club',
    duration: '2025 – 2027',
    bullets: [
      'Served as Membership Officer for the 2025-2026 school year',
      'Incoming Treasurer for the 2026-2027 school year',
      'Supported club operations, member coordination, and student community building',
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

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group overflow-hidden rounded-3xl hover:shadow-2xl hover:shadow-accent/20 transition-all duration-700 hover:-translate-y-4 overflow-clip"
              whileHover={{ y: -16 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent h-44 rounded-t-3xl" />

              <div className="relative h-44 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-3xl overflow-hidden group-hover:from-accent/10 group-hover:to-blue-900/20 transition-all duration-700 flex items-center justify-center">
                {exp.logo && (
                  <div className="h-24 w-24 rounded-3xl bg-white/95 flex items-center justify-center p-5 shadow-2xl transition-all duration-500 group-hover:scale-110">
                    <img
                      src={exp.logo}
                      alt={exp.logoAlt ?? `${exp.company} logo`}
                      className={`h-full w-full object-contain ${exp.company.includes("Arc'teryx") ? 'invert-0' : ''}`}
                    />
                  </div>
                )}
                {!exp.logo && (
                  <div className="h-24 w-24 rounded-3xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-2xl transition-all duration-500 group-hover:scale-110">
                    {index === 2 && <Users size={44} />}
                    {index === 3 && <Briefcase size={44} />}
                    {index === 4 && <Users size={44} />}
                    {index > 4 && <BriefcaseBusiness size={44} />}
                  </div>
                )}
              </div>

              <div className="p-8 relative z-10">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-accent font-semibold mb-3">
                    <BrainCog size={18} />
                    <span>{exp.duration}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">{exp.title}</h3>
                  <p className="text-slate-300 font-medium leading-relaxed">{exp.company}</p>
                  {exp.note && (
                    <p className="mt-4 inline-flex rounded-xl border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                      {exp.note}
                    </p>
                  )}
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
