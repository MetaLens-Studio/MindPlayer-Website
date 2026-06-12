'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Experiences',  href: '/experiences' },
  { label: 'Science',      href: '/science' },
  { label: 'FAQ',          href: '/faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div className={`mx-auto mt-4 max-w-7xl px-6 transition-all duration-300 ${scrolled ? 'mt-2' : ''}`}>
          <div className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${scrolled ? 'glass' : ''}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="MindPlayer logo"
                width={96}
                height={96}
                className="object-contain flex-shrink-0 translate-y-1"
                priority
              />
              <span className="font-display text-white text-lg font-semibold tracking-wide select-none -ml-5">
                Mind<span style={{ color: '#5DEBFF' }}>Player</span>
              </span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV.map(({ label, href }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200"
                    style={{ color: active ? '#5DEBFF' : '#B8B8B8' }}
                  >
                    {label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                        style={{ background: '#5DEBFF' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* CTA */}
            <Link
              href="/faq"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(93,235,255,0.12), rgba(138,111,255,0.12))',
                border: '1px solid rgba(93,235,255,0.28)',
                color: '#5DEBFF',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg,rgba(93,235,255,0.22),rgba(138,111,255,0.22))')}
              onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(93,235,255,0.12), rgba(138,111,255,0.12))')}
            >
              Get Early Access
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                className="block h-px w-6 bg-white origin-center" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block h-px w-6 bg-white" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                className="block h-px w-6 bg-white origin-center" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
        style={{ background: 'rgba(7,7,7,0.96)', backdropFilter: 'blur(16px)' }}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV.map(({ label, href }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }}
              transition={{ delay: menuOpen ? i * 0.07 : 0 }}
            >
              <Link
                href={href}
                className="font-display text-3xl font-bold transition-colors duration-200"
                style={{ color: pathname === href ? '#5DEBFF' : 'white' }}
              >
                {label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ delay: menuOpen ? 0.42 : 0 }}
          >
            <Link
              href="/faq"
              className="mt-4 block rounded-full px-8 py-3 text-sm font-bold tracking-widest uppercase text-[#070707]"
              style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)' }}
            >
              Get Early Access
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </>
  )
}
