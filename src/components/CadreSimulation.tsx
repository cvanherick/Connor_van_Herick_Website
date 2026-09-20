import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Check,
  CircleDot,
  ClipboardCheck,
  GitBranch,
  Layers,
  PackageCheck,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

export interface CadreSimulationResult {
  artifactCount: number
  checkpointCount: number
  completedAt: number
}

export interface CadreSimulationProps {
  open?: boolean
  className?: string
  autoStart?: boolean
  onComplete?: (result: CadreSimulationResult) => void
  onClose?: () => void
}

type SimulationStatus = 'idle' | 'running' | 'complete'

type CadreStage = {
  id: string
  number: string
  name: string
  purpose: string
  artifact: string
  agents: string[]
  gate: string
  tone: string
}

// Mirrors Cadre's product-development workflow: sequential gates, parallel
// specialists inside each stage, and an explicit human-readable artifact handoff.
const stages: CadreStage[] = [
  {
    id: 'discovery',
    number: '01',
    name: 'Discovery',
    purpose: 'Frame the opportunity and user context',
    artifact: 'Problem frame',
    agents: ['Product Owner', 'Market Research', 'User Research', 'Enterprise Customer', 'Indie Developer', 'UX Designer'],
    gate: 'Shared opportunity brief',
    tone: 'border-sky-400/40 bg-sky-400/10 text-sky-300',
  },
  {
    id: 'requirements',
    number: '02',
    name: 'Requirements',
    purpose: 'Turn the brief into testable acceptance criteria',
    artifact: 'Ready specification',
    agents: ['Product Owner', 'Technical Writer', 'User Research', 'QA Engineer', 'Delivery Manager'],
    gate: 'Ticket-readiness check',
    tone: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
  },
  {
    id: 'architecture',
    number: '03',
    name: 'Architecture',
    purpose: 'Choose a reliable path through constraints and dependencies',
    artifact: 'Technical plan',
    agents: ['Technical Architect', 'ML Engineer', 'Data Platform', 'SRE / Platform', 'Database Engineer'],
    gate: 'Architecture decision record',
    tone: 'border-indigo-400/40 bg-indigo-400/10 text-indigo-300',
  },
  {
    id: 'design',
    number: '04',
    name: 'Design',
    purpose: 'Shape the experience around the accepted plan',
    artifact: 'Interaction model',
    agents: ['UX Designer', 'Product Owner'],
    gate: 'Design direction approved',
    tone: 'border-violet-400/40 bg-violet-400/10 text-violet-300',
  },
  {
    id: 'implementation',
    number: '05',
    name: 'Implementation',
    purpose: 'Build independent work packets in parallel',
    artifact: 'Working increment',
    agents: ['Backend Engineer', 'Frontend Engineer', 'AI Dev Expert', 'ML Engineer', 'TypeScript Engineer', 'Systems Engineer'],
    gate: 'Integrated change set',
    tone: 'border-amber-400/50 bg-amber-400/10 text-amber-300',
  },
  {
    id: 'review',
    number: '06',
    name: 'Review',
    purpose: 'Challenge correctness, safety, delivery, and quality',
    artifact: 'Review findings',
    agents: ['Security Engineer', 'DevOps Engineer', 'AI Dev Expert', 'QA Engineer', 'Technical Writer'],
    gate: 'No open high-severity findings',
    tone: 'border-rose-400/50 bg-rose-400/10 text-rose-300',
  },
  {
    id: 'validation',
    number: '07',
    name: 'Validation',
    purpose: 'Confirm the result solves the original problem',
    artifact: 'Validated outcome',
    agents: ['Enterprise Customer', 'Indie Developer', 'Product Owner'],
    gate: 'Acceptance criteria met',
    tone: 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300',
  },
  {
    id: 'retrospective',
    number: '08',
    name: 'Retrospective',
    purpose: 'Learn from the iteration and improve the system',
    artifact: 'Action backlog',
    agents: ['Engineering Coach', 'Product Owner', 'Delivery Manager'],
    gate: 'Next actions recorded',
    tone: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300',
  },
]

