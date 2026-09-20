import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const layers = [
  { label: 'Signal', color: '#14b8a6', nodes: [[90, 120], [90, 210], [90, 300]] },
  { label: 'Representation', color: '#8b9cf6', nodes: [[300, 80], [300, 165], [300, 250], [300, 335]] },
  { label: 'Decision', color: '#f59e0b', nodes: [[520, 120], [520, 210], [520, 300]] },
  { label: 'Action', color: '#f8faf4', nodes: [[735, 165], [735, 255]] },
]

const edges = layers.slice(0, -1).flatMap((layer, layerIndex) => {
  const next = layers[layerIndex + 1]
  return layer.nodes.flatMap(([x1, y1]) => next.nodes.map(([x2, y2]) => ({ x1, y1, x2, y2 })))
})

const EdgeParticle = ({ edge, progress }: { edge: typeof edges[number]; progress: MotionValue<number> }) => {
  const cx = useTransform(progress, [0, 1], [edge.x1, edge.x2])
  const cy = useTransform(progress, [0, 1], [edge.y1, edge.y2])
  return <motion.circle cx={cx} cy={cy} r="3.5" fill="#f8faf4" filter="url(#neural-glow)" />
}

const NeuralNetwork = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const edgeProgress = useTransform(scrollYProgress, [0.12, 0.48], [0, 1])
  const networkOpacity = useTransform(scrollYProgress, [0, 0.16, 0.82, 1], [0.35, 1, 1, 0.45])
  const networkScale = useTransform(scrollYProgress, [0.05, 0.5, 0.95], [0.78, 1.04, 0.9])
  const networkY = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -70])
  const signalPulse = useTransform(scrollYProgress, [0.08, 0.28], [0.8, 1.18])
  const representationPulse = useTransform(scrollYProgress, [0.28, 0.5], [0.8, 1.18])
  const decisionPulse = useTransform(scrollYProgress, [0.5, 0.72], [0.8, 1.18])
  const actionPulse = useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1.18])
  const layerPulses = [signalPulse, representationPulse, decisionPulse, actionPulse]

  return (
    <section ref={sectionRef} id="neural-network" aria-hidden="true" className="relative min-h-[180vh] px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(20,184,166,0.13),transparent_38%),radial-gradient(circle_at_75%_48%,rgba(245,158,11,0.1),transparent_36%)]" />
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="relative mx-auto w-full max-w-7xl">
        <motion.div style={prefersReducedMotion ? undefined : { opacity: networkOpacity, scale: networkScale, y: networkY }} className="overflow-hidden rounded-[2.5rem] border border-cream/10 bg-surface/35 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8 md:p-12">
          <svg viewBox="0 0 825 390" className="h-auto w-full">
            <defs>
              <linearGradient id="neural-edge" x1="0" x2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity=".65" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity=".65" />
              </linearGradient>
              <filter id="neural-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <g stroke="url(#neural-edge)" strokeWidth="1.5" strokeOpacity=".5">
              {edges.map((edge, index) => (
                <motion.line key={index} x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} pathLength={1} style={prefersReducedMotion ? undefined : { pathLength: edgeProgress }} />
              ))}
            </g>
            {!prefersReducedMotion && edges.filter((_, index) => index % 6 === 0).map((edge, index) => <EdgeParticle key={`particle-${index}`} edge={edge} progress={edgeProgress} />)}
            {layers.map((layer) => (
              <motion.g key={layer.label} style={prefersReducedMotion ? undefined : { scale: layerPulses[layers.indexOf(layer)], transformOrigin: `${layer.nodes[0][0]}px 210px` }}>
                {layer.nodes.map(([x, y], index) => (
                  <motion.g key={`${layer.label}-${index}`} style={prefersReducedMotion ? undefined : { opacity: networkOpacity }}>
                    <circle cx={x} cy={y} r="17" fill="#07111f" stroke={layer.color} strokeWidth="2" filter="url(#neural-glow)" />
                    <circle cx={x} cy={y} r="5" fill={layer.color} />
                  </motion.g>
                ))}
              </motion.g>
            ))}
          </svg>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NeuralNetwork
