import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BrainCircuit, ChevronDown, ChevronUp, CircleHelp, Minus, Plus, RotateCcw } from 'lucide-react'
import { KnowledgeNode, KnowledgeNodeType } from '../data/knowledgeGraph'

interface KnowledgeGraphProps {
  graph: Record<string, KnowledgeNode>
}

type Point = { x: number; y: number }

const typeStyles: Record<KnowledgeNodeType, { fill: string; stroke: string; text: string; label: string }> = {
  root: { fill: '#14b8a6', stroke: '#99f6e4', text: '#07111f', label: 'You' },
  theme: { fill: '#facc15', stroke: '#fef08a', text: '#24120a', label: 'Theme' },
  project: { fill: '#8b5cf6', stroke: '#c4b5fd', text: '#fff', label: 'Project' },
  course: { fill: '#38bdf8', stroke: '#bae6fd', text: '#07111f', label: 'Class' },
  work: { fill: '#f59e0b', stroke: '#fde68a', text: '#07111f', label: 'Work' },
  technology: { fill: '#ec4899', stroke: '#f9a8d4', text: '#fff', label: 'Technology' },
  concept: { fill: '#64748b', stroke: '#cbd5e1', text: '#fff', label: 'Concept' },
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const themeAnchors: Record<string, Point> = {
  'ml-ai': { x: 500, y: 120 },
  'robotics-theme': { x: 760, y: 235 },
  'systems-theme': { x: 680, y: 465 },
  'data-theme': { x: 320, y: 465 },
  'agentic-ai': { x: 240, y: 235 },
}

const KnowledgeGraph = ({ graph }: KnowledgeGraphProps) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [path, setPath] = useState<string[]>(['connor'])
  const [selected, setSelected] = useState('connor')
  const [positions, setPositions] = useState<Record<string, Point>>({ connor: { x: 500, y: 300 } })
  const [manualPositions, setManualPositions] = useState<Record<string, Point>>({})
  const [pulsing, setPulsing] = useState<Set<string>>(new Set())
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const prefersReducedMotion = useReducedMotion()
  const graphCanvasRef = useRef<HTMLDivElement>(null)
  const positionsRef = useRef<Record<string, Point>>({ connor: { x: 500, y: 300 } })
  const spawnOrigins = useRef<Record<string, string>>({})
  const panDrag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)

  const visibleIds = useMemo(() => {
    const visible = new Set(path)
    const currentId = path[path.length - 1]
    if (expanded.has(currentId)) graph[currentId]?.connections.forEach(connection => visible.add(connection))
    return [...visible].filter(id => graph[id])
  }, [expanded, graph, path])
  const visibleKey = visibleIds.join('|')
  const visibleSet = useMemo(() => new Set(visibleIds), [visibleIds])

  const visibleEdges = useMemo(() => visibleIds.flatMap(id => graph[id].connections.filter(connection => visibleSet.has(connection) && id < connection).map(connection => ({ from: id, to: connection, key: `${id}::${connection}` }))), [graph, visibleIds, visibleSet])

  const sharedIds = useMemo(() => {
    const themeIds = Object.keys(graph).filter(id => graph[id].type === 'theme')
    return new Set(visibleIds.filter(id => themeIds.filter(themeId => graph[themeId].connections.includes(id)).length > 1))
  }, [graph, visibleIds])

  const stepForceLayout = useCallback((current: Record<string, Point>) => {
    const next = { ...current }
    for (const id of visibleIds) {
      if (id === 'connor' || manualPositions[id] || graph[id]?.type === 'theme') continue
      const point = current[id]
      if (!point) continue
      let forceX = (500 - point.x) * 0.002
      let forceY = (300 - point.y) * 0.002
      visibleIds.forEach(otherId => {
        if (id === otherId) return
        const other = current[otherId]
        if (!other) return
        const dx = point.x - other.x
        const dy = point.y - other.y
        const distance = Math.max(Math.hypot(dx, dy), 1)
        if (distance < 130) {
          forceX += (dx / distance) * (130 - distance) * 0.035
          forceY += (dy / distance) * (130 - distance) * 0.035
        }
      })
      visibleEdges.forEach(edge => {
        if (edge.from !== id && edge.to !== id) return
        const otherId = edge.from === id ? edge.to : edge.from
        const other = current[otherId]
        if (!other) return
        forceX += (other.x - point.x) * 0.004
        forceY += (other.y - point.y) * 0.004
      })
      next[id] = { x: clamp(point.x + forceX, 55, 945), y: clamp(point.y + forceY, 55, 545) }
    }
    return next
  }, [graph, manualPositions, visibleEdges, visibleIds])

  useEffect(() => {
    const seeded = { ...positionsRef.current }
    visibleIds.forEach((id, index) => {
      if (themeAnchors[id] && !manualPositions[id]) {
        seeded[id] = themeAnchors[id]
        return
      }
      if (seeded[id]) return
      const origin = spawnOrigins.current[id]
      const parent = origin ? seeded[origin] ?? { x: 500, y: 300 } : { x: 500, y: 300 }
      const angle = ((index + 1) * 2.399) % (Math.PI * 2)
      const radius = origin ? 85 : 185
      seeded[id] = { x: clamp(parent.x + Math.cos(angle) * radius, 55, 945), y: clamp(parent.y + Math.sin(angle) * radius, 55, 545) }
    })
    Object.keys(seeded).forEach(id => { if (!visibleSet.has(id)) delete seeded[id] })

    let current = seeded
    let frame = 0
    let cancelled = false
    const settle = () => {
      if (cancelled) return
      current = prefersReducedMotion ? current : stepForceLayout(current)
      positionsRef.current = current
      setPositions({ ...current })
      frame += 1
      if (!prefersReducedMotion && frame < 24) window.requestAnimationFrame(settle)
    }
    settle()
    return () => { cancelled = true }
  }, [manualPositions, prefersReducedMotion, stepForceLayout, visibleKey, visibleIds, visibleSet])

  const toggleNode = (id: string) => {
    const wasExpanded = expanded.has(id)
    const pathIndex = path.indexOf(id)
    const nextPath = pathIndex >= 0 ? path.slice(0, pathIndex + 1) : [...path, id]
    const next = wasExpanded ? new Set<string>() : new Set([id])
    const nextVisible = new Set(nextPath)
    if (!wasExpanded) graph[id]?.connections.forEach(connection => { nextVisible.add(connection); spawnOrigins.current[connection] = id })
    const themeIds = Object.keys(graph).filter(nodeId => graph[nodeId].type === 'theme')
    const newlyShared = [...nextVisible].filter(nodeId => themeIds.filter(themeId => graph[themeId].connections.includes(nodeId)).length > 1)
    setPulsing(new Set(newlyShared))
    if (newlyShared.length) window.setTimeout(() => setPulsing(new Set()), 1200)
    setSelected(id)
    setPath(nextPath)
    setExpanded(next)
  }

  const resetGraph = () => {
    setExpanded(new Set())
    setPath(['connor'])
    setSelected('connor')
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setManualPositions({})
    spawnOrigins.current = {}
  }

  const handleDragEnd = (id: string, offset: { x: number; y: number }) => {
    const rect = graphCanvasRef.current?.getBoundingClientRect()
    const point = positions[id]
    if (!rect || !point) return
    const nextPoint = { x: clamp(point.x + (offset.x / zoom) * (1000 / rect.width), 55, 945), y: clamp(point.y + (offset.y / zoom) * (600 / rect.height), 55, 545) }
    setManualPositions(current => ({ ...current, [id]: nextPoint }))
    positionsRef.current = { ...positionsRef.current, [id]: nextPoint }
    setPositions(current => ({ ...current, [id]: nextPoint }))
  }

  const handleCanvasPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    panDrag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleCanvasPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!panDrag.current) return
    setPan({ x: panDrag.current.panX + event.clientX - panDrag.current.x, y: panDrag.current.panY + event.clientY - panDrag.current.y })
  }

  const handleCanvasPointerUp = () => { panDrag.current = null }
  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey && !event.metaKey) return
    event.preventDefault()
    setZoom(current => clamp(current - event.deltaY * 0.001, 0.65, 1.8))
  }
  const selectedNode = graph[selected]

  return (
    <section id="knowledge-graph" aria-labelledby="knowledge-graph-title" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-kicker mb-3">Explore the connections</p>
            <h2 id="knowledge-graph-title" className="section-heading flex items-center gap-3"><BrainCircuit className="text-accent" size={34} /> Knowledge graph</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/60">Start with Connor, then grow the map through ML / AI, Robotics, Systems, Data, and Agentic AI. Shared concepts stay connected across branches.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-cream/50"><CircleHelp size={16} /> Click a node to grow its branch · drag to arrange</div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-cream/10 bg-surface/45 shadow-2xl shadow-black/10">
          <div ref={graphCanvasRef} className="relative aspect-[5/3] min-h-[30rem] w-full touch-none overflow-hidden" aria-label="Interactive knowledge graph" onPointerDown={handleCanvasPointerDown} onPointerMove={handleCanvasPointerMove} onPointerUp={handleCanvasPointerUp} onPointerCancel={handleCanvasPointerUp} onWheel={handleWheel}>
            <div className="absolute inset-0 origin-center" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
              <svg viewBox="0 0 1000 600" role="img" aria-labelledby="knowledge-graph-title" className="pointer-events-none absolute inset-0 h-full w-full">
                <g opacity=".55">
                  {visibleEdges.map(edge => { const start = positions[edge.from]; const end = positions[edge.to]; if (!start || !end) return null; const highlighted = selected === edge.from || selected === edge.to; const shared = sharedIds.has(edge.from) || sharedIds.has(edge.to); return <motion.line key={edge.key} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={highlighted || shared ? '#14b8a6' : 'rgba(248,250,244,.18)'} strokeWidth={highlighted || shared ? 2.5 : 1.2} className={pulsing.has(edge.from) || pulsing.has(edge.to) ? 'animate-pulse' : undefined} /> })}
                </g>
              </svg>
              {visibleIds.map(id => {
                const node = graph[id]
                const point = positions[id] ?? { x: 500, y: 300 }
                const style = typeStyles[node.type]
                const isSelected = selected === id
                const isExpanded = expanded.has(id)
                const isShared = sharedIds.has(id)
                return <motion.button key={id} type="button" drag dragMomentum={false} dragElastic={0.08} onDragEnd={(_, info) => handleDragEnd(id, info.offset)} aria-expanded={isExpanded} aria-label={`${node.label}. ${typeStyles[node.type].label}. ${isExpanded ? 'Expanded' : 'Collapsed'}`} title={`${node.label} · ${typeStyles[node.type].label}`} onClick={() => toggleNode(id)} animate={{ left: `${point.x / 10}%`, top: `${point.y / 6}%` }} transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 18 }} className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${pulsing.has(id) ? 'animate-pulse' : ''}`} style={{ color: style.text }}>
                  <span className="flex items-center justify-center rounded-full border-2 px-2 text-center font-bold shadow-lg transition-transform hover:scale-110" style={{ width: node.type === 'root' ? 96 : node.type === 'theme' ? 84 : isSelected ? 70 : 60, height: node.type === 'root' ? 96 : node.type === 'theme' ? 84 : isSelected ? 70 : 60, backgroundColor: style.fill, borderColor: style.stroke, boxShadow: isShared || isSelected ? `0 0 0 4px ${style.fill}33, 0 0 24px ${style.fill}66` : undefined }}>
                    <span className={node.type === 'root' || node.type === 'theme' ? 'text-xs sm:text-sm' : 'max-w-[5rem] text-[0.68rem] leading-tight'}>{node.label}</span>
                  </span>
                </motion.button>
              })}
            </div>

            <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-xl border border-cream/10 bg-primary/80 p-1 shadow-lg backdrop-blur-sm" aria-label="Graph controls">
              <button type="button" onClick={() => setZoom(current => clamp(current + 0.15, 0.65, 1.8))} aria-label="Zoom in" className="rounded-lg p-2 text-cream/70 hover:bg-cream/10 hover:text-cream"><Plus size={16} /></button>
              <span className="min-w-10 text-center text-[0.65rem] font-semibold text-cream/55">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom(current => clamp(current - 0.15, 0.65, 1.8))} aria-label="Zoom out" className="rounded-lg p-2 text-cream/70 hover:bg-cream/10 hover:text-cream"><Minus size={16} /></button>
              <button type="button" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }} aria-label="Reset graph view" className="rounded-lg p-2 text-cream/70 hover:bg-cream/10 hover:text-cream"><RotateCcw size={16} /></button>
            </div>
          </div>

          <div className="border-t border-cream/10 bg-primary/35 p-5 md:p-6">
            <div className="flex flex-wrap gap-2" aria-label="Knowledge graph node types">{Object.entries(typeStyles).map(([type, style]) => <span key={type} className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 text-xs font-semibold text-cream/65"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: style.fill }} />{style.label}</span>)}</div>
            {selectedNode && <div className="mt-5 flex items-start justify-between gap-5" aria-live="polite"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{typeStyles[selectedNode.type].label}</p><h3 className="mt-2 text-2xl font-semibold text-cream">{selectedNode.label}</h3><p className="mt-2 max-w-2xl leading-relaxed text-cream/60">{selectedNode.summary}</p>{sharedIds.has(selectedNode.id) && <p className="mt-3 text-sm font-semibold text-accent">Shared connection: this node links multiple expanded branches.</p>}<div className="mt-3 flex flex-wrap gap-2 text-sm text-cream/50"><span>Connected to:</span>{selectedNode.connections.map(connection => graph[connection] && <button key={connection} type="button" onClick={() => { if (visibleSet.has(connection)) setSelected(connection) }} className={`${visibleSet.has(connection) ? 'text-accent hover:underline' : 'text-cream/40'} transition-colors`}>{graph[connection].label}</button>)}</div></div><div className="flex shrink-0 gap-2"><button type="button" onClick={resetGraph} className="rounded-xl border border-cream/10 bg-cream/5 px-3 py-2 text-xs font-semibold text-cream/60 hover:border-accent/40 hover:text-accent">Back to Connor</button><button type="button" onClick={() => toggleNode(selectedNode.id)} className="rounded-xl border border-cream/10 bg-cream/5 p-3 text-cream/60 hover:border-accent/40 hover:text-accent" aria-label={expanded.has(selectedNode.id) ? `Collapse ${selectedNode.label}` : `Expand ${selectedNode.label}`}>{expanded.has(selectedNode.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button></div></div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default KnowledgeGraph
