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
    caseStudy: './case-studies/happen-bank.html',
    bullets: [
      'Built a Databricks Next Best Action pipeline across 73M+ borrower rows using PySpark and SQL',
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
  const visibleExperiences = archive ? experiences : experiences.slice(0, mode === 'recruiter' ? 4 : 4)

  return (
    <section id="experience" aria-labelledby="experience-title" className="px-6 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 max-w-2xl">
          <h2 className="section-heading mb-6">
            <span id="experience-title">{archive ? 'Experience' : 'Selected Experience'}</span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cream/65">Applied machine learning, data science, and technical leadership experience.</p>
        </motion.div>

        <div className="border-t border-cream/10">
          {visibleExperiences.map((exp, index) => (
            <motion.article key={exp.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.05 }} className="group grid gap-6 border-b border-cream/10 py-8 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(16rem,.8fr)] md:gap-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/10 bg-surface/60 md:mt-1">
                {exp.logo && (
                  <img src={exp.logo} alt={exp.logoAlt ?? `${exp.company} logo`} loading="lazy" decoding="async" className={`h-8 w-8 object-contain ${exp.company === 'Happen Bank (formerly LendingClub)' ? 'w-10' : ''}`} />
                )}
                {!exp.logo && (
                  <>{index === 0 && <BriefcaseBusiness size={20} className="text-accent" />}{index === 2 && <Users size={20} className="text-accent" />}{index === 3 && <Briefcase size={20} className="text-accent" />}{index > 3 && <BriefcaseBusiness size={20} className="text-accent" />}</>
                )}
              </div>

              <div>
                <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-secondary"><BrainCog size={14} className="text-accent" /><span>{exp.duration}</span></p>
                <h3 className="text-xl font-semibold tracking-[-0.025em] text-cream transition-colors group-hover:text-accent">{exp.caseStudy ? <a href={exp.caseStudy} className="focus-visible:rounded-sm">{exp.title}</a> : exp.title}</h3>
                <p className="mt-2 font-medium text-cream/65">{exp.company}</p>
                {exp.note && <p className="mt-3 text-sm font-medium text-accent">{exp.note}</p>}
              </div>
              <div>
                <ul className="space-y-2.5 text-sm leading-relaxed text-cream/64">
                  {exp.bullets.map((bullet, bIndex) => <li key={bIndex} className="flex items-start gap-3"><div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" /><span>{bullet}</span></li>)}
                </ul>
                {(exp.caseStudy || exp.website) && <div className="mt-7 flex flex-wrap gap-3">
                  {exp.caseStudy && <a href={exp.caseStudy} className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-cream">Read the write-up <span aria-hidden="true">→</span></a>}
                  {exp.website && <a href={exp.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cream/60 transition-colors hover:text-accent">Cal Climbing website <span aria-hidden="true">↗</span></a>}
                </div>}
              </div>
            </motion.article>
          ))}
        </div>

        {!archive && <div className="mt-12 text-center"><a href="./experience/" className="btn btn-secondary inline-flex">View More Experience <span aria-hidden="true">→</span></a></div>}
      </div>
    </section>
  )
}

export default Experience
