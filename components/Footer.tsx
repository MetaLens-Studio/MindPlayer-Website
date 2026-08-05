'use client'
// footer
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NAV_LINKS = ['Home', 'About', 'How It Works', 'Experiences', 'Science', 'FAQ']
const LEGAL = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
]

// ── TextHoverEffect ──────────────────────────────────────────────────────────
const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string
  duration?: number
  className?: string
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' })

  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` })
    }
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn('select-none uppercase cursor-pointer', className)}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%"   stopColor="#FFD76A" />
              <stop offset="25%"  stopColor="#FF6B9D" />
              <stop offset="50%"  stopColor="#5DEBFF" />
              <stop offset="75%"  stopColor="#5DEBFF" />
              <stop offset="100%" stopColor="#8A6FFF" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: '50%', cy: '50%' }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: 'easeOut' }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Outline — fades in on hover */}
      <text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-600 font-[helvetica] text-7xl font-bold"
        style={{ opacity: hovered ? 0.7 : 0, transition: 'opacity 0.3s' }}
      >
        {text}
      </text>

      {/* Animated draw-on stroke */}
      <motion.text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#5DEBFF] font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      >
        {text}
      </motion.text>

      {/* Colour reveal on hover */}
      <text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#070707', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #5DEBFF22 100%)',
        }}
      />

      {/* Top section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center">
              <Image
                src="/images/logo.png"
                alt="MindPlayer logo"
                width={96}
                height={96}
                className="object-contain flex-shrink-0 translate-y-1"
                style={{ marginLeft: -30 }}
              />
              <span className="font-display text-lg font-semibold text-white select-none -ml-5">
                Mind<span style={{ color: '#5DEBFF' }}>Player</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#B8B8B8] max-w-[220px]">
              A mental state regulation platform designed for the future of human potential.
            </p>
            <a
              href="mailto:hello@mindplayer.com"
              className="mt-4 inline-block text-sm text-[#5DEBFF] hover:text-white transition-colors duration-200"
            >
              hello@mindplayer.com
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-xs tracking-[0.25em] uppercase text-[#B8B8B8]">Navigation</p>
            <nav className="space-y-3">
              {NAV_LINKS.map(link => (
                <button
                  key={link}
                  className="block text-sm text-[#B8B8B8] hover:text-white transition-colors duration-200"
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Early Access */}
          <div>
            <p className="mb-5 text-xs tracking-[0.25em] uppercase text-[#B8B8B8]">Stay Connected</p>
            <p className="mb-4 text-sm text-[#B8B8B8]">Be first to experience the future of mental performance.</p>
            <motion.a
              href="/early-access"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="block w-full rounded-full py-3 text-sm font-bold tracking-widest uppercase text-[#070707] text-center transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)',
                boxShadow: '0 0 24px rgba(93,235,255,0.25)',
              }}
            >
              Get Early Access
            </motion.a>
            <p className="mt-3 text-center text-[10px] text-[#B8B8B8]">No spam. Just early access.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p className="text-xs text-[#B8B8B8]">© 2026 Mind Player. All rights reserved.</p>

        <div className="flex items-center gap-6">
          {LEGAL.map(l => (
            <Link key={l.href} href={l.href} className="text-xs text-[#B8B8B8] hover:text-white transition-colors duration-200">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  )
}
