import { motion } from 'framer-motion'
import { BrainCog, Briefcase, BriefcaseBusiness, Users } from 'lucide-react'

export interface ExperienceItem {
  title: string
  company: string
  duration: string
  note?: string
  bullets: string[]
  logo?: string
  logoAlt?: string
  caseStudy?: string
}

export const experiences: ExperienceItem[] = [
  {
    title: 'Technical Advisor',
    company: 'UC Berkeley School of Law',
    duration: 'Sep 2026 – Present',
    logo: './assets/clean-slate-initiative.png',
    logoAlt: 'Clean Slate Initiative logo',
    bullets: [
      'Benchmark and optimize open-weight LLMs and role-based workflows for secure automation',
      'Design web-scraping and data pipelines with integrity checks for research infrastructure',
      'Formulate causal experiments to improve participant outreach, deliverability, engagement, and outcomes',
    ]
  },
  {
    title: 'Collections Strategy Intern',
    company: 'Happen Bank (formerly LendingClub)',
    duration: 'Jun 2026 – Aug 2026',
    logo: './assets/happen-bank.png',
    logoAlt: 'Happen Bank logo',
    caseStudy: './case-studies/happen-bank.html',
    bullets: [
      'Engineered PySpark and SQL decisioning pipelines in Databricks across 73M+ records',
      'Built XGBoost S/T-Learners with 40 borrower features and 24 interaction features under compliance and capacity constraints',
      'Reduced the holdout-evaluated charge-off rate by 2.04%; modeled results implied approximately $20.4M in gross value',
    ]
  },
  {
    title: 'Machine Learning Project Lead',
    company: "Arc'teryx — Data Science Society @ UC Berkeley",
    duration: 'Jan 2025 – May 2025',
    note: 'Confidential client project',
    logo: './assets/arcteryx-logo.png',
    logoAlt: "Arc'teryx logo",
    bullets: [
      'Led a 9-person team building daily predictive models for retail labor allocation across 80+ North American stores',
      'Engineered 14 external-factor features, including weather and promotions, through APIs',
      'Evaluated TensorFlow, XGBoost, SARIMAX, and Prophet models with cross-validation and hyperparameter tuning in Databricks',
    ]
  },
  {
    title: 'Data Science Consultant',
    company: 'Santa Clara County',
    duration: 'Aug 2024 – Dec 2024',
    note: 'Confidential client project',
    logo: './assets/santa-clara-county-seal.svg',
    logoAlt: 'Santa Clara County seal',
    bullets: [
      'Developed and tuned Random Forest, LightGBM, and neural network classifiers on 46K+ patient records',
      'Used 50 CANS mental health assessment features to predict treatment outcomes, achieving up to 0.85 AUC under the project validation setup',
      'Applied SHAP and permutation importance to identify five key clinical and demographic drivers',
    ]
  },
  {
    title: 'Instructor & Team Lead',
    company: 'Cal Adventures',
    duration: '2022 – 2024',
    logo: './assets/cal-adventures.png',
    logoAlt: 'Cal Adventures logo',
    bullets: [
      'Instructed campers in paddle boarding, kayaking, and rock climbing',
      'Supervised groups of up to 28 campers with one to three fellow counselors',
      'Shuttled campers to local points of interest and taught Bay Area ecology and history',
    ]
  },
  {
    title: 'Treasurer & Membership Officer',
    company: 'Cal Climbing',
    duration: '2025 – Present',
    logo: './assets/cal-climbing.png',
    logoAlt: 'California Climbing logo',
    bullets: [
      'Served as Membership Officer for the 2025-2026 school year',
      'Serve as Treasurer for the 2026-2027 school year',
      'Support club operations, member coordination, and student community building',
    ]
  },
  {
    title: 'Ride Operator',
    company: 'Tilden Park Carousel',
    duration: 'Jun 2022 – Aug 2023',
    bullets: [
      'Operated and maintained the 110-year-old historic carousel in Tilden Regional Park',
      'Supervised groups of up to 50 riders while maintaining a safe, welcoming environment',
      'Trained nine ride attendants on operating the machine',
    ]
  },
  {
    title: 'Member',
    company: 'Cal Hiking & Outdoor Society',
    duration: 'UC Berkeley',
    logo: './assets/cal-hiking.png',
    logoAlt: 'Cal Hiking and Outdoor Society logo',
    bullets: [
      'Participate in Berkeley’s hiking and outdoor community',
    ]
  },
  {
    title: 'Participant',
    company: 'Intramural Volleyball',
    duration: 'UC Berkeley',
    bullets: [
      'Played intramural volleyball as part of Berkeley campus recreation',
    ]
  },
]

