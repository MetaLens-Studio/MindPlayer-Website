'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function EarlyAccessPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('https://formspree.io/f/xzdorqkv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: '#070707' }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(93,235,255,0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 70% 70%, rgba(138,111,255,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Curvy line decorations */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path d="M-100 750 C 300 550, 600 800, 900 500 S 1300 200, 1600 450" fill="none" stroke="rgba(93,235,255,0.07)" strokeWidth="1.2" />
        <path d="M-100 400 C 200 200, 500 500, 800 300 S 1200 50, 1600 200" fill="none" stroke="rgba(138,111,255,0.06)" strokeWidth="1" />
        <path d="M400 -50 C 350 200, 200 400, 300 700 S 250 900, 150 950" fill="none" stroke="rgba(93,235,255,0.05)" strokeWidth="0.9" />
      </svg>

      {/* Back link */}
      <div className="relative z-10 px-6 md:px-12 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#B8B8B8] hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to MindPlayer
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl mx-auto">

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                {/* Pill */}
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase"
                  style={{ background: 'rgba(93,235,255,0.08)', border: '1px solid rgba(93,235,255,0.2)', color: '#5DEBFF' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5DEBFF] animate-pulse" />
                  Limited Early Access
                </div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                  Be first to experience<br />
                  <span className="gradient-text">a limitless mind.</span>
                </h1>

                <p className="text-[#B8B8B8] text-lg leading-relaxed max-w-lg mx-auto mb-12">
                  MindPlayer is launching soon. Join the waitlist and get exclusive early access before anyone else.
                </p>

                {/* Email form */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="Enter your email"
                    className="flex-1 rounded-full px-5 py-3.5 text-sm text-white outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: error ? '1px solid rgba(255,107,157,0.6)' : '1px solid rgba(93,235,255,0.2)',
                    }}
                    onFocus={e => (e.currentTarget.style.border = '1px solid rgba(93,235,255,0.5)')}
                    onBlur={e => (e.currentTarget.style.border = error ? '1px solid rgba(255,107,157,0.6)' : '1px solid rgba(93,235,255,0.2)')}
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full px-6 py-3.5 text-sm font-bold tracking-wide text-[#070707] whitespace-nowrap transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)', opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? 'Joining…' : 'Join Waitlist'}
                  </button>
                </form>

                {error && (
                  <p className="text-sm mb-8" style={{ color: '#FF6B9D' }}>{error}</p>
                )}

                <p className="text-xs text-[#606060]">No spam. No credit card. Unsubscribe anytime.</p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                {/* Success checkmark */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
                  style={{ background: 'rgba(93,235,255,0.10)', border: '1px solid rgba(93,235,255,0.25)' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M8 18L15 25L28 11" stroke="#5DEBFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
                  You're on the list.
                </h2>
                <p className="text-[#B8B8B8] text-lg max-w-md mx-auto mb-4">
                  We'll reach out to <span className="text-white font-medium">{email}</span> when early access opens.
                </p>
                <p className="text-[#606060] text-sm mb-12">
                  Keep an eye on your inbox — something exciting is coming.
                </p>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[#070707] transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)' }}
                >
                  Explore MindPlayer
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  )
}
