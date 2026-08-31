'use client'
import { useEffect, useState, ReactNode } from 'react'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Science', href: '/science' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

/**
 * When the reload-loop breaker (in layout <head>) detects repeated native
 * renderer crashes, it sets data-safe-mode on <html>. This component then
 * UNMOUNTS the entire heavy app (framer-motion, canvases, observers, images)
 * and renders a plain, static, zero-effect page so iOS Safari can survive.
 */
export default function SafeModeShell({ children }: { children: ReactNode }) {
  const [safe, setSafe] = useState(false)

  useEffect(() => {
    // Runs after hydration — flipping to true unmounts `children` and frees memory.
    if (document.documentElement.hasAttribute('data-safe-mode')) setSafe(true)
  }, [])

  if (!safe) return <>{children}</>

  return (
    <div style={{ minHeight: '100vh', background: '#070707', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.02em', marginBottom: 8 }}>
          MindPlayer
        </div>
        <p style={{ color: '#9aa', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
          Lightweight mode is on because the full site kept crashing on your browser.
          The content is all still here below.
        </p>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 32 }}>
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                display: 'block', padding: '14px 16px', borderRadius: 10,
                background: 'rgba(255,255,255,0.05)', color: '#fff',
                textDecoration: 'none', fontSize: 16, fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => {
            try { localStorage.removeItem('_mp_loads') } catch {}
            try { document.documentElement.removeAttribute('data-safe-mode') } catch {}
            location.reload()
          }}
          style={{
            background: 'linear-gradient(135deg,#5DEBFF,#8A6FFF)', color: '#070707',
            border: 'none', padding: '12px 20px', borderRadius: 999,
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}
        >
          Try the full site again
        </button>
      </div>
    </div>
  )
}
