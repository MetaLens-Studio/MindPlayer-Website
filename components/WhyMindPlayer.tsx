'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { blurDataURLs } from '@/lib/imagePlaceholders'

// ── GridPattern ──────────────────────────────
function GridPattern({ width, height, x, y, squares, ...props }: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
  const patternId = React.useId()
  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], idx) => (
            <rect strokeWidth="0" key={idx} width={width + 1} height={height + 1} x={sx * width} y={sy * height} />
          ))}
        </svg>
      )}
    </svg>
  )
}

function genPattern(): number[][] {
  return Array.from({ length: 5 }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ])
}

const cardBase = {
  background: 'linear-gradient(145deg, rgba(14,21,37,0.85) 0%, rgba(7,7,7,0.95) 100%)',
  border: '1px solid rgba(255,255,255,0.06)',
}

export default function WhyMindPlayer({ hideHeader }: { hideHeader?: boolean } = {}) {
  return (
    <section id="about" className="relative py-4 md:py-8 overflow-hidden" style={{ background: '#070707' }}>
      {/* About background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.55, objectPosition: '65% 35%' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #070707 0%, transparent 30%, transparent 70%, #070707 100%)' }} />
      </div>

      {!hideHeader && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mb-5 px-8 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#8A6FFF' }}>Why Us</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
            Why <span className="gradient-text">MindPlayer</span>
          </h2>
        </motion.div>
      )}

      {/* Bento grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-6 md:pb-10">
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">

          {/* Immersion — large, spans 2 cols and 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.01 }}
            className="group relative rounded-3xl overflow-hidden md:col-span-2 md:row-span-2"
            style={{ ...cardBase, minHeight: 'clamp(200px, 28vw, 320px)', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.4s, box-shadow 0.4s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#8A6FFF'; el.style.boxShadow = '0 0 24px rgba(138,111,255,0.6), 0 0 60px rgba(138,111,255,0.2), inset 0 0 24px rgba(138,111,255,0.1)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.06)'; el.style.boxShadow = 'none' }}
          >
            <Image src="/images/immersion.webp" alt="Immersion" fill sizes="(max-width:768px) 100vw, 66vw" quality={72} priority placeholder="blur" blurDataURL={blurDataURLs['immersion.webp']} className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,7,7,0.65) 0%, rgba(7,7,7,0.35) 100%)' }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(93,235,255,0.12), transparent 60%)' }} />
            <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-10">
              <div>
                <div className="mb-5 md:mb-8" style={{ color: '#5DEBFF', filter: 'drop-shadow(0 0 16px #5DEBFF66)' }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="24" cy="24" r="8"  stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
                    <circle cx="24" cy="24" r="2"  fill="currentColor"/>
                    <path d="M24 8V10M24 38V40M8 24H10M38 24H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-5">Immersion</h3>
                <p className="text-base md:text-lg leading-relaxed text-[#B8B8B8] max-w-md">
                  Every pixel engineered to draw you deeper. Not a screen — a portal to another state of being.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 md:pt-6 mt-6 md:mt-10">
                <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: '#5DEBFF', opacity: 0.65 }}>
                  Spatial Audio · Haptic Sync · 360° Vision
                </p>
              </div>
            </div>
          </motion.div>

          {/* Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="group relative rounded-3xl overflow-hidden"
            style={{ ...cardBase, border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.4s, box-shadow 0.4s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#8A6FFF'; el.style.boxShadow = '0 0 24px rgba(138,111,255,0.6), 0 0 60px rgba(138,111,255,0.2), inset 0 0 24px rgba(138,111,255,0.1)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.06)'; el.style.boxShadow = 'none' }}
          >
            <Image src="/images/intelligence.webp" alt="Intelligence" fill sizes="(max-width:768px) 100vw, 33vw" quality={72} placeholder="blur" blurDataURL={blurDataURLs['intelligence.webp']} className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,7,7,0.65) 0%, rgba(7,7,7,0.35) 100%)' }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(138,111,255,0.12), transparent 65%)' }} />
            <div className="relative z-10 flex flex-col justify-between h-full p-8">
              <div style={{ color: '#8A6FFF', filter: 'drop-shadow(0 0 12px #8A6FFF66)' }}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M18 10C14 10 10 13.5 10 18C10 20.2 10.9 22.2 12.4 23.6C10.9 24.8 10 26.7 10 28.8C10 32.8 13.2 36 17.2 36H18V38H22V10H18Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                  <path d="M30 10C34 10 38 13.5 38 18C38 20.2 37.1 22.2 35.6 23.6C37.1 24.8 38 26.7 38 28.8C38 32.8 34.8 36 30.8 36H30V38H26V10H30Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                  <path d="M22 18H26M22 24H26M22 30H26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                  <circle cx="14" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
                  <circle cx="34" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Intelligence</h3>
                <p className="text-sm leading-relaxed text-[#B8B8B8]">Systems that learn your patterns, anticipate your needs, and grow alongside your mind.</p>
              </div>
            </div>
          </motion.div>

          {/* Human-Centered Design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.28 }}
            whileHover={{ scale: 1.02 }}
            className="group relative rounded-3xl overflow-hidden"
            style={{ ...cardBase, border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.4s, box-shadow 0.4s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#8A6FFF'; el.style.boxShadow = '0 0 24px rgba(138,111,255,0.6), 0 0 60px rgba(138,111,255,0.2), inset 0 0 24px rgba(138,111,255,0.1)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.06)'; el.style.boxShadow = 'none' }}
          >
            <Image src="/images/human-centered.webp" alt="Human-Centered Design" fill sizes="(max-width:768px) 100vw, 33vw" quality={72} placeholder="blur" blurDataURL={blurDataURLs['human-centered.webp']} className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,7,7,0.65) 0%, rgba(7,7,7,0.35) 100%)' }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,215,106,0.1), transparent 65%)' }} />
            <div className="relative z-10 flex flex-col justify-between h-full p-8">
              <div style={{ color: '#FFD76A', filter: 'drop-shadow(0 0 12px #FFD76A66)' }}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M24 10C20 10 17 13 17 17C17 19.5 18.2 21.7 20 23C17.5 24 16 26.3 16 29C16 32.3 18.7 35 22 35H26C29.3 35 32 32.3 32 29C32 26.3 30.5 24 28 23C29.8 21.7 31 19.5 31 17C31 13 28 10 24 10Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                  <path d="M24 23V38" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Human-Centered Design</h3>
                <p className="text-sm leading-relaxed text-[#B8B8B8]">Technology that disappears. Only the experience remains — pure, intuitive, and profoundly human.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Our Values */}
      <div className="relative z-10 w-full" style={{ background: '#0A0F1E', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">

          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#8A6FFF' }}>[OUR VALUES]</p>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              What we stand for.
            </h2>
            <p className="text-sm md:text-base leading-relaxed max-w-lg mx-auto" style={{ color: '#B8B8B8' }}>
              The principles behind every decision we make, ethically, intentionally, with the human mind at the centre.
            </p>
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              {
                num: '/01',
                title: 'State Comes First',
                description: 'Every decision starts with one question: does this help the user feel better?',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>
                  </svg>
                ),
              },
              {
                num: '/02',
                title: 'Outcomes Over Engagement',
                description: 'We measure success by how you feel after you leave, not time in the app.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                  </svg>
                ),
              },
              {
                num: '/03',
                title: 'Science as Foundation',
                description: 'Every feature is grounded in research, not assumptions or trends.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3H5v4l7 7 7-7-4-4h-4z"/><path d="M9 3l3 4 3-4"/><path d="M12 14v7"/><path d="M9 21h6"/>
                  </svg>
                ),
              },
              {
                num: '/04',
                title: 'Human Always',
                description: 'Technology should serve people. We build tools that feel human because they are made for humans.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/>
                  </svg>
                ),
              },
              {
                num: '/05',
                title: 'Long-Term Thinking',
                description: 'We are not optimising for the next quarter. We are building for a lifetime.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
              },
            ].map((value, i) => {
              const squares = genPattern()
              return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '60px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl flex flex-col p-4 md:p-7 cursor-default"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.10)',
                  minHeight: '260px',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                whileHover={{ y: -6 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.30)'
                  el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.10)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Grid pattern overlay */}
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full" style={{ maskImage: 'linear-gradient(white 40%, transparent)' }}>
                  <GridPattern
                    width={20} height={20} x="0" y="0"
                    squares={squares}
                    className="absolute inset-0 h-full w-full"
                    style={{ fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.08)' } as React.CSSProperties}
                  />
                </div>

                {/* Icon */}
                <div className="text-white scale-75 md:scale-100 origin-left">{value.icon}</div>

                {/* Number */}
                <span className="mt-3 md:mt-4 text-xs md:text-sm font-mono font-bold" style={{ color: 'rgba(255,255,255,0.30)' }}>{value.num}</span>

                {/* Title */}
                <h3 className="mt-2 md:mt-3 text-lg md:text-xl lg:text-2xl font-bold text-white leading-snug">{value.title}</h3>

                {/* Description */}
                <div className="mt-auto pt-3 md:pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '1rem' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,200,200,0.75)' }}>{value.description}</p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}
