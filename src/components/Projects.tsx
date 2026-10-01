import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, LockKeyhole, Play } from 'lucide-react'
import { Project } from '../types'
import CadreSimulation from './CadreSimulation'
import ProjectArtwork from './ProjectArtwork'

export const projects: Project[] = [
  {
    title: 'Vision-Guided Robotic Game Player',
    description: 'Built a ROS 2 autonomy stack that lets a UR7e robot arm perceive, plan, and place physical game pieces.',
    tech: ['Python', 'ROS 2', 'MoveIt 2', 'RealSense', 'NumPy'],
    impact: 'End-to-end hardware pipeline • Perception, planning, control',
    course: 'EECS C106A · Spring 2026',
    courseUrl: 'https://www2.eecs.berkeley.edu/Courses/EECSC106A/',
    demo: 'https://sites.google.com/berkeley.edu/blokushumanvsrobot/results',
  },
  {
    title: 'Cadre Agent Team Framework',
    description: 'Designed a role-based AI team framework with explicit orchestration, review checkpoints, attribution, and human decision control.',
    tech: ['AI Systems', 'Multi-Agent Workflows', 'Evaluation', 'Human-in-the-Loop'],
    impact: 'Inspectable collaboration • Review gates, attribution, and operator control',
    demo: './case-studies/cadre.html',
  },
  {
    title: 'CS 180 Color Reconstruction',
    description: 'Reconstructed color photographs from stacked Prokudin-Gorskii glass plates by aligning RGB channels with a coarse-to-fine image pyramid.',
    tech: ['Python', 'Computer Vision', 'Image Pyramids', 'Normalized Cross-Correlation'],
    impact: 'Project 1 • Raw-pixel and edge-based alignment, with an interactive demo',
    course: 'CS 180 · Fall 2026',
    courseUrl: 'https://www2.eecs.berkeley.edu/Courses/CS180/',
    demo: 'https://cvanherick.github.io/Connor_van_Herick_CS180/projects/project1/',
  },
  {
    title: 'Ngordnet Language Explorer',
    description: 'Built a Java web app for exploring historical word usage and WordNet hyponym relationships using graphs, time series, and query handlers.',
    tech: ['Java', 'Graphs', 'Time Series', 'Web Handlers', 'JUnit'],
    impact: 'CS61B project • NGram + WordNet query engine',
    demo: './case-studies/ngordnet.html',
    accessNote: 'Code private for academic integrity; shareable on request where appropriate.',
    course: 'CS 61B · Fall 2024',
    courseUrl: 'https://fa24.datastructur.es/projects/proj2b/',
  },
  {
    title: 'Build Your Own World',
    description: 'Created a tile-based Java game with procedural world generation, movement, line-of-sight behavior, enemies, and save/load support.',
    tech: ['Java', 'Procedural Generation', 'Game Systems', 'OOP', 'Testing'],
    impact: 'CS61B project • Java game code available to run locally',
    demo: './case-studies/byow.html',
    accessNote: 'Original Java code can be shared directly; recruiter run guide included.',
    course: 'CS 61B · Fall 2024',
    courseUrl: 'https://fa24.datastructur.es/projects/proj3/',
  },
  {
    title: 'Snek Game Engine',
    description: 'Implemented a C version of Snake with board parsing, state updates, snake growth, collision handling, and file-based integration tests.',
    tech: ['C', 'Memory Management', 'Game State', 'Testing'],
    impact: '21 integration boards • Unit tests + Valgrind-ready memory checks',
    demo: './case-studies/snek.html',
    accessNote: 'Code private for academic integrity; shareable on request where appropriate.',
    course: 'CS 61C · Fall 2025',
    courseUrl: 'https://www-inst.eecs.berkeley.edu/~cs61c/fa25/',
  },
  {
    title: 'CS61Classify',
    description: 'Built RISC-V assembly routines for a small neural-network classifier, including matrix operations, activation functions, file I/O, and inference orchestration.',
    tech: ['RISC-V Assembly', 'Neural Networks', 'Matrix Math', 'Venus'],
    impact: 'Assembly ML pipeline • Unit and coverage tests',
    demo: './case-studies/cs61classify.html',
    accessNote: 'Code private for academic integrity; shareable on request where appropriate.',
    course: 'CS 61C · Fall 2025',
    courseUrl: 'https://www-inst.eecs.berkeley.edu/~cs61c/fa25/',
  },
  {
    title: 'Secure File Sharing System',
    description: 'Built a secure Go system for authenticated users, encrypted file storage, append operations, invitation-based sharing, and hierarchical access revocation.',
    tech: ['Go', 'Cryptography', 'System Design', 'Access Control', 'Testing'],
    impact: 'Adversarial testing • Tamper detection + recursive revocation',
    course: 'CS 161 · Spring 2026',
    courseUrl: 'https://sp26.cs161.org/proj2/',
  },
  {
    title: 'Performance Attribution Dashboard',
    description: 'Created an interactive portfolio analytics app for Brinson-Fachler attribution using uploaded portfolio snapshots.',
    tech: ['Python', 'Dash', 'Plotly', 'Pandas', 'DuckDB'],
    impact: 'Single-page analytics tool • Local data processing + visualizations',
  },
  {
    title: 'RISC-V CPU Design',
    description: 'Built a RISC-V CPU in Logisim Evolution with a register file, ALU, instruction decode, memory access, and branch control.',
    tech: ['Logisim Evolution', 'RISC-V', 'Digital Logic', 'Assembly Testing'],
    impact: 'Pipelined datapath • Verified against Venus traces and custom assembly tests',
    course: 'CS 61C · Fall 2025',
    courseUrl: 'https://www-inst.eecs.berkeley.edu/~cs61c/fa25/',
    demo: './case-studies/riscv-cpu.html',
    accessNote: 'Code private for academic integrity; shareable on request where appropriate.',
  },
  {
    title: 'Scheme Interpreter',
    description: 'Implemented an interpreter for a Scheme-like language with evaluation, environments, special forms, procedures, and macro support.',
    tech: ['Python', 'Interpreters', 'Functional Programming', 'Recursion'],
    impact: 'Language runtime • Environments, evaluation, and macros',
    course: 'CS 61A · Spring 2024',
    courseUrl: 'https://www-inst.eecs.berkeley.edu/~cs61a/sp24/proj/scheme/',
    accessNote: 'Coursework project; code private for academic integrity.',
  },
  {
    title: '2048 Game',
    description: 'Implemented the Java game logic for 2048—tilts, merges, scoring, and end-state detection—within the course-provided interface.',
    tech: ['Java', 'Object-Oriented Design', 'Testing', 'Game Logic'],
    impact: 'Foundational Java project • Deterministic state transitions',
    course: 'CS 61B · Fall 2024',
    courseUrl: 'https://fa24.datastructur.es/projects/proj0/',
    accessNote: 'Coursework project; code private for academic integrity.',
  },
  {
    title: 'Cook County Housing Price Analysis',
    description: 'Built a Python housing-price analysis pipeline and examined fairness questions connected to historical racial discrimination in property valuation.',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Jupyter', 'Fairness Analysis'],
    impact: 'Data cleaning, feature selection, and model evaluation • RMSE-driven analysis',
    accessNote: 'Earlier academic project; notebook available on request.',
  },
]

