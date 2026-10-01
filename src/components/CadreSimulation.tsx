import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, CirclePause, GitBranch, Play, RotateCcw, ShieldCheck, X } from 'lucide-react'
import { cadreWorkflows, type CadreMode } from './cadreSimulationData'

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

const CadreSimulation = ({ open = true, className = '', autoStart = false, onComplete, onClose }: CadreSimulationProps) => {
  const [mode, setMode] = useState<CadreMode>('product-development')
  const [status, setStatus] = useState<Status>('idle')
  const [step, setStep] = useState(0)
  const [selectedStage, setSelectedStage] = useState(0)
  const [paused, setPaused] = useState(false)
  const completedRun = useRef(false)
  const workflow = cadreWorkflows[mode]
  const stage = workflow.stages[selectedStage]

  const runSimulation = useCallback(() => {
    completedRun.current = false
    setStep(0)
    setSelectedStage(0)
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
      if (step === workflow.stages.length - 1) {
        setStatus('complete')
      } else {
        setStep(current => current + 1)
        setSelectedStage(current => current + 1)
      }
    }, reducedMotion ? 170 : 1100)
    return () => window.clearTimeout(timer)
  }, [open, paused, status, step, workflow.stages.length])

  useEffect(() => {
    if (status === 'complete' && !completedRun.current) {
      completedRun.current = true
      onComplete?.({ artifactCount: workflow.stages.length, checkpointCount: 2, completedAt: Date.now() })
    }
  }, [onComplete, status, workflow.stages.length])

  if (!open) return null

  const chooseMode = (nextMode: CadreMode) => {
    if (nextMode === mode) return
    setMode(nextMode)
    setStatus('idle')
    setStep(0)
    setSelectedStage(0)
    setPaused(false)
    completedRun.current = false
  }

  const inspectStage = (index: number) => {
    setSelectedStage(index)
    if (status === 'running') setPaused(true)
  }

  const stageState = (index: number) => {
    if (status === 'idle') return 'queued'
    if (status === 'complete' || index < step) return 'done'
    if (index === step) return 'active'
    return 'queued'
  }

  return <section id="cadre-simulation" aria-labelledby="cadre-simulation-title" className={`cadre-simulation mt-8 overflow-hidden rounded-2xl border border-cream/10 bg-primary ${className}`}>
    <div className="border-b border-cream/10 px-5 py-6 md:px-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Cadre / workflow simulator</p>
          <h2 id="cadre-simulation-title" className="text-2xl font-semibold tracking-[-0.04em] text-cream md:text-[1.75rem]">One goal. The right team at each stage.</h2>
          <p className="mt-2 text-sm leading-relaxed text-cream/65">An illustrative run through the two workflows defined in cadre-bootstrap. Choose a mode, then inspect how work and review move between specialists.</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button type="button" onClick={runSimulation} className="btn btn-primary gap-2 text-sm" aria-label={status === 'idle' ? 'Run Cadre simulation' : 'Replay Cadre simulation'}>
            {status === 'idle' ? <Play size={15} fill="currentColor" aria-hidden="true" /> : <RotateCcw size={15} aria-hidden="true" />}
            {status === 'idle' ? 'Run simulation' : 'Replay'}
          </button>
          {status === 'running' && <button type="button" onClick={() => setPaused(current => !current)} className="btn btn-secondary gap-2 px-3 text-sm" aria-label={paused ? 'Resume simulation' : 'Pause simulation'}>{paused ? <Play size={15} aria-hidden="true" /> : <CirclePause size={15} aria-hidden="true" />}<span>{paused ? 'Resume' : 'Pause'}</span></button>}
          {onClose && <button type="button" onClick={onClose} className="btn btn-secondary px-3" aria-label="Close Cadre simulation"><X size={16} aria-hidden="true" /></button>}
        </div>
      </div>
      <div className="mt-6 inline-flex flex-wrap gap-1 rounded-xl border border-cream/10 bg-surface/35 p-1" role="group" aria-label="Cadre workflow mode">
        {(Object.keys(cadreWorkflows) as CadreMode[]).map(option => <button key={option} type="button" aria-pressed={mode === option} onClick={() => chooseMode(option)} className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${mode === option ? 'bg-accent/15 text-accent' : 'text-cream/55 hover:bg-cream/5 hover:text-cream'}`}>{cadreWorkflows[option].label}</button>)}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-cream/45">Modeled from <code>cadre-bootstrap/team.yaml</code> · Deterministic demo · No live agents or external actions</p>
    </div>

    <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,.85fr)]">
      <div className="min-w-0 p-5 md:p-7">
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center" aria-label="Operator and orchestrator">
          <div className="rounded-xl border border-cream/10 bg-surface/40 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/45">Operator goal</p><p className="mt-2 text-sm font-medium leading-relaxed text-cream">{workflow.goal}</p></div>
          <ArrowRight size={16} className="hidden text-accent sm:block" aria-hidden="true" />
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Orchestrator</p><p className="mt-2 text-sm font-semibold text-cream">{workflow.orchestrator}</p><p className="mt-1 text-xs text-cream/55">Routes work through this mode’s stages.</p></div>
        </div>

        <div className="mb-3 mt-7 flex items-center justify-between gap-3"><h3 className="text-sm font-semibold text-cream">Workflow</h3><span className="text-xs text-cream/45">Select a stage to inspect</span></div>
        <div className="mb-5 h-1 overflow-hidden rounded-full bg-cream/10" aria-hidden="true"><div className="h-full rounded-full bg-accent transition-[width] duration-700" style={{ width: status === 'idle' ? '0%' : `${((step + 1) / workflow.stages.length) * 100}%` }} /></div>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label={`${workflow.label} stages`}>
          {workflow.stages.map((item, index) => {
            const state = stageState(index)
            const selected = selectedStage === index
            return <li key={item.name}>
              <button type="button" onClick={() => inspectStage(index)} aria-current={state === 'active' ? 'step' : undefined} aria-pressed={selected} aria-label={`${item.title}, stage ${index + 1} of ${workflow.stages.length}${item.parallel ? ', parallel' : ''}. ${state}. Inspect stage`} className={`relative flex h-full min-h-[5.5rem] w-full flex-col rounded-xl border p-3 text-left transition-colors ${selected ? 'border-accent/70 bg-accent/10' : state === 'done' ? 'border-accent/25 bg-surface/50 hover:border-accent/40' : 'border-cream/10 bg-surface/25 hover:border-cream/30'}`}>
                <span className="flex w-full items-center justify-between gap-1 text-[10px] font-bold tabular-nums text-cream/40"><span>{String(index + 1).padStart(2, '0')}</span>{state === 'done' ? <Check size={13} className="text-accent" aria-hidden="true" /> : state === 'active' ? <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" /> : null}</span>
                <span className="mt-2 block text-xs font-semibold text-cream">{item.title}</span>
                <span className="mt-1 block text-[10px] text-cream/45">{item.parallel ? 'Parallel specialists' : 'Coordinated stage'}</span>
              </button>
            </li>
          })}
        </ol>

        <div className={`mt-6 flex items-start gap-3 rounded-xl border p-4 ${status === 'complete' ? 'border-accent/40 bg-accent/10' : 'border-cream/10 bg-surface/25'}`}>
          <ShieldCheck size={19} className={`mt-0.5 shrink-0 ${status === 'complete' ? 'text-accent' : 'text-cream/45'}`} aria-hidden="true" />
          <div><p className="text-sm font-semibold text-cream">{status === 'complete' ? 'Ready for a human decision' : 'Human checkpoint'}</p><p className="mt-1 text-xs leading-relaxed text-cream/60">{workflow.humanGate}</p></div>
        </div>
      </div>

      <aside className="border-t border-cream/10 bg-surface/25 p-5 md:p-7 lg:border-l lg:border-t-0" aria-label="Cadre simulation details">
        <div className="border-b border-cream/10 pb-5" aria-live="polite" aria-atomic="true">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">{status === 'idle' ? 'Ready' : status === 'complete' ? 'Run complete' : paused ? 'Paused to inspect' : `Stage ${step + 1} of ${workflow.stages.length}`}</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-cream">{status === 'idle' ? 'Choose a workflow and run it' : status === 'complete' ? 'Review-ready, not approved' : workflow.stages[step].title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/60">{status === 'idle' ? 'This visualization uses sample artifacts and never executes a real task.' : status === 'complete' ? workflow.outcome : workflow.stages[step].summary}</p>
        </div>

        <div className="border-b border-cream/10 py-5">
          <div className="flex items-center justify-between gap-2"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/45">Inspecting / {String(selectedStage + 1).padStart(2, '0')}</p>{stage.parallel && <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 px-2 py-1 text-[10px] font-semibold text-accent"><GitBranch size={11} aria-hidden="true" /> Parallel</span>}</div>
          <h4 className="mt-2 text-base font-semibold text-cream">{stage.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-cream/60">{stage.summary}</p>
          <div className="mt-4 rounded-lg border border-cream/10 bg-primary/45 px-3 py-3"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-cream/45">Example artifact</p><p className="mt-1 text-sm font-medium text-cream">{stage.artifact}</p></div>
          {stage.reviewGate && <p className="mt-3 border-l-2 border-accent/45 pl-3 text-xs leading-relaxed text-cream/65"><strong className="text-cream">Review gate:</strong> {stage.reviewGate}</p>}
        </div>

        <div className="py-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/45">Participating agents · {stage.agents.length}</p><div className="mt-3 flex flex-wrap gap-1.5">{stage.agents.map(agent => <span key={agent} className="rounded-full border border-cream/10 bg-cream/5 px-2.5 py-1.5 text-[11px] leading-tight text-cream/70">{agent}</span>)}</div></div>
        <div className="border-t border-cream/10 pt-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/45">Recent handoffs</p>{status === 'idle' ? <p className="mt-3 text-xs text-cream/45">No stages started yet.</p> : <ol className="mt-3 space-y-2">{workflow.stages.slice(0, step + 1).slice(-3).map(item => <li key={item.name} className="flex items-start gap-2 text-xs leading-relaxed text-cream/60"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span>{item.title} <span className="text-cream/40">→</span> {item.artifact}</span></li>)}</ol>}</div>
      </aside>
    </div>
  </section>
}

export default CadreSimulation
