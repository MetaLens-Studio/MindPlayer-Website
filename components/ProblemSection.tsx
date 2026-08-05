'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { blurDataURLs } from '@/lib/imagePlaceholders'

const CARDS = [
  {
    id: 'focus',
    title: 'Focus',
    description: 'Constant notifications, multitasking, and digital noise destroy your ability to enter deep, sustained concentration.',
    color: '#5DEBFF',
    image: '/images/Focus.webp',
    accent: 'rgba(93,235,255,0.18)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#5DEBFF" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="6"  stroke="#5DEBFF" strokeWidth="1.2" opacity="0.6"/>
        <circle cx="16" cy="16" r="2"  fill="#5DEBFF"/>
        <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke="#5DEBFF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'sleep',
    title: 'Sleep',
    description: 'Blue light, racing thoughts, and chronic stress disrupt the sleep cycles your brain needs to consolidate and repair.',
    color: '#8A6FFF',
    image: '/images/Sleep.webp',
    accent: 'rgba(138,111,255,0.18)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M26 17a11 11 0 1 1-11-11 8 8 0 0 0 11 11z" stroke="#8A6FFF" strokeWidth="1.5" fill="none"/>
        <circle cx="22" cy="8" r="1.5" fill="#8A6FFF" opacity="0.5"/>
        <circle cx="27" cy="12" r="1" fill="#8A6FFF" opacity="0.4"/>
        <circle cx="25" cy="5" r="1" fill="#8A6FFF" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 'recovery',
    title: 'Recovery',
    description: 'Mental and physical fatigue accumulate faster than ever — without the right tools, true restoration is impossible.',
    color: '#FFD76A',
    image: '/images/Recovery.webp',
    accent: 'rgba(255,215,106,0.15)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="#FFD76A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9.5 9.5l2.8 2.8M19.7 19.7l2.8 2.8M22.5 9.5l-2.8 2.8M12.3 19.7l-2.8 2.8" stroke="#FFD76A" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <circle cx="16" cy="16" r="4" stroke="#FFD76A" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'motivation',
    title: 'Motivation',
    description: 'Burnout, low dopamine, and constant comparison drain the drive you need to pursue what actually matters.',
    color: '#FFD76A',
    image: '/images/Recovery.webp',
    accent: 'rgba(255,215,106,0.15)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 6l2.5 7H26l-6 4.5 2.5 7L16 20l-6.5 4.5 2.5-7L6 13h7.5z" stroke="#FFD76A" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'emotional',
    title: 'Emotional Balance',
    description: 'Unregulated stress responses, anxiety loops, and emotional dysregulation quietly erode your quality of life.',
    color: '#FF6B9D',
    image: '/images/Emotional-Balance.webp',
    accent: 'rgba(255,107,157,0.15)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 26s-11-7-11-14a6 6 0 0 1 11-4 6 6 0 0 1 11 4c0 7-11 14-11 14z" stroke="#FF6B9D" strokeWidth="1.5" fill="none"/>
        <path d="M10 14c0-2 1.5-3.5 3.5-3.5" stroke="#FF6B9D" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'cognitive',
    title: 'Cognitive Performance',
    description: 'Decision fatigue, information overload, and poor mental hygiene cap your potential far below what you\'re capable of.',
    color: '#5DEBFF',
    image: '/images/Cognitive.webp',
    accent: 'rgba(93,235,255,0.15)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 5C11 5 7 9 7 13.5c0 2.5 1.1 4.7 2.9 6.2C8.7 20.5 8 22 8 23.5c0 2.5 2 4 4 4h8c2 0 4-1.5 4-4 0-1.5-.7-3-1.9-3.8C23.9 18.2 25 16 25 13.5 25 9 21 5 16 5z" stroke="#5DEBFF" strokeWidth="1.5" fill="none"/>
        <path d="M12 20h8M13 23h6" stroke="#5DEBFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <circle cx="13" cy="13" r="1.5" fill="#5DEBFF" opacity="0.6"/>
        <circle cx="19" cy="13" r="1.5" fill="#5DEBFF" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 'creativity',
    title: 'Creativity',
    description: 'Mental rigidity, stress, and routine suppress original thinking and the imaginative flow states that fuel great work.',
    color: '#8A6FFF',
    image: '/images/Sleep.webp',
    accent: 'rgba(138,111,255,0.18)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 8c-2 0-4 1.5-4 4 0 1.5.7 2.8 1.8 3.6C12.3 16.3 12 17 12 18c0 1.5 1 2.5 2 2.5h4c1 0 2-1 2-2.5 0-1-.3-1.7-1.8-2.4C19.3 14.8 20 13.5 20 12c0-2.5-2-4-4-4z" stroke="#8A6FFF" strokeWidth="1.5" fill="none"/>
        <path d="M13 21v3M19 21v3M14 24h4" stroke="#8A6FFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M8 12h2M22 12h2M10 8l1.5 1.5M20.5 8L19 9.5" stroke="#8A6FFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
]

export default function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const gridStyle = isDesktop
    ? {
        gridTemplateColumns: CARDS.map((_, i) => i === activeIndex ? '5fr' : '1fr').join(' '),
        gridTemplateRows: '1fr',
      }
    : {
        gridTemplateRows: CARDS.map((_, i) => i === activeIndex ? '5fr' : '1fr').join(' '),
        gridTemplateColumns: '1fr',
      }

  return (
    <section
      className="relative overflow-hidden py-16 md:py-32"
      style={{ background: 'linear-gradient(180deg, #070707 0%, #0E1525 100%)' }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-16 px-6 md:px-8 text-center"
      >
        <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#FF6B9D' }}>The Problem</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
          Modern life <span className="gradient-text">overloads the mind.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[#B8B8B8]">
          Most technology competes for your attention. Very little helps regulate the mental state behind it.
        </p>
      </motion.div>

      {/* Expanding cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto max-w-6xl px-4 md:px-8"
      >
        <ul
          className="grid w-full gap-2"
          style={{
            height: isDesktop ? '520px' : '900px',
            transition: 'grid-template-columns 0.5s ease-out, grid-template-rows 0.5s ease-out',
            ...gridStyle,
          }}
        >
          {CARDS.map((card, index) => {
            const isActive = activeIndex === index
            return (
              <li
                key={card.id}
                className="relative cursor-pointer overflow-hidden rounded-2xl"
                style={{
                  minWidth: isDesktop ? '56px' : undefined,
                  minHeight: !isDesktop ? '52px' : undefined,
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                {/* ── Optimised photo via next/image ─────────────── */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                  quality={72}
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL={blurDataURLs[card.image.replace('/images/', '')]}
                  className="object-cover transition-all duration-500"
                  style={{
                    transform: isActive ? 'scale(1.0)' : 'scale(1.06)',
                    filter: isActive
                      ? 'grayscale(0%) brightness(0.72)'
                      : 'grayscale(45%) brightness(0.4)',
                  }}
                />

                {/* Dark gradient — text legibility */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(7,7,7,0.94) 0%, rgba(7,7,7,0.4) 55%, rgba(7,7,7,0.1) 100%)',
                  }}
                />

                {/* Theme glow — only when active */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 20% 80%, ${card.accent}, transparent 60%)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                {/* Border */}
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-500"
                  style={{
                    border: `1px solid ${isActive ? card.color + '45' : 'rgba(255,255,255,0.06)'}`,
                  }}
                />

                {/* ── Collapsed label ─────────────────────────────── */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1, pointerEvents: 'none' }}
                >
                  {isDesktop ? (
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 select-none whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {card.title}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80 select-none whitespace-nowrap px-4">
                      {card.title}
                    </span>
                  )}
                </div>

                {/* ── Expanded content ───────────────────────────── */}
                <article className="absolute inset-0 flex flex-col justify-end gap-3 p-7">
                  <div
                    className="transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                      transitionDelay: isActive ? '60ms' : '0ms',
                    }}
                  >
                    {card.icon}
                  </div>

                  <h3
                    className="font-display text-2xl font-bold text-white transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: isActive ? '120ms' : '0ms',
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="max-w-xs text-sm leading-relaxed text-white/70 transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: isActive ? '180ms' : '0ms',
                    }}
                  >
                    {card.description}
                  </p>

                  <div
                    className="mt-1 h-px rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? '48px' : '0px',
                      background: card.color,
                      transitionDelay: isActive ? '220ms' : '0ms',
                    }}
                  />
                </article>
              </li>
            )
          })}
        </ul>
      </motion.div>

      {/* Solution */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto max-w-2xl px-6 md:px-8 mt-20 md:mt-28 text-center"
      >
        <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#5DEBFF' }}>The Solution</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
          A new kind of <span className="gradient-text">experience.</span>
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: '#B8B8B8' }}>
          Mind Player combines sound, immersive environments and guidance into experiences designed to shift how you feel — not just distract you from how you feel.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-10 rounded-full" style={{ background: '#5DEBFF' }} />
          <div className="h-px w-6 rounded-full" style={{ background: '#8A6FFF' }} />
          <div className="h-px w-3 rounded-full" style={{ background: '#FFD76A' }} />
        </div>
      </motion.div>
    </section>
  )
}