const relevanceOrder = [
  'Cadre Agent Team Framework',
  'Vision-Guided Robotic Game Player',
  'Secure File Sharing System',
  'CS 180 Color Reconstruction',
  'RISC-V CPU Design',
  'CS61Classify',
  'Performance Attribution Dashboard',
  'Scheme Interpreter',
  'Ngordnet Language Explorer',
  'Build Your Own World',
  'Snek Game Engine',
  '2048 Game',
  'Cook County Housing Price Analysis',
]

const sortedProjects = [...projects].sort((a, b) => relevanceOrder.indexOf(a.title) - relevanceOrder.indexOf(b.title))
const featuredProjects = sortedProjects.slice(0, 3)
const categoryOptions = ['All', 'ML/AI', 'Systems', 'Robotics/CV', 'Data', 'Coursework']
const projectCategory = (title: string) => {
  if (title.includes('Robotic') || title.includes('CS 180')) return 'Robotics/CV'
  if (title.includes('Secure') || title.includes('RISC-V') || title.includes('Snek') || title.includes('Ngordnet') || title.includes('World') || title.includes('2048')) return 'Systems'
  if (title.includes('Classify') || title.includes('Cadre')) return 'ML/AI'
  if (title.includes('Attribution') || title.includes('Cook County')) return 'Data'
  return 'Coursework'
}

interface ProjectsProps {
  archive?: boolean
}

