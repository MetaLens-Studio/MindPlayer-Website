'use client'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Zap, Link2 } from 'lucide-react'

interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: 'completed' | 'in-progress' | 'pending'
  energy: number
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const [radius, setRadius] = useState(200)
  const [containerHeight, setContainerHeight] = useState(700)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      if (vw < 480) { setRadius(130); setContainerHeight(500) }
      else if (vw < 768) { setRadius(160); setContainerHeight(580) }
      else { setRadius(200); setContainerHeight(700) }
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const toggleItem = (id: number) => {
    setExpandedItems(prev => {
      const newState = { ...prev }
      Object.keys(newState).forEach(key => { if (parseInt(key) !== id) newState[parseInt(key)] = false })
      newState[id] = !prev[id]
      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const relatedItems = getRelatedItems(id)
        const newPulseEffect: Record<number, boolean> = {}
        relatedItems.forEach(relId => { newPulseEffect[relId] = true })
        setPulseEffect(newPulseEffect)
        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }
      return newState
    })
  }

  useEffect(() => {
    if (!autoRotate) return
    const id = setInterval(() => {
      setRotationAngle(prev => Number(((prev + 0.3) % 360).toFixed(3)))
    }, 50)
    return () => clearInterval(id)
  }, [autoRotate])

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex(item => item.id === nodeId)
    const targetAngle = (nodeIndex / timelineData.length) * 360
    setRotationAngle(270 - targetAngle)
  }

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, angle, zIndex, opacity }
  }

  const getRelatedItems = (itemId: number): number[] => {
    const current = timelineData.find(item => item.id === itemId)
    return current ? current.relatedIds : []
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const statusLabel = (status: TimelineItem['status']) => {
    if (status === 'completed') return 'SUPPORTED'
    if (status === 'in-progress') return 'IN PROGRESS'
    return 'COMING SOON'
  }

  const statusColor = (status: TimelineItem['status']) => {
    if (status === 'completed') return { background: 'rgba(93,235,255,0.15)', color: '#5DEBFF', border: '1px solid rgba(93,235,255,0.4)' }
    if (status === 'in-progress') return { background: 'rgba(138,111,255,0.15)', color: '#8A6FFF', border: '1px solid rgba(138,111,255,0.4)' }
    return { background: 'rgba(255,255,255,0.08)', color: '#B8B8B8', border: '1px solid rgba(255,255,255,0.2)' }
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#070707', height: `${containerHeight}px` }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: '1000px' }}
        >
          {/* Center orb */}
          <div className="absolute flex items-center justify-center z-10" style={{ width: 64, height: 64 }}>
            <div className="absolute rounded-full animate-ping opacity-40" style={{
              width: 80, height: 80,
              border: '1px solid rgba(93,235,255,0.3)',
            }} />
            <div className="absolute rounded-full animate-ping opacity-25" style={{
              width: 100, height: 100,
              border: '1px solid rgba(138,111,255,0.2)',
              animationDelay: '0.5s',
            }} />
            <div className="rounded-full" style={{
              width: 48, height: 48,
              background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)',
              boxShadow: '0 0 30px rgba(93,235,255,0.4)',
            }} />
          </div>

          {/* Orbit ring */}
          <div className="absolute rounded-full" style={{
            width: radius * 2 + 30, height: radius * 2 + 30,
            border: '1px solid rgba(255,255,255,0.08)',
          }} />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length)
            const isExpanded = expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = pulseEffect[item.id]
            const Icon = item.icon

            return (
              <div
                key={item.id}
                ref={el => { nodeRefs.current[item.id] = el }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                }}
                onClick={e => { e.stopPropagation(); toggleItem(item.id) }}
              >
                {/* Glow halo */}
                <div
                  className={isPulsing ? 'animate-pulse' : ''}
                  style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    width: `${item.energy * 0.3 + 48}px`,
                    height: `${item.energy * 0.3 + 48}px`,
                    left: `-${(item.energy * 0.3 + 48 - 40) / 2}px`,
                    top: `-${(item.energy * 0.3 + 48 - 40) / 2}px`,
                    background: `radial-gradient(circle, rgba(93,235,255,0.18) 0%, transparent 70%)`,
                  }}
                />

                {/* Node circle */}
                <div style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isExpanded ? 'linear-gradient(135deg,#5DEBFF,#8A6FFF)' : isRelated ? 'rgba(93,235,255,0.2)' : 'rgba(255,255,255,0.06)',
                  border: isExpanded ? '2px solid #5DEBFF' : isRelated ? '2px solid rgba(93,235,255,0.6)' : '2px solid rgba(255,255,255,0.2)',
                  boxShadow: isExpanded ? '0 0 20px rgba(93,235,255,0.5)' : 'none',
                  transform: isExpanded ? 'scale(1.4)' : 'scale(1)',
                  transition: 'all 0.3s',
                  color: isExpanded ? '#070707' : '#B8B8B8',
                }}>
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div style={{
                  position: 'absolute',
                  top: 48,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: isExpanded ? '#5DEBFF' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.3s',
                }}>
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <div style={{
                    position: 'absolute',
                    top: 72,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: Math.min(220, radius * 1.1),
                    background: 'rgba(10,10,20,0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(93,235,255,0.2)',
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(93,235,255,0.1)',
                    zIndex: 300,
                  }}>
                    {/* Connector line */}
                    <div style={{
                      position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                      width: 1, height: 12, background: 'rgba(93,235,255,0.4)',
                    }} />

                    {/* Status + date */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                        borderRadius: 20, padding: '2px 8px',
                        ...statusColor(item.status),
                      }}>
                        {statusLabel(item.status)}
                      </span>
                      <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>
                        {item.date}
                      </span>
                    </div>

                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.title}</div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 12 }}>{item.content}</p>

                    {/* Energy bar */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Zap size={10} /> Effectiveness
                        </span>
                        <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#5DEBFF' }}>{item.energy}%</span>
                      </div>
                      <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${item.energy}%`,
                          background: 'linear-gradient(to right, #5DEBFF, #8A6FFF)',
                          borderRadius: 4,
                        }} />
                      </div>
                    </div>

                    {/* Related nodes */}
                    {item.relatedIds.length > 0 && (
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8, letterSpacing: '0.08em' }}>
                          <Link2 size={10} /> CONNECTED STATES
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {item.relatedIds.map(relId => {
                            const rel = timelineData.find(i => i.id === relId)
                            return (
                              <button
                                key={relId}
                                onClick={e => { e.stopPropagation(); toggleItem(relId) }}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: 4,
                                  fontSize: 10, padding: '3px 8px',
                                  background: 'rgba(93,235,255,0.08)',
                                  border: '1px solid rgba(93,235,255,0.2)',
                                  borderRadius: 4,
                                  color: 'rgba(255,255,255,0.7)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(93,235,255,0.15)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(93,235,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
                              >
                                {rel?.title} <ArrowRight size={8} />
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