const CadreSimulation = ({ open = true, className = '', autoStart = false, onComplete, onClose }: CadreSimulationProps) => {
  const [status, setStatus] = useState<SimulationStatus>('idle')
  const [activeStage, setActiveStage] = useState(-1)

  const completedStages = status === 'complete' ? stages.length : Math.max(0, activeStage)
  const artifactCount = stages.slice(0, Math.max(0, activeStage + 1)).length
  const checkpointCount = stages.slice(0, Math.max(0, activeStage + 1)).filter((stage) => stage.id === 'review' || stage.id === 'validation').length

  const runSimulation = useCallback(() => {
    setActiveStage(-1)
    setStatus('running')
  }, [])

  useEffect(() => {
    if (autoStart) runSimulation()
  }, [autoStart, runSimulation])

  useEffect(() => {
    if (status !== 'running') return undefined

    const timer = window.setInterval(() => {
      setActiveStage((current) => {
        const next = current + 1
        if (next >= stages.length) {
          setStatus('complete')
          onComplete?.({ artifactCount: stages.length, checkpointCount: 2, completedAt: Date.now() })
          return stages.length - 1
        }
        return next
      })
    }, 850)

    return () => window.clearInterval(timer)
  }, [onComplete, status])

  const statusLabel = useMemo(() => {
    if (status === 'idle') return 'Ready to dispatch a Cadre team'
    if (status === 'complete') return 'Iteration complete — ready for human review'
    return `${stages[activeStage]?.name ?? 'Dispatch'} stage in progress`
  }, [activeStage, status])

  if (!open) return null

  return (
    <section aria-labelledby="cadre-simulation-title" className={`rounded-3xl border border-cream/10 bg-surface/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8 ${className}`}>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="section-kicker mb-3">Cadre workflow simulation</p>
          <h2 id="cadre-simulation-title" className="text-2xl font-semibold text-cream md:text-3xl">One orchestrator. Eight gates. Many specialists in parallel.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream/60 md:text-base">Cadre turns a goal into inspectable work packets, routes each stage through the right specialists, and keeps review and human control explicit before delivery.</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={runSimulation} aria-label={status === 'running' ? 'Restart Cadre simulation' : 'Run Cadre simulation'} className="btn btn-primary gap-2">
            {status === 'running' ? <RotateCcw size={17} aria-hidden="true" /> : <Play size={17} fill="currentColor" aria-hidden="true" />}
            {status === 'running' ? 'Restart simulation' : 'Run simulation'}
          </button>
          {onClose && <button type="button" onClick={onClose} aria-label="Close Cadre simulation" className="btn btn-secondary px-4"><X size={17} aria-hidden="true" /></button>}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cream/55" aria-live="polite">
        <span className="inline-flex items-center gap-2"><CircleDot size={14} className={status === 'running' ? 'animate-pulse text-accent' : 'text-cream/40'} aria-hidden="true" />{statusLabel}</span>
        <span>{completedStages} of {stages.length} stages complete</span>
        <span>{checkpointCount} review gates passed</span>
        <span>{artifactCount} artifacts handed off</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-cream/10 bg-primary/45 p-3 md:p-5">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(248,250,244,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,250,244,.04)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative mb-5 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-xl border border-secondary/50 bg-secondary/10 p-4 text-secondary"><div className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-75"><ClipboardCheck size={14} /> Input</div><strong className="mt-2 block text-sm text-cream">User goal + constraints</strong><span className="mt-1 block text-xs text-cream/55">Brief, data, tools, success criteria</span></div>
          <GitBranch className="mx-auto hidden text-accent md:block" size={22} aria-hidden="true" />
          <div className="rounded-xl border border-accent/50 bg-accent/10 p-4 text-accent"><div className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-75"><Users size={14} /> Orchestrator</div><strong className="mt-2 block text-sm text-cream">Product Owner</strong><span className="mt-1 block text-xs text-cream/55">Plans, delegates, monitors, and resolves</span></div>
        </div>

        <div className="relative grid gap-3 lg:grid-cols-2" role="list" aria-label="Cadre workflow stages">
          {stages.map((stage, index) => {
            const isComplete = index < activeStage
            const isActive = index === activeStage && status === 'running'
            const isWaiting = index > activeStage

            return (
              <article key={stage.id} role="listitem" className={`rounded-2xl border p-4 transition-all duration-500 ${stage.tone} ${isActive ? 'scale-[1.015] shadow-lg shadow-accent/10' : ''} ${isWaiting ? 'opacity-45 grayscale' : 'opacity-100'}`} aria-label={`${stage.name} stage with ${stage.agents.length} parallel agents. ${isComplete ? 'Complete.' : isActive ? 'Active.' : 'Waiting.'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div><div className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-75"><span>{stage.number}</span>{isComplete ? <Check size={14} aria-hidden="true" /> : isActive ? <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> : null}</div><h3 className="mt-1 text-base font-semibold text-cream">{stage.name}</h3><p className="mt-1 text-xs leading-relaxed text-cream/55">{stage.purpose}</p></div>
                  <span className="shrink-0 rounded-full bg-cream/5 px-2 py-1 text-[0.65rem] font-bold text-cream/60">{stage.agents.length} parallel</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {stage.agents.map((agent) => <div key={agent} className={`rounded-lg border border-cream/10 bg-primary/25 px-2 py-2 text-[0.68rem] leading-tight text-cream/70 transition-all duration-500 ${isActive || isComplete ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-60'}`}><span className="mb-1 block h-1 w-1 rounded-full bg-current opacity-70" />{agent}</div>)}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-cream/10 pt-3 text-[0.68rem]"><span className="inline-flex items-center gap-1.5 text-cream/55"><Layers size={13} /> {isComplete || isActive ? stage.artifact : 'Awaiting packet'}</span><span className="inline-flex items-center gap-1.5 text-cream/55"><ShieldCheck size={13} /> Gate: {stage.gate}</span></div>
              </article>
            )
          })}
        </div>

        <div className="relative mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-xl border border-emerald-400/50 bg-emerald-400/10 p-4 text-emerald-300"><div className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-75"><PackageCheck size={14} /> Output</div><strong className="mt-2 block text-sm text-cream">Delivered result</strong><span className="mt-1 block text-xs text-cream/55">Decision record, artifacts, and next actions</span></div>
          <GitBranch className="mx-auto hidden rotate-180 text-emerald-300 md:block" size={22} aria-hidden="true" />
          <div className="rounded-xl border border-cream/10 bg-cream/5 p-4 text-cream/70"><div className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-75"><ShieldCheck size={14} /> Human control</div><strong className="mt-2 block text-sm text-cream">Review, approve, or redirect</strong><span className="mt-1 block text-xs text-cream/55">Cadre makes the work inspectable; people keep the decision</span></div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-cream/50"><Sparkles size={14} className="text-secondary" aria-hidden="true" /><span>{status === 'complete' ? 'All stage gates passed — the result is ready for human review.' : 'Parallel specialists work inside each stage; gates control when the next stage begins.'}</span></div>
    </section>
  )
}

export default CadreSimulation
