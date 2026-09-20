import { useCallback, useEffect, useMemo, useState } from 'react'
import { Check, ChevronRight, CircleDot, Play, RotateCcw, Sparkles, X } from 'lucide-react'

export interface CadreSimulationResult {
  artifactCount: number
  checkpointCount: number
  completedAt: number
}

export interface CadreSimulationProps {
  /** Render the simulation when used as a collapsible project-card panel. */
  open?: boolean
  /** Optional class names for the outer section. */
  className?: string
  /** Start the demo as soon as the component mounts. */
  autoStart?: boolean
  /** Called once after the final output node activates. */
  onComplete?: (result: CadreSimulationResult) => void
  /** Optional callback for integrations with a dismissible panel. */
  onClose?: () => void
}

type SimulationStatus = 'idle' | 'running' | 'complete'

type AgentNode = {
  id: string
  label: string
  detail: string
  stage: 'input' | 'orchestrator' | 'research' | 'engineering' | 'review' | 'output'
  artifact: string
}

const nodes: AgentNode[] = [
  { id: 'user', label: 'User brief', detail: 'Goal + constraints', stage: 'input', artifact: 'project brief' },
  { id: 'orchestrator', label: 'Orchestrator', detail: 'Decomposes the work', stage: 'orchestrator', artifact: 'work plan' },
  { id: 'research-1', label: 'Research scout', detail: 'Finds signals', stage: 'research', artifact: 'evidence' },
  { id: 'research-2', label: 'Context analyst', detail: 'Maps tradeoffs', stage: 'research', artifact: 'decision map' },
  { id: 'research-3', label: 'Source checker', detail: 'Verifies inputs', stage: 'research', artifact: 'verified sources' },
  { id: 'engineer-1', label: 'Systems builder', detail: 'Shapes architecture', stage: 'engineering', artifact: 'system outline' },
  { id: 'engineer-2', label: 'Prototype agent', detail: 'Builds a first pass', stage: 'engineering', artifact: 'working prototype' },
  { id: 'engineer-3', label: 'Test agent', detail: 'Probes edge cases', stage: 'engineering', artifact: 'test report' },
  { id: 'engineer-4', label: 'Integration agent', detail: 'Connects the pieces', stage: 'engineering', artifact: 'integrated draft' },
  { id: 'review-1', label: 'Quality reviewer', detail: 'Checks requirements', stage: 'review', artifact: 'quality notes' },
  { id: 'review-2', label: 'Risk reviewer', detail: 'Challenges assumptions', stage: 'review', artifact: 'risk notes' },
  { id: 'review-3', label: 'Human checkpoint', detail: 'Keeps control in view', stage: 'review', artifact: 'approval gate' },
  { id: 'orchestrator-2', label: 'Orchestrator', detail: 'Resolves feedback', stage: 'orchestrator', artifact: 'revision plan' },
  { id: 'engineer-5', label: 'Refinement agent', detail: 'Applies the fixes', stage: 'engineering', artifact: 'polished result' },
  { id: 'review-4', label: 'Final reviewer', detail: 'Signs off the result', stage: 'review', artifact: 'release decision' },
  { id: 'output', label: 'Final output', detail: 'Ready for the user', stage: 'output', artifact: 'delivered result' },
]

const stageColors: Record<AgentNode['stage'], string> = {
  input: 'border-secondary/50 bg-secondary/10 text-secondary',
  orchestrator: 'border-accent/50 bg-accent/10 text-accent',
  research: 'border-sky-400/40 bg-sky-400/10 text-sky-300',
  engineering: 'border-violet-400/40 bg-violet-400/10 text-violet-300',
  review: 'border-rose-400/40 bg-rose-400/10 text-rose-300',
  output: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300',
}

