import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, CirclePause, GitMerge, Play, RotateCcw, Users, X } from 'lucide-react'

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

type Status = 'idle' | 'running' | 'complete'

type Team = {
  role: string
  shortName: string
  handoff: string
  focus: string
}

// Mirrors CADRE_ROLES in tools/openai_cadre_runtime.py. The text below is
// illustrative; the portfolio simulation never calls a model or runs a task.
const teams: Team[] = [
  { role: 'Product Lead', shortName: 'Product', handoff: 'Opportunity brief', focus: 'Scope, user value, and acceptance criteria' },
  { role: 'Research Lead', shortName: 'Research', handoff: 'Evidence memo', focus: 'Sources, assumptions, and open questions' },
  { role: 'Architecture Lead', shortName: 'Architecture', handoff: 'System plan', focus: 'Interfaces, constraints, and tradeoffs' },
  { role: 'Design Lead', shortName: 'Design', handoff: 'Experience direction', focus: 'Interaction, accessibility, and clarity' },
  { role: 'Plan / Delivery Lead', shortName: 'Delivery', handoff: 'Work plan', focus: 'Dependencies, sequencing, and ownership' },
  { role: 'Builder A', shortName: 'Builder A', handoff: 'Implementation A', focus: 'First independent build path' },
  { role: 'Builder B', shortName: 'Builder B', handoff: 'Implementation B', focus: 'Second independent build path' },
  { role: 'Critic', shortName: 'Critic', handoff: 'Challenge memo', focus: 'Weak assumptions and alternative approaches' },
  { role: 'QA', shortName: 'QA', handoff: 'Validation notes', focus: 'Checks, edge cases, and failure modes' },
  { role: 'Integrator', shortName: 'Integrator', handoff: 'Integration notes', focus: 'Dependencies and final synthesis' },
]

const phases = [
  { label: 'Frame', detail: 'Goal and constraints are packaged into a shared brief.' },
  { label: 'Dispatch', detail: 'The first five role teams begin in parallel.' },
  { label: 'Parallel work', detail: 'A second wave starts as capacity opens; workers propose independently.' },
  { label: 'Peer debate', detail: 'Workers compare reports and challenge one another.' },
  { label: 'Team handoffs', detail: 'Each team lead reconciles its worker reports into one handoff.' },
  { label: 'Integrate', detail: 'The integrator combines ten handoffs into a reviewable result.' },
  { label: 'Human review', detail: 'The result awaits a person to approve, revise, or redirect.' },
] as const

const activity = [
  'Shared brief prepared',
  'Five role teams dispatched',
  'Remaining teams start as capacity opens',
  'Peer critiques exchanged',
  'Ten team handoffs prepared',
  'Integrated result assembled',
  'Human decision requested',
]

const workerLabels = ['Worker 01', 'Worker 02', 'Worker 03']
const perspectives = [
  { name: 'Analyst', focus: 'Evidence' },
  { name: 'Skeptic', focus: 'Risks' },
  { name: 'Alternative', focus: 'Other path' },
] as const