const Projects = ({ archive = false }: ProjectsProps) => {
  const [category, setCategory] = useState('All')
  const [cadreSimulationOpen, setCadreSimulationOpen] = useState(false)
  const visibleProjects = (archive ? sortedProjects : featuredProjects).filter((project) => category === 'All' || projectCategory(project.title) === category)

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-6 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="section-heading mb-6">
            <span id="projects-title">Projects</span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cream/65">
            {archive ? 'A complete record of coursework, systems, ML, robotics, and data projects.' : 'Selected work across machine learning, computer vision, robotics, systems, and data products.'}
          </p>
        </motion.div>

        {archive && <div className="mb-10 flex flex-wrap justify-center gap-3" aria-label="Filter projects by category">
          {categoryOptions.map((option) => <button key={option} type="button" aria-pressed={category === option} onClick={() => setCategory(option)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === option ? 'border-accent bg-accent/15 text-accent' : 'border-cream/10 bg-cream/5 text-cream/65 hover:border-accent/40 hover:text-cream'}`}>{option}</button>)}
        </div>}
        {archive && <p className="mb-8 text-center text-sm text-cream/60" aria-live="polite">Showing {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}{category !== 'All' ? ` in ${category}` : ''}.</p>}

        <div className="grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            (() => {
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.05 }}
                  className={`group overflow-hidden rounded-2xl border border-cream/10 bg-surface/65 transition-colors hover:border-accent/35 ${index === 0 ? 'md:col-span-2' : ''}`}
                >
                  <ProjectArtwork title={project.title} />

                  <div className="relative z-10 p-6 md:p-7">
                    {project.course && <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">{project.courseUrl ? <a href={project.courseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-secondary/30 underline-offset-4 hover:decoration-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" aria-label={`${project.course} course or assignment page (opens in a new tab)`}>{project.course} ↗</a> : project.course}</p>}
                    <h3 className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-cream transition-colors duration-200 group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mb-6 leading-relaxed text-cream/68">{project.description}</p>

                    {/* Tech badges */}
                    <div className="mb-6 flex flex-wrap gap-x-3 gap-y-2 text-sm text-cream/55">
                      {project.tech.map((tech, tIndex) => (
                        <span key={tIndex}>{tech}{tIndex < project.tech.length - 1 && <span className="ml-3 text-cream/25">/</span>}</span>
                      ))}
                    </div>

                    {/* Impact */}
                    <p className="mb-6 border-l-2 border-accent/45 pl-3 text-sm font-semibold leading-relaxed text-cream/82">
                      {project.impact}
                    </p>

                    {project.accessNote && (
                      <p className="mb-6 flex items-start gap-2 border-l-2 border-secondary/60 pl-3 text-sm leading-relaxed text-cream/65">
                        <LockKeyhole size={16} className="mt-0.5 flex-shrink-0 text-secondary" />
                        {project.accessNote}
                      </p>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 pt-1">
                      {project.title === 'Cadre Agent Team Framework' && <button type="button" onClick={() => { const next = !cadreSimulationOpen; setCadreSimulationOpen(next); if (next) window.setTimeout(() => document.getElementById('cadre-simulation')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }), 100) }} aria-expanded={cadreSimulationOpen} aria-controls="cadre-simulation" className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-cream">
                        <Play size={16} /> {cadreSimulationOpen ? 'Hide simulation' : 'Run simulation'}
                      </button>}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-cream/65 transition-colors hover:text-accent">
                          <Github size={16} />
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cream/65 transition-colors hover:text-accent">
                          <ExternalLink size={16} />
                          {project.demo.startsWith('./case-studies') ? 'Case Study' : 'View Project'}
                        </a>
                      )}
                      {!project.github && !project.demo && (
                          <span className="inline-flex items-center gap-2 text-sm text-cream/50">
                            <Github size={16} />
                          Private project · summary available
                        </span>
                      )}
                    </div>
                    {project.title === 'Cadre Agent Team Framework' && <CadreSimulation open={cadreSimulationOpen} autoStart={cadreSimulationOpen} onClose={() => setCadreSimulationOpen(false)} />}
                  </div>
                </motion.div>
              )
            })()
          ))}
        </div>
        {!archive && <div className="mt-12 text-center"><a href="./projects/" className="btn btn-secondary inline-flex">View All Projects <span aria-hidden="true">→</span></a></div>}
      </div>
    </section>
  )
}

export default Projects
