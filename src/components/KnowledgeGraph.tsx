import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BrainCircuit, ChevronDown, ChevronUp, CircleHelp, Minus, Plus, RotateCcw } from 'lucide-react'
import type { KnowledgeNode, KnowledgeNodeType } from '../data/knowledgeGraph'

interface KnowledgeGraphProps { graph: Record<string, KnowledgeNode> }
type Point = { x: number; y: number }

const styles: Record<KnowledgeNodeType, { fill: string; stroke: string; text: string; label: string }> = {
  root: { fill: '#14b8a6', stroke: '#99f6e4', text: '#07111f', label: 'You' },
  theme: { fill: '#facc15', stroke: '#fef08a', text: '#24120a', label: 'Theme' },
  project: { fill: '#8b5cf6', stroke: '#c4b5fd', text: '#fff', label: 'Project' },
  course: { fill: '#38bdf8', stroke: '#bae6fd', text: '#07111f', label: 'Class' },
  work: { fill: '#f59e0b', stroke: '#fde68a', text: '#07111f', label: 'Work' },
  technology: { fill: '#ec4899', stroke: '#f9a8d4', text: '#fff', label: 'Technology' },
  concept: { fill: '#64748b', stroke: '#cbd5e1', text: '#fff', label: 'Concept' },
}