const CadreSimulation = ({ open = true, className = '', autoStart = false, onComplete, onClose }: CadreSimulationProps) => {
  const [status, setStatus] = useState<SimulationStatus>('idle')
  const [activeCount, setActiveCount] = useState(0)

  const checkpointCount = useMemo(
    () => nodes.slice(0, activeCount).filter((node) => node.stage === 'review').length,
    [activeCount],
  )

  const runSimulation = useCallback(() => {
    setActiveCount(0)
    setStatus('running')
  }, [])

  useEffect(() => {
    if (autoStart) runSimulation()
  }, [autoStart, runSimulation])

  useEffect(() => {
    if (status !== 'running') return undefined

    const timer = window.setInterval(() => {
      setActiveCount((current) => {
        const next = Math.min(current + 1, nodes.length)
        if (next === nodes.length) {
          setStatus('complete')
          onComplete?.({
            artifactCount: nodes.length,
            checkpointCount: nodes.filter((node) => node.stage === 'review').length,
            completedAt: Date.now(),
          })
        }
        return next
      })
    }, 420)

    return () => window.clearInterval(timer)
  }, [onComplete, status])

  const isActive = (index: number) => index < activeCount

  if (!open) return null

  return (
    <section
      aria-labelledby="cadre-simulation-title"
      className={`rounded-3xl border border-cream/10 bg-surface/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8 ${className}`}
    >
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="section-kicker mb-3">Interactive project demo</p>
          <h2 id="cadre-simulation-title" className="text-2xl font-semibold text-cream md:text-3xl">
            Watch Cadre turn a brief into a reviewed result.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/60 md:text-base">
            A small, simulated team passes artifacts through research, engineering, and review checkpoints before converging on an output.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={runSimulation}
            aria-label={status === 'running' ? 'Restart Cadre simulation' : 'Run Cadre simulation'}
            className="btn btn-primary gap-2"
          >
            {status === 'running' ? <RotateCcw size={17} aria-hidden="true" /> : <Play size={17} fill="currentColor" aria-hidden="true" />}
            {status === 'running' ? 'Restart simulation' : 'Run simulation'}
          </button>
          {onClose && <button type="button" onClick={onClose} aria-label="Close Cadre simulation" className="btn btn-secondary px-4"><X size={17} aria-hidden="true" /></button>}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cream/55" aria-live="polite">
        <span className="inline-flex items-center gap-2">
          <CircleDot size={14} className={status === 'running' ? 'animate-pulse text-accent' : 'text-cream/40'} aria-hidden="true" />
          {status === 'idle' ? 'Ready to run' : status === 'running' ? `Activating agent ${activeCount} of ${nodes.length}` : 'Simulation complete'}
        </span>
        <span>{checkpointCount} review checkpoints reached</span>
        <span>{activeCount} artifacts in motion</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-cream/10 bg-primary/45 p-3 md:p-5">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(248,250,244,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,250,244,.04)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex flex-wrap items-center justify-center gap-2 md:gap-3" role="list" aria-label="Cadre agent execution path">
          {nodes.map((node, index) => (
            <div key={node.id} className="contents" role="listitem">
              <div
                className={`min-w-[8.25rem] flex-1 rounded-xl border p-3 transition-all duration-500 md:min-w-[9rem] md:p-4 ${stageColors[node.stage]} ${isActive(index) ? 'translate-y-0 opacity-100 shadow-lg shadow-accent/10' : 'translate-y-1 opacity-45 grayscale'}`}
                aria-label={`${node.label}: ${node.detail}. Artifact: ${node.artifact}. ${isActive(index) ? 'Active.' : 'Waiting.'}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-75">{node.stage}</span>
                  {isActive(index) && <Check size={15} aria-hidden="true" />}
                </div>
                <strong className="block text-sm text-cream">{node.label}</strong>
                <span className="mt-1 block text-xs leading-relaxed text-cream/55">{node.detail}</span>
                <span className={`mt-3 block truncate rounded-md bg-cream/5 px-2 py-1 text-[0.65rem] font-medium ${isActive(index) ? 'text-cream/75' : 'text-cream/35'}`}>
                  {isActive(index) ? `↗ ${node.artifact}` : 'awaiting input'}
                </span>
              </div>
              {index < nodes.length - 1 && <ChevronRight className={`hidden shrink-0 transition-colors duration-300 md:block ${isActive(index + 1) ? 'text-accent' : 'text-cream/15'}`} size={18} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-cream/50">
        <Sparkles size={14} className="text-secondary" aria-hidden="true" />
        <span>{status === 'complete' ? 'Review gates passed — the result is ready for human review.' : 'Every handoff is inspectable, and every review gate is explicit.'}</span>
      </div>
    </section>
  )
}

export default CadreSimulation
