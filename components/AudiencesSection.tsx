'use client'
import { motion } from 'framer-motion'
import { Warp } from '@paper-design/shaders-react'

const AUDIENCES = [
  {
    title: 'Professionals',
    desc: 'Reclaim deep focus, eliminate mental fatigue, and perform at the highest level every day.',
    stat: '3× Focus',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.05 15.96 0 13.36 0c-1.46 0-2.75.67-3.65 1.7L12 4.43l2.29-2.73C14.77 1.26 15.53 1 16.36 1c1.47 0 2.64 1.17 2.64 2.64C19 5.11 17.28 6 16 6H4C2.9 6 2 6.9 2 8v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7 11l-5-5 1.41-1.41L13 14.17l7.59-7.59L22 8l-9 9z"/>
      </svg>
    ),
    colors: ['hsl(192, 100%, 30%)', 'hsl(192, 100%, 60%)', 'hsl(220, 90%, 40%)', 'hsl(200, 100%, 70%)'],
    shape: 'stripes' as const,
  },
  {
    title: 'Students',
    desc: 'Enter flow states on demand. Absorb information faster, retain more, stress less.',
    stat: '2× Retention',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
      </svg>
    ),
    colors: ['hsl(258, 80%, 30%)', 'hsl(270, 100%, 65%)', 'hsl(240, 90%, 40%)', 'hsl(260, 100%, 75%)'],
    shape: 'checks' as const,
  },
  {
    title: 'Athletes',
    desc: 'Accelerate recovery, build mental resilience, and prime your mind for peak performance.',
    stat: '40% Faster Recovery',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    ),
    colors: ['hsl(43, 90%, 35%)', 'hsl(48, 100%, 65%)', 'hsl(35, 90%, 40%)', 'hsl(45, 100%, 70%)'],
    shape: 'stripes' as const,
  },
  {
    title: 'Creators',
    desc: 'Break creative blocks, sustain inspiration, and produce your best work consistently.',
    stat: 'Limitless Flow',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    colors: ['hsl(330, 80%, 30%)', 'hsl(340, 100%, 60%)', 'hsl(315, 90%, 38%)', 'hsl(335, 100%, 72%)'],
    shape: 'checks' as const,
  },
  {
    title: 'High Performers',
    desc: 'Optimize every cognitive variable — from decision quality to emotional regulation.',
    stat: 'Elite Output',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/>
      </svg>
    ),
    colors: ['hsl(192, 100%, 25%)', 'hsl(180, 100%, 55%)', 'hsl(205, 90%, 35%)', 'hsl(195, 100%, 68%)'],
    shape: 'stripes' as const,
  },
  {
    title: 'Seekers of Clarity',
    desc: 'Anyone seeking calm, balance, and a mind that works with you — not against you.',
    stat: 'Inner Peace',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
    colors: ['hsl(258, 80%, 28%)', 'hsl(192, 100%, 58%)', 'hsl(220, 90%, 38%)', 'hsl(210, 100%, 68%)'],
    shape: 'checks' as const,
  },
]

export default function AudiencesSection() {
  return (
    <section className="relative py-16 md:py-32 overflow-hidden" style={{ background: '#070707' }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(93,235,255,0.04) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 md:mb-16 px-6 md:px-8 text-center"
      >
        <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#FFD76A' }}>Who It&apos;s For</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
          Built for <span className="gradient-text">Every Mind</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-[#B8B8B8]">
          Whether you seek peak performance or quiet clarity — MindPlayer adapts to you.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {AUDIENCES.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative h-72 rounded-3xl overflow-hidden"
          >
            {/* Warp shader background */}
            <div className="absolute inset-0">
              <Warp
                style={{ height: '100%', width: '100%' }}
                proportion={0.38}
                softness={1.0}
                distortion={0.18}
                swirl={0.75}
                swirlIterations={10}
                shape={a.shape}
                shapeScale={0.1}
                scale={1}
                rotation={0}
                speed={0.6}
                colors={a.colors}
              />
            </div>

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/75 border border-white/10 rounded-3xl" />

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div className="text-white opacity-90">{a.icon}</div>

              <div>
                <div className="mb-3">
                  <span className="rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white/80 border border-white/20 bg-white/10">
                    {a.stat}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{a.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{a.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-[#B8B8B8] text-lg">
          Don&apos;t see yourself? <span className="text-white font-medium">You belong here too.</span>
        </p>
      </motion.div>
    </section>
  )
}