const anchors: Record<string, Point> = {
  connor: { x: 500, y: 300 },
  'ml-ai': { x: 500, y: 105 },
  'robotics-theme': { x: 765, y: 225 },
  'systems-theme': { x: 665, y: 485 },
  'data-theme': { x: 335, y: 485 },
  'agentic-ai': { x: 235, y: 225 },
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const edgeLabel = (graph: Record<string, KnowledgeNode>, from: string, to: string) => {
  if (from === 'connor') return 'focus'
  const type = graph[to]?.type
  return type === 'project' ? 'builds' : type === 'work' ? 'experience' : type === 'course' ? 'learns' : type === 'technology' ? 'uses' : 'connects'
}

const KnowledgeGraph = ({ graph }: KnowledgeGraphProps) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['connor']))
  const [path, setPath] = useState(['connor'])
  const [selected, setSelected] = useState('connor')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [positions, setPositions] = useState<Record<string, Point>>(anchors)
  const [manualPositions, setManualPositions] = useState<Record<string, Point>>({})
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pulsing, setPulsing] = useState<Set<string>>(new Set())
  const reducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLDivElement>(null)
  const positionsRef = useRef<Record<string, Point>>(anchors)
  const initialized = useRef<Set<string>>(new Set(Object.keys(anchors)))
  const panDrag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)
  const dragStarted = useRef(false)
  const ignoreClickUntil = useRef(0)

  const visibleIds = useMemo(() => {
    const visible = new Set(path)
    const current = path[path.length - 1]
    if (expanded.has(current)) graph[current]?.connections.forEach(id => visible.add(id))
    return [...visible].filter(id => graph[id])
  }, [expanded, graph, path])
  const visibleSet = useMemo(() => new Set(visibleIds), [visibleIds])
  const edges = useMemo(() => {
    const seen = new Set<string>()
    return visibleIds.flatMap(from => graph[from].connections.filter(to => visibleSet.has(to)).flatMap(to => {
      const key = [from, to].sort().join('-')
      if (seen.has(key)) return []
      seen.add(key)
      return [{ from, to, key, label: edgeLabel(graph, from, to) }]
    }))
  }, [graph, visibleIds, visibleSet])
  const sharedIds = useMemo(() => new Set(visibleIds.filter(id => Object.values(graph).filter(node => node.type === 'theme' && node.connections.includes(id)).length > 1)), [graph, visibleIds])
  const selectedNode = graph[selected]
  const selectedHasConnections = Boolean(selectedNode?.connections.some(id => graph[id]))

  useEffect(() => {
    const next = { ...positionsRef.current }
    const current = path[path.length - 1]
    const children = expanded.has(current) ? graph[current]?.connections.filter(id => visibleSet.has(id)) ?? [] : []
    visibleIds.forEach((id, index) => {
      if (next[id] || initialized.current.has(id)) return
      const parentId = current && graph[current]?.connections.includes(id) ? current : path[path.length - 2]
      const parent = next[parentId] ?? anchors.connor
      const childIndex = children.indexOf(id)
      const angle = childIndex >= 0 ? -Math.PI / 2 + childIndex * (Math.PI * 2 / Math.max(children.length, 1)) : index * 2.399
      const radius = 205
      next[id] = { x: clamp(parent.x + Math.cos(angle) * radius, 70, 930), y: clamp(parent.y + Math.sin(angle) * radius, 70, 530) }
      initialized.current.add(id)
    })
    positionsRef.current = next
    setPositions(next)
  }, [expanded, graph, manualPositions, path, reducedMotion, visibleIds, visibleSet])

  const focusBranch = (id: string) => {
    window.requestAnimationFrame(() => {
      const rect = canvasRef.current?.getBoundingClientRect()
      const point = positionsRef.current[id]
      if (!rect || !point) return
      const targetZoom = graph[id]?.connections.length > 5 ? Math.min(zoom, 0.9) : zoom
      setZoom(targetZoom)
      const x = rect.width / 2 - (point.x / 1000) * rect.width * targetZoom
      const y = rect.height / 2 - (point.y / 600) * rect.height * targetZoom
      setPan({ x: clamp(x, -rect.width * 0.2, rect.width * 0.2), y: clamp(y, -rect.height * 0.2, rect.height * 0.2) })
    })
  }

  const toggleNode = (id: string) => {
    const isExpanded = expanded.has(id)
    const pathIndex = path.indexOf(id)
    const nextPath = isExpanded ? (id === 'connor' ? ['connor'] : path.slice(0, Math.max(pathIndex, 1))) : pathIndex >= 0 ? path.slice(0, pathIndex + 1) : [...path, id]
    const nextExpanded = isExpanded ? (id === 'connor' ? new Set<string>() : new Set([nextPath[nextPath.length - 1]])) : new Set([id])
    setSelected(id)
    setDetailsOpen(true)
    setPath(nextPath)
    setExpanded(nextExpanded)
    if (!isExpanded) focusBranch(id)
    const shared = graph[id]?.connections.filter(connection => sharedIds.has(connection)) ?? []
    setPulsing(new Set(shared))
    if (shared.length) window.setTimeout(() => setPulsing(new Set()), 1000)
  }

  const resetGraph = () => {
    setExpanded(new Set(['connor']))
    setPath(['connor'])
    setSelected('connor')
    setDetailsOpen(true)
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setManualPositions({})
    positionsRef.current = anchors
    setPositions(anchors)
    initialized.current = new Set(Object.keys(anchors))
  }

  const handleDragEnd = (id: string, offset: { x: number; y: number }) => {
    if (!dragStarted.current) return
    const rect = canvasRef.current?.getBoundingClientRect()
    const point = positionsRef.current[id]
    if (!rect || !point) { dragStarted.current = false; return }
    const next = { x: clamp(point.x + (offset.x / zoom) * (1000 / rect.width), 60, 940), y: clamp(point.y + (offset.y / zoom) * (600 / rect.height), 60, 540) }
    setManualPositions(current => ({ ...current, [id]: next }))
    positionsRef.current = { ...positionsRef.current, [id]: next }
    setPositions(current => ({ ...current, [id]: next }))
    ignoreClickUntil.current = Date.now() + 180
    dragStarted.current = false
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    panDrag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => { if (!panDrag.current) return; const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return; setPan({ x: clamp(panDrag.current.panX + event.clientX - panDrag.current.x, -rect.width * 0.2, rect.width * 0.2), y: clamp(panDrag.current.panY + event.clientY - panDrag.current.y, -rect.height * 0.2, rect.height * 0.2) }) }
  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => { if (!event.ctrlKey && !event.metaKey) return; event.preventDefault(); setZoom(value => clamp(value - event.deltaY * 0.001, 0.65, 1.8)) }

  return <section id="knowledge-graph" aria-labelledby="knowledge-graph-title" className="px-6 py-28">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="section-kicker mb-3">Explore the connections</p>
          <h2 id="knowledge-graph-title" className="section-heading flex items-center gap-3"><BrainCircuit className="text-accent" size={34} /> Knowledge graph</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/60">A compact map of the ideas, work, classes, and tools that shape how I build.</p>
          <p className="mt-3 text-sm text-cream/45" aria-live="polite"><span className="font-semibold text-cream/65">Path:</span> {path.map(id => graph[id]?.label).filter(Boolean).join(' → ')}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-cream/50"><CircleHelp size={16} /> Click to expand · drag to arrange</div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-cream/10 bg-surface/45 shadow-2xl shadow-black/10">
        <div className="grid md:grid-cols-[minmax(0,1fr)_19rem]">
          <div ref={canvasRef} role="group" className="relative h-[28rem] w-full touch-none overflow-hidden md:h-[34rem]" aria-label="Interactive knowledge graph" aria-describedby="knowledge-graph-instructions" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={() => { panDrag.current = null }} onPointerCancel={() => { panDrag.current = null }} onWheel={handleWheel}>
            <p id="knowledge-graph-instructions" className="sr-only">Use Tab to focus nodes. Enter or Space expands or collapses the focused node. Drag nodes to reposition them and drag empty space to pan.</p>
            <div className="pointer-events-none absolute inset-0 origin-center" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
              <svg viewBox="0 0 1000 600" aria-hidden="true" focusable="false" className="absolute inset-0 h-full w-full">
                {edges.map(edge => { const start = positions[edge.from]; const end = positions[edge.to]; if (!start || !end) return null; const active = selected === edge.from || selected === edge.to || sharedIds.has(edge.from) || sharedIds.has(edge.to); return <g key={edge.key}><motion.line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={active ? '#14b8a6' : 'rgba(248,250,244,.18)'} strokeWidth={active ? 2.5 : 1.1} className={pulsing.has(edge.from) || pulsing.has(edge.to) ? 'animate-pulse' : undefined} />{(edge.from === 'connor' || active) && <text x={(start.x + end.x) / 2} y={(start.y + end.y) / 2 - 7} textAnchor="middle" fill="currentColor" opacity=".5" fontSize="11" fontWeight="600">{edge.label}</text>}</g> })}
              </svg>
              {visibleIds.map(id => { const node = graph[id]; const point = positions[id] ?? anchors.connor; const style = styles[node.type]; const isSelected = selected === id; const isExpanded = expanded.has(id); const isShared = sharedIds.has(id); const hasConnections = node.connections.some(connection => graph[connection]); return <motion.button key={id} type="button" drag dragMomentum={false} dragElastic={0.06} onDragStart={() => { dragStarted.current = true }} onDragEnd={(_, info) => handleDragEnd(id, info.offset)} onClick={() => { if (!dragStarted.current && Date.now() >= ignoreClickUntil.current) toggleNode(id) }} aria-expanded={hasConnections ? isExpanded : undefined} aria-controls="knowledge-graph-details" aria-label={`${node.label}. ${style.label}.${hasConnections ? ` ${isExpanded ? 'Expanded' : 'Collapsed'}` : ''}`} title={`${node.label} · ${style.label}`} animate={{ left: `${point.x / 10}%`, top: `${point.y / 6}%` }} transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 150, damping: 20 }} className={`pointer-events-auto absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${pulsing.has(id) ? 'animate-pulse' : ''}`} style={{ color: style.text }}>
                <span className="flex items-center justify-center rounded-full border-2 px-2 text-center font-bold shadow-lg transition-transform hover:scale-110" style={{ width: node.type === 'root' ? 88 : node.type === 'theme' ? 72 : isSelected ? 58 : 48, height: node.type === 'root' ? 88 : node.type === 'theme' ? 72 : isSelected ? 58 : 48, backgroundColor: style.fill, borderColor: style.stroke, boxShadow: isShared || isSelected ? `0 0 0 4px ${style.fill}33, 0 0 22px ${style.fill}66` : undefined }}><span className={node.type === 'root' || node.type === 'theme' ? 'text-xs sm:text-sm' : 'max-w-[4.5rem] text-[0.6rem] leading-tight'}>{node.label}</span></span>
              </motion.button> })}
            </div>
            <div className="absolute left-4 top-4 z-20 rounded-lg border border-cream/10 bg-primary/75 px-3 py-2 text-xs text-cream/55 backdrop-blur-sm">{path.length === 1 ? 'Five themes to explore' : 'Focused branch'}</div>
            <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-xl border border-cream/10 bg-primary/80 p-1 shadow-lg backdrop-blur-sm" aria-label="Graph controls"><button type="button" onClick={() => setZoom(value => clamp(value + 0.15, 0.65, 1.8))} aria-label="Zoom in" className="rounded-lg p-2 text-cream/70 hover:bg-cream/10 hover:text-cream"><Plus size={16} /></button><span className="min-w-10 text-center text-[0.65rem] font-semibold text-cream/55">{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom(value => clamp(value - 0.15, 0.65, 1.8))} aria-label="Zoom out" className="rounded-lg p-2 text-cream/70 hover:bg-cream/10 hover:text-cream"><Minus size={16} /></button><button type="button" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }} aria-label="Reset graph view" className="rounded-lg p-2 text-cream/70 hover:bg-cream/10 hover:text-cream"><RotateCcw size={16} /></button></div>
          </div>

          <aside id="knowledge-graph-details" aria-label="Selected node details" aria-live="polite" className={`border-t border-cream/10 bg-primary/35 p-5 md:border-l md:border-t-0 md:p-6 ${detailsOpen ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-start justify-between gap-3"><div><p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent">{selectedNode ? styles[selectedNode.type].label : 'Node'}</p><h3 className="mt-2 text-xl font-semibold text-cream">{selectedNode?.label}</h3></div><button type="button" onClick={() => setDetailsOpen(value => !value)} className="rounded-lg border border-cream/10 bg-cream/5 p-2 text-cream/60 hover:border-accent/40 hover:text-accent md:hidden" aria-expanded={detailsOpen} aria-controls="knowledge-graph-details" aria-label={detailsOpen ? 'Close node details' : 'Open node details'}>{detailsOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</button>{selectedNode && selectedHasConnections && <button type="button" onClick={() => toggleNode(selectedNode.id)} className="hidden rounded-lg border border-cream/10 bg-cream/5 p-2 text-cream/60 hover:border-accent/40 hover:text-accent md:block" aria-label={expanded.has(selectedNode.id) ? `Collapse ${selectedNode.label}` : `Expand ${selectedNode.label}`}>{expanded.has(selectedNode.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>}</div>
            {selectedNode && <div className="mt-3"><p className="text-sm leading-relaxed text-cream/60">{selectedNode.summary}</p>{sharedIds.has(selectedNode.id) && <p className="mt-3 text-xs font-semibold text-accent">Shared connection across themes.</p>}{selectedNode.href && <a href={selectedNode.href} target={selectedNode.href.startsWith('http') ? '_blank' : undefined} rel={selectedNode.href.startsWith('http') ? 'noreferrer' : undefined} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">Open portfolio page <ArrowUpRight size={14} /></a>}<div className="mt-5 border-t border-cream/10 pt-4"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/40">Related nodes</p><div className="mt-2 space-y-1">{selectedNode.connections.map(id => graph[id] && <button key={id} type="button" disabled={!visibleSet.has(id)} onClick={() => { if (visibleSet.has(id)) { setSelected(id); focusBranch(id) } }} aria-label={`Jump to ${graph[id].label} without changing expansion`} className={`block w-full rounded-md px-2 py-1.5 text-left text-sm ${visibleSet.has(id) ? 'text-accent hover:bg-cream/5' : 'text-cream/30'}`}>{graph[id].label}<span className="ml-1 text-[0.65rem] text-cream/35">{visibleSet.has(id) ? '· jump' : '· locked'}</span></button>)}</div></div><button type="button" onClick={resetGraph} className="mt-5 w-full rounded-lg border border-cream/10 bg-cream/5 px-3 py-2 text-xs font-semibold text-cream/60 hover:border-accent/40 hover:text-accent">Back to Connor</button></div>}
          </aside>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-cream/10 bg-primary/25 px-5 py-3 text-[0.68rem] font-semibold text-cream/55" aria-label="Knowledge graph key">{Object.entries(styles).map(([type, style]) => <span key={type} className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: style.fill }} />{style.label}</span>)}</div>
      </div>
    </div>
  </section>
}

export default KnowledgeGraph
