'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const PRODUCTS = [
  {
    id: 'vr',
    label: 'Virtual Reality',
    sub: 'Total Immersion',
    desc: 'Step beyond the screen into worlds that respond to your every move and thought.',
    color: '#5DEBFF',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="13" width="32" height="18" rx="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13" cy="22" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="27" cy="22" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M18 22h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'ar',
    label: 'Augmented Reality',
    sub: 'Reality Enhanced',
    desc: 'Blend the digital and physical into seamless layered experiences.',
    color: '#8A6FFF',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 6L34 14V26L20 34L6 26V14L20 6Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 6V34M6 14L34 26M34 14L6 26" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
        <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 'mobile',
    label: 'Mobile',
    sub: 'Anywhere, Anytime',
    desc: 'Carry the future in your pocket. Consciousness untethered, always accessible.',
    color: '#FFD76A',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="11" y="4" width="18" height="32" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="32" r="1.5" fill="currentColor"/>
        <rect x="15" y="8" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI',
    sub: 'Intelligence Amplified',
    desc: 'Neural systems that understand you before you understand yourself.',
    color: '#FF6B9D',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="7" r="2.5" fill="currentColor" opacity="0.6"/>
        <circle cx="20" cy="33" r="2.5" fill="currentColor" opacity="0.6"/>
        <circle cx="7" cy="20" r="2.5" fill="currentColor" opacity="0.6"/>
        <circle cx="33" cy="20" r="2.5" fill="currentColor" opacity="0.6"/>
        <path d="M20 9.5V12M20 28V30.5M9.5 20H12M28 20H30.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function ProductShowcase({ hideHeader }: { hideHeader?: boolean } = {}) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="experiences" className="relative py-16 md:py-36 overflow-hidden" style={{ background: '#070707' }}>
      {!hideHeader && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-20 px-4 md:px-8 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#5DEBFF' }}>Products</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
            Built for the <span className="gradient-text">Next Dimension</span>
          </h2>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((p, i) => {
          const isHovered = hovered === p.id
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              whileHover={{ y: -18, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              onHoverStart={() => setHovered(p.id)}
              onHoverEnd={() => setHovered(null)}
              className="relative rounded-2xl p-5 md:p-8 overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                background: isHovered
                  ? `linear-gradient(145deg, ${p.color}18, ${p.color}05)`
                  : 'rgba(14,21,37,0.45)',
                border: `1px solid ${isHovered ? p.color + '45' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: isHovered ? `0 24px 64px ${p.color}22, 0 0 0 1px ${p.color}18` : 'none',
              }}
            >
              {/* Top corner glow */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute top-0 right-0 h-24 w-24 rounded-tr-2xl"
                  style={{ background: `radial-gradient(circle at top right, ${p.color}18, transparent 70%)` }}
                />
              )}

              {/* Icon */}
              <div
                className="mb-7 transition-all duration-400"
                style={{
                  color: isHovered ? p.color : '#B8B8B8',
                  filter: isHovered ? `drop-shadow(0 0 14px ${p.color})` : 'none',
                }}
              >
                {p.icon}
              </div>

              <p className="mb-1.5 text-[10px] tracking-[0.25em] uppercase" style={{ color: p.color, opacity: 0.75 }}>
                {p.sub}
              </p>
              <h3 className="mb-3 font-display text-xl font-bold text-white">{p.label}</h3>
              <p className="text-sm leading-relaxed text-[#B8B8B8]">{p.desc}</p>

              <motion.div
                className="mt-7 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
                style={{ color: p.color }}
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span>Explore</span>
                <span>→</span>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
