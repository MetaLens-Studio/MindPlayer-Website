'use client'
import * as React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { blurDataURLs } from '@/lib/imagePlaceholders'

// ── CardStack ────────────────────────────────────────────────────────────────

type CardItem = {
  id: string | number
  title: string
  description?: string
  color: string
  icon: React.ReactNode
  tags?: string[]
  image?: string
}

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0
  return ((n % len) + len) % len
}

function signedOffset(i: number, active: number, len: number) {
  const raw = i - active
  const alt = raw > 0 ? raw - len : raw + len
  return Math.abs(alt) < Math.abs(raw) ? alt : raw
}

function CardStack({ items }: { items: CardItem[] }) {
  const reduceMotion = useReducedMotion()
  const len = items.length
  const [active, setActive] = React.useState(0)
  const [hovering, setHovering] = React.useState(false)
  const [cardWidth, setCardWidth] = React.useState(620)
  const [cardHeight, setCardHeight] = React.useState(420)

  // Responsive card size
  React.useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      if (vw < 480) { setCardWidth(Math.min(vw - 32, 360)); setCardHeight(300) }
      else if (vw < 768) { setCardWidth(Math.min(vw - 48, 480)); setCardHeight(340) }
      else if (vw < 1024) { setCardWidth(Math.min(vw - 80, 560)); setCardHeight(380) }
      else { setCardWidth(620); setCardHeight(420) }
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxOffset = 3
  const overlap = 0.48
  const spreadDeg = 40
  const depthPx = 120
  const tiltXDeg = 10

  const cardSpacing = Math.round(cardWidth * (1 - overlap))
  const stepDeg = spreadDeg / maxOffset

  const next = React.useCallback(() => setActive(a => wrapIndex(a + 1, len)), [len])
  const prev = React.useCallback(() => setActive(a => wrapIndex(a - 1, len)), [len])

  // Auto-advance
  React.useEffect(() => {
    if (hovering) return
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [hovering, next])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <div
      className="w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full"
        style={{ height: cardHeight + 100 }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: '1100px' }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len)
              const abs = Math.abs(off)
              if (abs > maxOffset) return null

              const isActive = off === 0
              const rotateZ = off * stepDeg
              const x = off * cardSpacing
              const y = abs * 10
              const z = -abs * depthPx
              const scale = isActive ? 1.03 : 0.93
              const lift = isActive ? -24 : 0
              const rotateX = isActive ? 0 : tiltXDeg
              const zIndex = 100 - abs

              const dragProps = isActive
                ? {
                    drag: 'x' as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (_e: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
                      if (reduceMotion) return
                      if (info.offset.x > 120 || info.velocity.x > 600) prev()
                      else if (info.offset.x < -120 || info.velocity.x < -600) next()
                    },
                  }
                : {}

              return (
                <motion.div
                  key={item.id}
                  className={`absolute bottom-0 rounded-2xl overflow-hidden shadow-2xl will-change-transform select-none ${isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    border: `1px solid ${isActive ? item.color + '80' : 'rgba(0,0,0,0.08)'}`,
                    boxShadow: isActive ? `0 20px 60px ${item.color}22, 0 8px 24px rgba(0,0,0,0.1)` : '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 40, x, rotateZ, scale }}
                  animate={{ opacity: 1, x, y: y + lift, rotateZ, scale }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div className="h-full w-full">
                    {/* Background — image if provided, else gradient */}
                    {item.image ? (
                      <>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          quality={72}
                          priority={i === 0}
                          placeholder="blur"
                          blurDataURL={blurDataURLs[item.image.replace('/images/', '')]}
                          className="object-cover object-center"
                        />
                        {/* Dark overlay so text stays readable */}
                        <div className="absolute inset-0" style={{
                          background: 'linear-gradient(to top, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.45) 55%, rgba(7,7,7,0.2) 100%)',
                        }} />
                      </>
                    ) : (
                      <div className="absolute inset-0" style={{
                        background: `linear-gradient(145deg, #ffffff 0%, #f3f4f8 100%)`,
                      }} />
                    )}

                    {/* Colour glow top */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 40% 0%, ${item.color}25, transparent 60%)` }} />

                    {/* Border top accent */}
                    <div className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: `linear-gradient(to right, transparent, ${item.color}80, transparent)` }} />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-8">
                      <div className="mb-6" style={{ color: item.color, filter: `drop-shadow(0 0 10px ${item.color}88)` }}>
                        {item.icon}
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-3" style={{ color: item.image ? '#fff' : '#0F172A' }}>{item.title}</h3>
                      <p className="leading-relaxed text-sm flex-grow" style={{ color: item.image ? 'rgba(255,255,255,0.75)' : '#64748B' }}>{item.description}</p>

                      {/* Tags */}
                      {item.tags && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.tags.map((tag, j) => (
                            <span key={j} className="rounded-full px-3 py-1 text-xs font-medium"
                              style={{ color: item.color, background: item.image ? `${item.color}22` : `${item.color}12`, border: `1px solid ${item.color}50` }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 h-px rounded-full w-12" style={{ background: item.color }} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActive(idx)}
            className="rounded-full transition-all duration-300"
            style={{
              width: idx === active ? '24px' : '6px',
              height: '6px',
              background: idx === active ? items[active]?.color ?? '#5DEBFF' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const CARDS: CardItem[] = [
  {
    id: 'focus',
    title: 'Focus & Deep Work',
    description: 'Reduce distractions and support sustained attention and flow.',
    color: '#5DEBFF',
    image: '/images/exp-focus.webp',
    tags: ['Concentration', 'Deep Work', 'Clarity'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
        <circle cx="18" cy="18" r="2" fill="currentColor"/>
        <path d="M18 6V9M18 27V30M6 18H9M27 18H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'relax',
    title: 'Relax & Unwind',
    description: 'Decompress and calm your mind with immersive soundscapes.',
    color: '#8A6FFF',
    image: '/images/exp-relax.webp',
    tags: ['Relaxation', 'Stress Relief', 'Calm'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <path d="M6 13v10M10 9v18M14 6v24M18 10v16M22 7v22M26 11v14M30 15v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'sleep',
    title: 'Sleep & Recovery',
    description: 'Support your body and mind for deeper, more restorative sleep.',
    color: '#FFD76A',
    image: '/images/exp-sleep.webp',
    tags: ['Sleep', 'Recovery', 'Restoration'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <path d="M28 19a11 11 0 1 1-11-11 8 8 0 0 0 11 11z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="8" r="1.5" fill="currentColor" opacity="0.5"/>
        <circle cx="29" cy="12" r="1" fill="currentColor" opacity="0.4"/>
        <circle cx="27" cy="5" r="1" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 'emotional',
    title: 'Emotional Balance',
    description: 'Reduce overwhelm and support emotional regulation.',
    color: '#FF6B9D',
    image: '/images/exp-balance.webp',
    tags: ['Balance', 'Stability', 'Wellbeing'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <path d="M18 30s-13-8-13-17A7 7 0 0 1 18 9a7 7 0 0 1 13 4c0 9-13 17-13 17z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M11 17c0-2.5 1.8-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'creativity',
    title: 'Creativity & Flow',
    description: 'Unlock creativity and enter a state of inspiration and flow.',
    color: '#5DEBFF',
    image: '/images/exp-creativity.webp',
    tags: ['Creativity', 'Imagination', 'Flow'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <path d="M18 4l3.5 7 7.5 1-5.5 5.5 1.5 7.5L18 22l-7 3.5 1.5-7.5L7 12.5l7.5-1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'performance',
    title: 'Performance & Activation',
    description: 'Increase motivation, energy and cognitive readiness.',
    color: '#8A6FFF',
    image: '/images/exp-performance.webp',
    tags: ['Energy', 'Motivation', 'Performance'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <path d="M7 2v13h4v11l9-15h-5l5-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
]

// ── Mobile card list ─────────────────────────────────────────────────────────

function MobileCardList({ items }: { items: CardItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px' }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: '#0d1628',
            border: `1px solid ${item.color}60`,
            boxShadow: `0 2px 24px rgba(0,0,0,0.5), 0 0 0 0.5px ${item.color}20`,
          }}
        >
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px]"
            style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}50)`, borderRadius: '16px 0 0 16px' }} />

          {/* Glow in top-right */}
          <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 rounded-full"
            style={{ background: `radial-gradient(circle, ${item.color}28 0%, transparent 70%)` }} />

          <div className="relative pl-5 pr-4 py-4">
            {/* Header row */}
            <div className="flex items-center gap-3 mb-2">
              <div className="shrink-0 w-8 h-8 flex items-center justify-center"
                style={{ color: item.color, filter: `drop-shadow(0 0 6px ${item.color}88)` }}>
                <div style={{ transform: 'scale(0.65)', transformOrigin: 'center' }}>{item.icon}</div>
              </div>
              <h3 className="font-display text-base font-bold text-white leading-tight">{item.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-3 ml-11" style={{ color: 'rgba(184,184,184,0.85)' }}>
              {item.description}
            </p>

            {/* Tags */}
            {item.tags && (
              <div className="ml-11 flex flex-wrap gap-1.5">
                {item.tags.map((tag, j) => (
                  <span key={j} className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}35` }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function SolutionSection({ hideHeader }: { hideHeader?: boolean } = {}) {
  return (
    <section
      className="relative py-24 overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ background: '#070707' }}
    >
      {/* Cozy gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(138,111,255,0.12) 0%, transparent 65%)' }} />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(93,235,255,0.1) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 65%)' }} />
        <div className="absolute top-1/4 left-1/2 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,215,106,0.1) 0%, transparent 65%)' }} />
      </div>

      {!hideHeader && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 px-8 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#5DEBFF' }}>The Solution</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
            One Platform. <span className="gradient-text">Five Dimensions.</span>
          </h2>
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Mobile: vertical accent-card list */}
        <div className="md:hidden">
          <MobileCardList items={CARDS} />
        </div>

        {/* Desktop: 3D card stack */}
        <div className="hidden md:block">
          <CardStack items={CARDS} />
        </div>
      </div>
    </section>
  )
}