interface ExperienceProps {
  archive?: boolean
}

const Experience = ({ archive = false }: ExperienceProps) => {
  const visibleExperiences = archive ? experiences : experiences.slice(0, 4)

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="section-heading mb-6">
            <span id="experience-title">{archive ? 'Experience' : 'Selected Experience'}</span>
          </h2>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto">Applied machine learning, data science, and technical leadership experience.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {visibleExperiences.map((exp, index) => (
            <motion.div key={exp.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.05 }} className="card group overflow-hidden rounded-3xl overflow-clip">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent h-44 rounded-t-3xl" />
              <div className="relative h-44 bg-gradient-to-br from-surface via-primary to-surface rounded-t-3xl overflow-hidden flex items-center justify-center">
                {exp.logo && (
                  <div className={`h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105 ${exp.company === 'Happen Bank (formerly LendingClub)' ? 'w-40 bg-surface p-3' : 'w-24'} ${exp.company === 'Cal Climbing' ? 'bg-black p-2' : exp.company === 'UC Berkeley School of Law' ? 'bg-white/95 p-2' : exp.company === 'Happen Bank (formerly LendingClub)' ? '' : 'bg-white/95 p-5'}`}>
                    <img src={exp.logo} alt={exp.logoAlt ?? `${exp.company} logo`} className="h-full w-full object-contain" />
                  </div>
                )}
                {!exp.logo && (
                  <div className="h-24 w-24 rounded-3xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-2xl">
                    {index === 0 && <BriefcaseBusiness size={44} />}
                    {index === 2 && <Users size={44} />}
                    {index === 3 && <Briefcase size={44} />}
                    {index === 4 && <Users size={44} />}
                    {index > 4 && <BriefcaseBusiness size={44} />}
                  </div>
                )}
              </div>

              <div className="p-8 relative z-10">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-accent font-semibold mb-3"><BrainCog size={18} /><span>{exp.duration}</span></div>
                  <h3 className="text-2xl font-bold text-cream mb-3 group-hover:text-accent transition-colors duration-300">{exp.caseStudy ? <a href={exp.caseStudy} className="focus-visible:rounded-sm">{exp.title}</a> : exp.title}</h3>
                  <p className="text-cream/70 font-medium leading-relaxed">{exp.company}</p>
                  {exp.note && <p className="mt-4 inline-flex rounded-xl border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">{exp.note}</p>}
                </div>
                {exp.caseStudy && <div className="mb-7 grid gap-2 sm:grid-cols-5">
                  {['73M+ records', 'Feature engineering', 'Uplift models', 'Constraints', 'Decision impact'].map((step, stepIndex) => <div key={step} className="relative rounded-xl border border-cream/10 bg-primary/45 px-3 py-3 text-center text-[11px] font-semibold text-cream/60"><span className="mb-1 block text-accent">0{stepIndex + 1}</span>{step}</div>)}
                </div>}
                <ul className="space-y-3 text-cream/70 leading-relaxed">
                  {exp.bullets.map((bullet, bIndex) => <li key={bIndex} className="flex items-start gap-3"><div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" /><span>{bullet}</span></li>)}
                </ul>
                {exp.caseStudy && <a href={exp.caseStudy} className="mt-7 inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 font-semibold text-accent transition-colors hover:bg-accent/20">Featured Work case study <span aria-hidden="true">→</span></a>}
              </div>
            </motion.div>
          ))}
        </div>

        {!archive && <div className="mt-12 text-center"><a href="./experience/" className="btn btn-secondary inline-flex">View More Experience <span aria-hidden="true">→</span></a></div>}
      </div>
    </section>
  )
}

export default Experience
