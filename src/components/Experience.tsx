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
  website?: string
  caseStudySteps?: string[]
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
    logoAlt: 'Happen Bank white mark on an orange background',
    bullets: [
      'Built a Databricks Next Best Action pipeline across 55.6M borrower rows using PySpark and SQL',
      'Trained a weighted tree-based treatment-effect model with compliance, eligibility, and operational capacity guardrails',
      'Modeled a 2.04% charge-off reduction and approximately $20.35M in annualized value, with randomized live validation identified as the next step',
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
      'Led a 9-person team on retail traffic forecasting across 80+ North American stores',
      'Prepared hourly sales and foot-traffic data with time-zone, holiday, and location features',
      'Compared interpretable, tree-based, neural, and time-series approaches; the best reported MAE was 8.27',
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
      'Built episode-level classifiers from 46,269 de-identified mental health assessment episodes',
      'Compared tree-based and neural-network approaches; LightGBM reached a reported 0.8425 test AUC',
      'Used model interpretation and subgroup analysis to understand which patterns were associated with outcomes',
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
    caseStudy: './case-studies/cal-climbing.html',
    website: 'https://climbing.studentorg.berkeley.edu/',
    bullets: [
      'Served as Membership Officer for the 2025-2026 school year',
      'Serve as Treasurer for the 2026-2027 school year',
      'Support membership, club operations, outdoor trips, and student community building',
    ]
  },
  {
    title: 'Ride Operator',
    company: 'Tilden Park Carousel',
    duration: 'Jun 2022 – Aug 2023',
    logo: './assets/cal-hiking.png',
    logoAlt: 'Tilden Park Carousel image',
    bullets: [
      'Operated and maintained the 110-year-old historic carousel in Tilden Regional Park',
      'Supervised groups of up to 50 riders while maintaining a safe, welcoming environment',
      'Trained nine ride attendants on operating the machine',
    ]
  },
]

interface ExperienceProps {
  archive?: boolean
  mode?: 'explore' | 'recruiter'
}

const Experience = ({ archive = false, mode = 'explore' }: ExperienceProps) => {
  const selectedExperiences = mode === 'recruiter' ? experiences.filter(exp => exp.company !== 'Santa Clara County') : experiences
  const visibleExperiences = archive ? experiences : selectedExperiences.slice(0, mode === 'recruiter' ? 3 : 4)

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="section-heading mb-6">
            <span id="experience-title">{archive ? 'Experience' : 'Selected Experience'}</span>
          </h2>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto">Applied machine learning, data science, and technical leadership experience.</p>
        </motion.div>

        {!archive && <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Selected focus areas">
          {[
            ['55.6M', 'rows modeled'],
            ['80+', 'stores studied'],
            ['46K+', 'episodes analyzed'],
            ['9-person', 'team led'],
          ].map(([value, label]) => <div key={label} className="rounded-2xl border border-accent/20 bg-accent/5 px-5 py-4 text-center"><strong className="block text-2xl font-bold text-accent">{value}</strong><span className="text-sm font-semibold text-cream/60">{label}</span></div>)}
        </div>}

        <div className="grid md:grid-cols-2 gap-8">
          {visibleExperiences.map((exp, index) => (
            <motion.div key={exp.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.05 }} className="card group overflow-hidden rounded-3xl overflow-clip">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent h-44 rounded-t-3xl" />
              <div className="relative h-44 bg-gradient-to-br from-surface via-primary to-surface rounded-t-3xl overflow-hidden flex items-center justify-center">
                {exp.logo && (
                  <div className={`h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105 ${exp.company === 'Happen Bank (formerly LendingClub)' ? 'w-40 bg-surface p-3' : 'w-24'} ${exp.company === 'Cal Climbing' ? 'bg-black p-2' : exp.company === 'UC Berkeley School of Law' ? 'bg-white/95 p-2' : exp.company === 'Happen Bank (formerly LendingClub)' ? '' : 'bg-white/95 p-5'}`}>
                    <img src={exp.logo} alt={exp.logoAlt ?? `${exp.company} logo`} loading="lazy" decoding="async" className="h-full w-full object-contain" />
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
                  {(exp.caseStudySteps ?? ['Community', 'Operations', 'Trips', 'Leadership', 'Impact']).map((step, stepIndex) => <div key={step} className="relative rounded-xl border border-cream/10 bg-primary/45 px-3 py-3 text-center text-[11px] font-semibold text-cream/60"><span className="mb-1 block text-accent">0{stepIndex + 1}</span>{step}</div>)}
                </div>}
                <ul className="space-y-3 text-cream/70 leading-relaxed">
                  {exp.bullets.map((bullet, bIndex) => <li key={bIndex} className="flex items-start gap-3"><div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" /><span>{bullet}</span></li>)}
                </ul>
                {(exp.caseStudy || exp.website) && <div className="mt-7 flex flex-wrap gap-3">
                  {exp.caseStudy && <a href={exp.caseStudy} className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 font-semibold text-accent transition-colors hover:bg-accent/20">Read the write-up <span aria-hidden="true">→</span></a>}
                  {exp.website && <a href={exp.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-cream/15 px-4 py-3 font-semibold text-cream/70 transition-colors hover:border-accent/40 hover:text-accent">Cal Climbing website <span aria-hidden="true">↗</span></a>}
                </div>}
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
