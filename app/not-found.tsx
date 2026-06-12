import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: '#070707' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(93,235,255,0.05) 0%, transparent 70%)',
        }}
      />

      <p className="relative mb-4 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>
        404
      </p>
      <h1 className="relative font-display text-5xl sm:text-7xl font-black text-white mb-6 leading-tight">
        Lost in space.
      </h1>
      <p className="relative text-[#B8B8B8] text-lg max-w-md mb-10">
        This page doesn&apos;t exist — but your best mental state does. Let&apos;s find it.
      </p>
      <Link
        href="/"
        className="relative inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-sm text-[#070707] transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)' }}
      >
        Back to MindPlayer
      </Link>
    </div>
  )
}
