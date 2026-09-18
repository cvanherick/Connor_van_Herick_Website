import { motion } from 'framer-motion'
import { Bot, ExternalLink, Network, ScanSearch } from 'lucide-react'

const current = [
  { icon: ScanSearch, code: '01', title: 'CS 180 · Computer Vision', description: 'Image processing and computational photography work, with Project 1 documented online.', href: 'https://cvanherick.github.io/Connor_van_Herick_CS180/projects/project1/' },
  { icon: Bot, code: '02', title: 'Berkeley Law · Research Infrastructure', description: 'Agentic workflows, web-scraping pipelines, and integrity checks for the Clean Slate Initiative.' },
  { icon: Network, code: '03', title: 'Cadre · Multi-Agent Systems', description: 'Role-based AI collaboration, structured review, and human-led decision making.' },
]

const WhatImBuilding = () => (
  <section id="building" aria-labelledby="building-title" className="px-6 py-24">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="section-kicker">Live context</p><h2 id="building-title" className="section-heading mt-3">Currently</h2></div>
        <p className="max-w-md text-sm leading-relaxed text-cream/55">The work in progress matters as much as the shipped work. A compact view of what has my attention now.</p>
      </div>
      <div className="hairline">
        {current.map((item, index) => (
          <motion.div key={item.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="group grid gap-4 border-b border-cream/10 py-6 md:grid-cols-[4rem_1fr_auto] md:items-center">
            <span className="font-mono text-sm text-accent">{item.code}</span>
            <div className="flex items-start gap-4"><item.icon className="mt-1 text-accent" size={21} /><div><h3 className="text-lg font-semibold text-cream">{item.title}</h3><p className="mt-1 max-w-2xl text-sm leading-relaxed text-cream/55">{item.description}</p></div></div>
            {item.href && <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cream/55 transition-colors hover:text-accent">View work <ExternalLink size={15} /></a>}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default WhatImBuilding
