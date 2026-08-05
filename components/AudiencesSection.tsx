'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const AUDIENCES = [
  {
    title: 'Professionals',
    desc: 'Reclaim deep focus, eliminate mental fatigue, and perform at the highest level every day.',
    image: '/images/exp-focus.webp',
  },
  {
    title: 'Students',
    desc: 'Enter flow states on demand. Absorb information faster, retain more, stress less.',
    image: '/images/Cognitive.webp',
  },
  {
    title: 'Athletes',
    desc: 'Accelerate recovery, build mental resilience, and prime your mind for peak performance.',
    image: '/images/Recovery.webp',
  },
  {
    title: 'Creators',
    desc: 'Break creative blocks, sustain inspiration, and produce your best work consistently.',
    image: '/images/Sleep.webp',
  },
  {
    title: 'High Performers',
    desc: 'Optimize every cognitive variable — from decision quality to emotional regulation.',
    image: '/images/intelligence.webp',
  },
  {
    title: 'Seekers of Clarity',
    desc: 'Anyone seeking calm, balance, and a mind that works with you — not against you.',
    image: '/images/exp-relax.webp',
  },
]

export default function AudiencesSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: '#070707' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 px-6 md:px-8 text-center max-w-2xl mx-auto"
      >
        <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: '#8A6FFF' }}>Who It&apos;s For</p>
        <h2 className="font-display text-3xl md:text-5xl font-black" style={{ color: '#ffffff' }}>
          Built for <span className="gradient-text">Every Mind</span>
        </h2>
        <p className="mt-3 text-sm" style={{ color: '#B8B8B8' }}>
          Whether you seek peak performance or quiet clarity — MindPlayer adapts to you.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {AUDIENCES.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '60px' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ scale: 1.04, y: -6 }}
            className="cursor-default rounded-2xl p-3 transition-all duration-300 group"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.border = '1px solid rgba(138,111,255,0.45)'
              el.style.background = 'rgba(138,111,255,0.06)'
              el.style.boxShadow = '0 12px 40px rgba(138,111,255,0.15)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.border = '1px solid transparent'
              el.style.background = 'transparent'
              el.style.boxShadow = 'none'
            }}
          >
            <div className="w-full h-44 rounded-xl overflow-hidden">
              <Image
                src={a.image}
                alt={a.title}
                width={260}
                height={176}
                quality={70}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-base font-semibold mt-4" style={{ color: '#ffffff' }}>{a.title}</h3>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: '#B8B8B8' }}>{a.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-sm" style={{ color: '#B8B8B8' }}>
          Don&apos;t see yourself? <span className="font-semibold" style={{ color: '#ffffff' }}>You belong here too.</span>
        </p>
      </motion.div>
    </section>
  )
}
