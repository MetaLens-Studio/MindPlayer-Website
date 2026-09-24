'use client'
// footer
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Science', href: '/science' },
  { label: 'FAQ', href: '/faq' },
]

const LEGAL = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
]

const SOCIALS = [
  {
    label: 'X',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
]

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
            'radial-gradient(125% 125% at 50% 8%, #0F0F1166 45%, #5DEBFF1f 100%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 pt-16 pb-8">
        {/* Brand */}
        <Image
          src="/images/mindplayer-logo-new.png"
          alt="MindPlayer logo"
          width={188}
          height={40}
          style={{ width: '188px', height: '40px', objectFit: 'contain' }}
        />
        <p className="mt-6 text-base leading-relaxed text-[#B8B8B8] max-w-sm">
          A mental state regulation platform designed for the future of human potential.
        </p>
        <a
          href="mailto:hello@mindplayer.com"
          className="mt-5 inline-flex items-center gap-2.5 text-base text-[#5DEBFF] hover:text-white transition-colors duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
            <path d="M3 6.5l9 6 9-6" />
          </svg>
          hello@mindplayer.com
        </a>

        {/* Navigation */}
        <p className="mt-12 mb-5 text-xs tracking-[0.25em] uppercase text-[#8A90A0]">Navigation</p>
        <nav className="grid grid-cols-2 grid-rows-3 grid-flow-col gap-x-8 gap-y-4">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between text-lg text-[#D5D9E2] hover:text-white transition-colors duration-200 border-b border-transparent"
            >
              <span>{link.label}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#5A6070] group-hover:text-[#5DEBFF] transition-colors duration-200" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-8 h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Early access CTA */}
        <motion.a
          href="/early-access"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-3 rounded-full py-4 text-sm font-bold tracking-[0.12em] uppercase text-[#070707] transition-shadow duration-300"
          style={{
            background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)',
            boxShadow: '0 0 28px rgba(93,235,255,0.30)',
          }}
        >
          Get Early Access
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </motion.a>
        <p className="mt-3 text-center text-sm text-[#8A90A0]">No spam. Just early access.</p>

        {/* Stay connected */}
        <p className="mt-12 mb-6 text-center text-xs tracking-[0.25em] uppercase text-[#8A90A0]">Stay Connected</p>
        <div className="flex items-center justify-center gap-8">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="text-[#9AA0AE] hover:text-white transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 mb-6 h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Bottom */}
        <p className="text-center text-sm text-[#8A90A0]">© 2026 Mind Player. All rights reserved.</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
          {LEGAL.map((l, i) => (
            <span key={l.href} className="flex items-center gap-x-3">
              <Link href={l.href} className="text-[#9AA0AE] hover:text-white transition-colors duration-200">
                {l.label}
              </Link>
              {i < LEGAL.length - 1 && <span className="text-[#3A3F4A]">|</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
