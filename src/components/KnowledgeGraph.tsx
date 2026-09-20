import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BrainCircuit, ChevronDown, ChevronUp, CircleHelp } from 'lucide-react'
import { KnowledgeNode, KnowledgeNodeType } from '../data/knowledgeGraph'

interface KnowledgeGraphProps {
  graph: Record<string, KnowledgeNode>
}

const typeStyles: Record<KnowledgeNodeType, { fill: string; stroke: string; text: string; label: string }> = {
  root: { fill: '#14b8a6', stroke: '#99f6e4', text: '#07111f', label: 'You' },
  project: { fill: '#8b5cf6', stroke: '#c4b5fd', text: '#fff', label: 'Project' },
  course: { fill: '#38bdf8', stroke: '#bae6fd', text: '#07111f', label: 'Class' },
  work: { fill: '#f59e0b', stroke: '#fde68a', text: '#07111f', label: 'Work' },
  technology: { fill: '#ec4899', stroke: '#f9a8d4', text: '#fff', label: 'Technology' },
  concept: { fill: '#64748b', stroke: '#cbd5e1', text: '#fff', label: 'Concept' },
}

const KnowledgeGraph = ({ graph }: KnowledgeGraphProps) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState('connor')
  const prefersReducedMotion = useReducedMotion()

  const visibleIds = useMemo(() => {
    const visible = new Set<string>(['connor'])
    const queue = ['connor']
    while (queue.length) {
      const id = queue.shift() as string
      if (!expanded.has(id)) continue
      graph[id]?.connections.forEach(connection => {
        if (!visible.has(connection)) {
          visible.add(connection)
          queue.push(connection)
        }
      })
    }
    return [...visible].filter(id => graph[id])
  }, [expanded, graph])

  const positions = useMemo(() => {
    const result: Record<string, { x: number; y: number }> = { connor: { x: 500, y: 300 } }
    const others = visibleIds.filter(id => id !== 'connor')
    others.forEach((id, index) => {
      const angle = (index / Math.max(others.length, 1)) * Math.PI * 2 - Math.PI / 2
      const radius = 150 + (index % 3) * 55
      result[id] = { x: 500 + Math.cos(angle) * radius, y: 300 + Math.sin(angle) * radius * .72 }
    })
    for (let iteration = 0; iteration < 18; iteration += 1) {
      visibleIds.forEach(id => {
        if (id === 'connor') return
        const point = result[id]
        let forceX = (500 - point.x) * .004
        let forceY = (300 - point.y) * .004
        visibleIds.forEach(otherId => {
          if (id === otherId) return
          const other = result[otherId]
          const dx = point.x - other.x
          const dy = point.y - other.y
          const distance = Math.max(Math.hypot(dx, dy), 1)
          if (distance < 125) {
            forceX += (dx / distance) * (125 - distance) * .018
            forceY += (dy / distance) * (125 - distance) * .018
          }
        })
        graph[id].connections.forEach(connection => {
          if (!result[connection]) return
          forceX += (result[connection].x - point.x) * .002
          forceY += (result[connection].y - point.y) * .002
        })
        result[id] = { x: Math.max(70, Math.min(930, point.x + forceX)), y: Math.max(70, Math.min(530, point.y + forceY)) }
      })
    }
    return result
  }, [graph, visibleIds])

  const toggleNode = (id: string) => {
    setSelected(id)
    setExpanded(current => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      const reachable = new Set<string>(['connor'])
      const queue = ['connor']
      while (queue.length) {
        const currentId = queue.shift() as string
        if (!next.has(currentId)) continue
        graph[currentId]?.connections.forEach(connection => {
          if (!reachable.has(connection)) {
            reachable.add(connection)
            queue.push(connection)
          }
        })
      }
      return new Set([...next].filter(expandedId => reachable.has(expandedId)))
    })
  }

  const resetGraph = () => {
    setExpanded(new Set())
    setSelected('connor')
  }

  const visibleEdges = visibleIds.flatMap(id => graph[id].connections.filter(connection => visibleIds.includes(connection) && id < connection).map(connection => ({ from: id, to: connection, key: `${id}::${connection}` })))
  const selectedNode = graph[selected]

  return (
    <section id="knowledge-graph" aria-labelledby="knowledge-graph-title" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-kicker mb-3">Explore the connections</p>
            <h2 id="knowledge-graph-title" className="section-heading flex items-center gap-3"><BrainCircuit className="text-accent" size={34} /> Knowledge graph</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/60">Start with Connor, then follow projects, classes, technologies, and ideas as they connect. Shared concepts intentionally form loops across the graph.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-cream/50"><CircleHelp size={16} /> Click a node to expand or collapse its neighborhood</div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-cream/10 bg-surface/45 shadow-2xl shadow-black/10">
          <div className="overflow-x-auto">
            <div className="relative aspect-[5/3] min-h-[30rem] w-full" aria-label="Interactive knowledge graph">
              <svg viewBox="0 0 1000 600" role="img" aria-labelledby="knowledge-graph-title" className="absolute inset-0 h-full w-full">
              <defs><filter id="graph-glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
              <g opacity=".55">
                {visibleEdges.map(edge => { const start = positions[edge.from]; const end = positions[edge.to]; return <motion.line key={edge.key} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={selected === edge.from || selected === edge.to ? '#14b8a6' : 'rgba(248,250,244,.18)'} strokeWidth={selected === edge.from || selected === edge.to ? 2.5 : 1.2} animate={{ opacity: 1 }} transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 18 }} /> })}
              </g>
              </svg>
              {visibleIds.map(id => {
                const node = graph[id]
                const point = positions[id]
                const style = typeStyles[node.type]
                const isSelected = selected === id
                const isExpanded = expanded.has(id)
                return <motion.button key={id} type="button" aria-expanded={isExpanded} aria-label={`${node.label}. ${typeStyles[node.type].label}. ${node.summary}. ${isExpanded ? 'Collapse' : 'Expand'} node`} onClick={() => toggleNode(id)} animate={{ left: `${point.x / 10}%`, top: `${point.y / 6}%` }} transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 18 }} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary" style={{ color: style.text }}>
                  <span className="flex items-center justify-center rounded-full border-2 font-bold shadow-lg transition-transform hover:scale-110" style={{ width: node.type === 'root' ? 96 : isSelected ? 68 : 56, height: node.type === 'root' ? 96 : isSelected ? 68 : 56, backgroundColor: style.fill, borderColor: style.stroke, boxShadow: isSelected ? `0 0 0 4px ${style.fill}33, 0 0 24px ${style.fill}66` : undefined }}>
                    <span className={node.type === 'root' ? 'text-sm' : 'max-w-[4.5rem] px-1 text-[0.65rem] leading-tight'}>{node.label}</span>
                  </span>
                  <span className="mt-1 text-[0.65rem] font-semibold text-cream/55">{isExpanded ? 'collapse' : 'expand'}</span>
                </motion.button>
              })}
            </div>
          </div>
          <div className="border-t border-cream/10 bg-primary/35 p-5 md:p-6">
            <div className="flex flex-wrap gap-2" aria-label="Knowledge graph node types">{Object.entries(typeStyles).map(([type, style]) => <span key={type} className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 text-xs font-semibold text-cream/65"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: style.fill }} />{style.label}</span>)}</div>
            {selectedNode && <div className="mt-5 flex items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{typeStyles[selectedNode.type].label}</p><h3 className="mt-2 text-2xl font-semibold text-cream">{selectedNode.label}</h3><p className="mt-2 max-w-2xl leading-relaxed text-cream/60">{selectedNode.summary}</p><p className="mt-3 text-sm text-cream/50" aria-live="polite">Connected to: {selectedNode.connections.map(connection => graph[connection]?.label).filter(Boolean).join(', ') || 'nothing yet'}</p></div><div className="flex shrink-0 gap-2"><button type="button" onClick={resetGraph} className="rounded-xl border border-cream/10 bg-cream/5 px-3 py-2 text-xs font-semibold text-cream/60 hover:border-accent/40 hover:text-accent">Back to Connor</button><button type="button" onClick={() => toggleNode(selectedNode.id)} className="rounded-xl border border-cream/10 bg-cream/5 p-3 text-cream/60 hover:border-accent/40 hover:text-accent" aria-label={expanded.has(selectedNode.id) ? `Collapse ${selectedNode.label}` : `Expand ${selectedNode.label}`}>{expanded.has(selectedNode.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button></div></div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default KnowledgeGraph
