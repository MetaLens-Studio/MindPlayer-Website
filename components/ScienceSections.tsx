'use client'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const FACTORS = [
  'Stress levels',
  'Attention state',
  'Sleep quality',
  'Recovery capacity',
  'Cognitive overload',
  'Emotional regulation',
  'Environmental stimulation',
  'Sensory input',
]

const RESEARCH_AREAS = [
  {
    title: 'Cognitive Performance',
    description: 'Research on attention and cognitive load informs how we structure Mind sessions — minimising overstimulation while supporting sustained focus.',
    color: '#5DEBFF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C9 4 5 8 5 12.5c0 2.5 1.1 4.7 2.8 6.2-.8.8-1.3 1.9-1.3 3.1C6.5 24 8 25.5 9.8 25.5c.7 0 1.4-.2 2-.5C12.9 25.8 13.5 26 14 26s1.1-.2 2.2-.5c.6.3 1.3.5 2 .5C20 26 21.5 24.5 21.5 22c0-1.2-.5-2.3-1.3-3.1C22 17.2 23 15 23 12.5 23 8 19 4 14 4z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <circle cx="10.5" cy="12" r="1.5" fill="currentColor" opacity=".7"/>
        <circle cx="17.5" cy="12" r="1.5" fill="currentColor" opacity=".7"/>
        <path d="M10 17q4 3 8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Attention Regulation',
    description: 'Studies on attentional networks guide how we design goal and state selection — helping users move from scattered to focused intentionally.',
    color: '#8A6FFF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1.2" opacity=".6"/>
        <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Stress & Nervous System',
    description: 'Autonomic nervous system research shapes the audio and visual profiles of our recovery and relaxation Minds — designed to support downregulation, not just distraction.',
    color: '#FF6B9D',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M2 14h4l3-7 4 14 4-10 2 4 3-1h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Sleep & Recovery',
    description: 'Sleep science informs our sleep Minds — from the pace of guided sessions to the frequencies used in our sleep audio environments.',
    color: '#8A6FFF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M22 16.5A9 9 0 0 1 11.5 6 9 9 0 1 0 22 16.5z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <circle cx="19" cy="7" r="1" fill="currentColor" opacity=".5"/>
        <circle cx="23" cy="11" r=".8" fill="currentColor" opacity=".4"/>
        <circle cx="21.5" cy="4.5" r=".7" fill="currentColor" opacity=".3"/>
      </svg>
    ),
  },
  {
    title: 'Environmental Psychology',
    description: 'Research on how physical environments affect cognition is the foundation of our immersive visual environments. Context changes state. We design context intentionally.',
    color: '#5DEBFF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="16" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="3" y="16" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="16" y="16" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" opacity=".4"/>
        <path d="M20.5 18.5l-2 2 1.5 1.5 2-2M19 23l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Music & Emotional Regulation',
    description: 'Decades of research on music and emotion guide our curation — tempo, key, rhythm and dynamics are chosen for effect, not preference.',
    color: '#FFD76A',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M11 21V9l14-3v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="21" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="22" cy="18" r="3" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    title: 'Spatial Audio',
    description: 'Binaural and spatial audio research informs how we layer sound to create immersive environments that influence attention and arousal levels.',
    color: '#5DEBFF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 8v12M10 10v8M6 12v4M18 10v8M22 12v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Neuroplasticity',
    description: 'Research on habit formation and neuroplasticity shapes how we think about consistent use — small, repeated sessions create lasting change.',
    color: '#8A6FFF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5c-2 0-4 1-5 3-2 0-4 1.5-4 4 0 1 .3 2 .9 2.7C5.3 16 5 17.5 6 18.5c0 2 1.5 3.5 3.5 3.5.5 0 1-.1 1.5-.3.8 1 2 1.3 3 1.3s2.2-.3 3-1.3c.5.2 1 .3 1.5.3 2 0 3.5-1.5 3.5-3.5 1-.9 .7-2.5.1-3.8.6-.7.9-1.7.9-2.7 0-2.5-2-4-4-4-1-2-3-3-5-3z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <path d="M14 9v5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function ResearchCard({ area, index }: { area: typeof RESEARCH_AREAS[0] & { icon: React.ReactNode }; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const num = String(index + 1).padStart(2, '0')
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: '1000px', minHeight: '220px', cursor: 'pointer' }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '220px',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.55s cubic-bezier(0.4,0.2,0.2,1)',
        }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '16px',
            padding: '28px 24px',
            background: `radial-gradient(ellipse 140% 100% at 50% 110%, ${area.color}14 0%, rgba(255,255,255,0.01) 65%)`,
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Large faded number — decorative background */}
          <span style={{
            position: 'absolute',
            bottom: '-20px',
            right: '12px',
            fontSize: '80px',
            fontWeight: 900,
            fontFamily: 'monospace',
            color: area.color,
            opacity: 0.12,
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            {num}
          </span>

          {/* Icon */}
          <div style={{ color: area.color, opacity: 0.95 }}>{area.icon}</div>

          {/* Accent bar */}
          <div style={{
            height: '2px',
            width: '36px',
            borderRadius: '99px',
            background: `linear-gradient(90deg, transparent, ${area.color}, transparent)`,
          }} />

          {/* Title */}
          <h3 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4, margin: 0 }}>
            {area.title}
          </h3>
        </div>

        {/* Back */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '16px',
            padding: '24px',
            background: `radial-gradient(ellipse 140% 100% at 50% 0%, ${area.color}18 0%, rgba(10,10,20,0.98) 65%)`,
            border: `1px solid ${area.color}`,
            boxShadow: `0 0 28px ${area.color}30, inset 0 0 24px ${area.color}08`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            textAlign: 'center',
          }}
        >
          <div style={{ color: area.color, opacity: 0.7 }}>{area.icon}</div>
          <div style={{ height: '1px', width: '32px', background: area.color, opacity: 0.4 }} />
          <p style={{ color: '#C8C8D8', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>
            {area.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function OrbAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ring1Rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const ring2Rotate = useTransform(scrollYProgress, [0, 1], [0, -240])

  return (
    <div ref={ref} className="flex items-center justify-center" style={{ height: '340px' }}>
      <div className="relative w-56 h-56 md:w-72 md:h-72">
        {/* Outer spinning ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ rotate: ring1Rotate, border: '1px solid rgba(93,235,255,0.35)' }}
        >
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{ background: '#5DEBFF', boxShadow: '0 0 12px #5DEBFF' }}
          />
        </motion.div>

        {/* Middle spinning ring */}
        <motion.div
          className="absolute inset-8 rounded-full"
          style={{ rotate: ring2Rotate, border: '1px solid rgba(138,111,255,0.45)' }}
        >
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
            style={{ background: '#8A6FFF', boxShadow: '0 0 10px #8A6FFF' }}
          />
        </motion.div>

        {/* Core glow */}
        <div
          className="absolute inset-16 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(93,235,255,0.25) 0%, rgba(138,111,255,0.15) 50%, transparent 70%)',
            boxShadow: '0 0 60px rgba(93,235,255,0.3), 0 0 120px rgba(138,111,255,0.2)',
          }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 12C24 12 16 20 16 29C16 33.5 18 37.5 21 40C18 41.5 16 44.5 16 48C16 53.5 20.5 58 26 58C27.2 58 28.3 57.8 29.3 57.4C31.3 60.5 33 62 35 62C37 62 38.7 60.5 40.7 57.4C41.7 57.8 42.8 58 44 58C49.5 58 54 53.5 54 48C54 44.5 52 41.5 49 40C52 37.5 54 33.5 54 29C54 20 46 12 35 12Z"
              stroke="#5DEBFF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M35 12C35 22 30 27 35 38C40 27 35 22 35 12" stroke="#8A6FFF" strokeWidth="1" fill="none" opacity="0.7" />
            <path d="M20 30 Q28 26 35 30 Q42 34 50 30" stroke="#FFD76A" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="26" cy="32" r="2.5" fill="#5DEBFF" opacity="0.7" />
            <circle cx="44" cy="32" r="2.5" fill="#8A6FFF" opacity="0.7" />
            <circle cx="35" cy="46" r="2.5" fill="#FFD76A" opacity="0.7" />
          </svg>
        </div>

        {/* Gold pulse ring */}
        <motion.div
          className="absolute -inset-6 rounded-full"
          style={{ border: '1px solid rgba(255,215,106,0.18)' }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

export default function ScienceSections() {
  return (
    <>
      {/* THE PRINCIPLE — white background */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: '#ffffff' }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="mb-3 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#8A6FFF' }}>
              The Principle
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4" style={{ color: '#0E0E1A' }}>
              Mental state{' '}
              <span style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                influences performance.
              </span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#4A4A6A' }}>
              By intentionally influencing these factors, we can create better conditions for focus, recovery and wellbeing.
            </p>
          </motion.div>

          {/* Orb + factors layout */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">

            {/* Left factors */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-3 lg:items-end"
            >
              {FACTORS.slice(0, 4).map((factor, i) => (
                <span
                  key={factor}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium"
                  style={{
                    background: i % 2 === 0 ? 'rgba(93,235,255,0.08)' : 'rgba(138,111,255,0.08)',
                    border: `1px solid ${i % 2 === 0 ? 'rgba(93,235,255,0.25)' : 'rgba(138,111,255,0.25)'}`,
                    color: '#2A2A4A',
                  }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: i % 2 === 0 ? '#5DEBFF' : '#8A6FFF' }}
                  />
                  {factor}
                </span>
              ))}
            </motion.div>

            {/* Center orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-shrink-0"
            >
              <OrbAnimation />
            </motion.div>

            {/* Right factors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-3 lg:items-start"
            >
              {FACTORS.slice(4).map((factor, i) => (
                <span
                  key={factor}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium"
                  style={{
                    background: i % 2 === 0 ? 'rgba(138,111,255,0.08)' : 'rgba(93,235,255,0.08)',
                    border: `1px solid ${i % 2 === 0 ? 'rgba(138,111,255,0.25)' : 'rgba(93,235,255,0.25)'}`,
                    color: '#2A2A4A',
                  }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: i % 2 === 0 ? '#8A6FFF' : '#5DEBFF' }}
                  />
                  {factor}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: '#0B0F1E' }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(138,111,255,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="mb-4 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#8A6FFF' }}>Research Areas</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              The science behind<br />
              <span className="gradient-text">our decisions.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESEARCH_AREAS.map((area, i) => (
              <ResearchCard key={area.title} area={area} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