const CadreSimulation = ({ open = true, className = '', autoStart = false, onComplete, onClose }: CadreSimulationProps) => {
  const [status, setStatus] = useState<Status>('idle')
  const [phase, setPhase] = useState(0)
  const [selectedTeam, setSelectedTeam] = useState(0)
  const [paused, setPaused] = useState(false)
  const completedRun = useRef(false)

  const runSimulation = useCallback(() => {
    completedRun.current = false
    setPhase(0)
    setPaused(false)
    setStatus('running')
  }, [])

  useEffect(() => {
    if (open && autoStart) runSimulation()
  }, [autoStart, open, runSimulation])

  useEffect(() => {
    if (!open || status !== 'running' || paused) return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => {
      if (phase === phases.length - 1) {
        setStatus('complete')
      } else {
        setPhase(current => current + 1)
      }
    }, reducedMotion ? 120 : 950)
    return () => window.clearTimeout(timer)
  }, [open, paused, phase, status])

  useEffect(() => {
    if (status === 'complete' && !completedRun.current) {
      completedRun.current = true
      onComplete?.({ artifactCount: teams.length + 1, checkpointCount: 1, completedAt: Date.now() })
    }
  }, [onComplete, status])

  if (!open) return null

  const selected = teams[selectedTeam]
  const activePhase = status === 'idle' ? -1 : phase
  const teamState = (index: number) => {
    if (activePhase < 1) return 'queued'
    if (activePhase === 1) return index < 5 ? 'working' : 'queued'
    if (activePhase === 2) return index < 5 ? 'ready' : 'working'
    if (activePhase === 3) return 'debating'
    if (activePhase === 4) return 'handoff'
    return 'ready'
  }

  return (
    <section id="cadre-simulation" aria-labelledby="cadre-simulation-title" className={`cadre-simulation mt-8 overflow-hidden rounded-2xl border border-cream/10 bg-primary ${className}`}>
      <div className="border-b border-cream/10 px-5 py-6 md:px-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Cadre / interactive model</p>
            <h2 id="cadre-simulation-title" className="text-2xl font-semibold tracking-[-0.04em] text-cream md:text-[1.75rem]">A team of teams, in motion.</h2>
            <p className="mt-2 text-sm leading-relaxed text-cream/65">Watch a sample goal pass through independent workers, peer debate, team leads, and a final human checkpoint.</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={runSimulation} className="btn btn-primary gap-2 text-sm" aria-label={status === 'idle' ? 'Run Cadre simulation' : 'Replay Cadre simulation'}>
              {status === 'idle' ? <Play size={15} fill="currentColor" aria-hidden="true" /> : <RotateCcw size={15} aria-hidden="true" />}
              {status === 'idle' ? 'Run simulation' : 'Replay'}
            </button>
            {status === 'running' && <button type="button" onClick={() => setPaused(current => !current)} className="btn btn-secondary gap-2 px-3 text-sm" aria-label={paused ? 'Resume simulation' : 'Pause simulation'}>{paused ? <Play size={15} aria-hidden="true" /> : <CirclePause size={15} aria-hidden="true" />}<span className="hidden sm:inline">{paused ? 'Resume' : 'Pause'}</span></button>}
            {onClose && <button type="button" onClick={onClose} className="btn btn-secondary px-3" aria-label="Close Cadre simulation"><X size={16} aria-hidden="true" /></button>}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-cream/10 pt-4 text-xs text-cream/50">
          <span><strong className="font-semibold text-cream">10</strong> role teams</span>
          <span><strong className="font-semibold text-cream">3</strong> workers per team</span>
          <span><strong className="font-semibold text-cream">5</strong> teams concurrently</span>
          <span>Illustrative run · no live agents</span>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,.8fr)]">
        <div className="min-w-0 p-5 md:p-7">
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-cream/10 bg-surface/40 p-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/30 text-accent"><Users size={16} aria-hidden="true" /></div>
            <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent">Operator brief</p><p className="mt-1 text-sm font-medium leading-relaxed text-cream/85">Build a reliable feature from a user goal, with clear evidence and review.</p></div>
          </div>

          <ol className="mb-6 grid grid-cols-4 gap-1.5 sm:grid-cols-7" aria-label="Simulation phases">
            {phases.map((item, index) => <li key={item.label} className={`min-w-0 border-t-2 pt-2 transition-colors duration-300 ${index < activePhase ? 'border-accent text-cream/70' : index === activePhase ? 'border-accent text-cream' : 'border-cream/15 text-cream/35'}`}><span className="block text-[9px] font-bold tabular-nums">0{index + 1}</span><span className="mt-1 block text-[10px] font-semibold leading-tight">{item.label}</span></li>)}
          </ol>

          <div className="mb-3 flex items-center justify-between gap-3"><h3 className="text-sm font-semibold text-cream">Role teams</h3><span className="text-xs text-cream/45">Select a team to inspect</span></div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5" role="group" aria-label="Cadre role teams">
            {teams.map((team, index) => {
              const state = teamState(index)
              const selectedCard = selectedTeam === index
              const progressing = state === 'working' || state === 'debating'
              return <button key={team.role} type="button" onClick={() => setSelectedTeam(index)} aria-pressed={selectedCard} aria-label={`${team.role}: ${state}. Inspect team`} className={`min-h-[7.2rem] rounded-xl border p-3 text-left transition-colors duration-300 ${selectedCard ? 'border-accent/65 bg-accent/10' : progressing ? 'border-accent/30 bg-surface/70' : 'border-cream/10 bg-surface/35 hover:border-cream/30'} `}>
                <span className="flex items-center justify-between gap-2"><span className="text-[10px] font-semibold tabular-nums text-cream/40">{String(index + 1).padStart(2, '0')}</span><span className={`h-1.5 w-1.5 rounded-full ${progressing ? 'animate-pulse bg-accent' : state === 'ready' || state === 'handoff' ? 'bg-accent' : 'bg-cream/20'}`} aria-hidden="true" /></span>
                <span className="mt-3 block text-xs font-semibold leading-tight text-cream">{team.shortName}</span>
                <span className="mt-3 flex gap-1" aria-hidden="true">{workerLabels.map(label => <span key={label} className={`h-1.5 w-5 rounded-full transition-colors duration-300 ${state === 'queued' ? 'bg-cream/10' : 'bg-accent/70'}`} />)}</span>
                <span className="mt-2 block text-[10px] capitalize text-cream/45">{state === 'working' ? 'Workers active' : state === 'debating' ? 'Peer debate' : state === 'handoff' ? 'Lead handoff' : state === 'ready' ? 'Handoff ready' : 'Queued'}</span>
              </button>
            })}
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-cream/10 pt-5 text-cream/55"><GitMerge size={17} className={activePhase >= 5 ? 'text-accent' : ''} aria-hidden="true" /><ArrowRight size={15} aria-hidden="true" /><span className={`text-sm font-semibold ${activePhase >= 5 ? 'text-cream' : ''}`}>Final synthesis</span><ArrowRight size={15} aria-hidden="true" /><span className={`text-sm font-semibold ${status === 'complete' ? 'text-accent' : ''}`}>Human review</span></div>
        </div>

        <aside className="border-t border-cream/10 bg-surface/25 p-5 lg:border-l lg:border-t-0 md:p-7" aria-label="Simulation details">
          <div className="min-h-[5.5rem] border-b border-cream/10 pb-5" aria-live="polite" aria-atomic="true"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">{status === 'idle' ? 'Ready' : status === 'complete' ? 'Awaiting a person' : paused ? 'Paused' : `Stage 0${phase + 1} / 07`}</p><p className="mt-2 text-lg font-semibold tracking-[-0.025em] text-cream">{status === 'idle' ? 'Ready to run' : phases[phase].label}</p><p className="mt-1 text-sm leading-relaxed text-cream/60">{status === 'idle' ? 'Press Run simulation to see the handoffs.' : phases[phase].detail}</p></div>

          <div className="border-b border-cream/10 py-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/45">Selected team</p><h3 className="mt-2 text-base font-semibold text-cream">{selected.role}</h3><p className="mt-1 text-sm leading-relaxed text-cream/60">{selected.focus}</p>
            <div className="mt-4 grid grid-cols-3 gap-1.5" aria-label="Three worker perspectives">
              {perspectives.map(worker => <div key={worker.name} className={`rounded-lg border px-2 py-2 transition-colors duration-300 ${activePhase >= 3 ? 'border-accent/35 bg-accent/5' : 'border-cream/10'}`}><span className="block text-[10px] font-semibold text-cream/75">{worker.name}</span><span className="mt-1 block text-[10px] text-cream/40">{worker.focus}</span></div>)}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-cream/55"><span className={activePhase >= 3 ? 'text-accent' : ''}>Peer debate</span><ArrowRight size={13} aria-hidden="true" /><span className={activePhase >= 4 ? 'text-accent' : ''}>Lead synthesis</span></div>
            <p className="mt-3 text-xs text-cream/45">Sample handoff: <span className="text-cream/75">{selected.handoff}</span></p>
          </div>

          <div className="pt-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/45">Activity</p><ol className="mt-3 space-y-3">{activity.slice(0, status === 'idle' ? 0 : phase + 1).slice(-4).map((entry, index, entries) => <li key={entry} className="flex gap-3 text-xs leading-relaxed text-cream/60"><span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${index === entries.length - 1 && status === 'running' ? 'bg-accent' : 'bg-cream/25'}`} aria-hidden="true" />{entry}</li>)}</ol>{status === 'idle' && <p className="mt-3 text-xs text-cream/40">No events yet.</p>}</div>
        </aside>
      </div>
    </section>
  )
}

export default CadreSimulation
