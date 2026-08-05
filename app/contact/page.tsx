'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.includes('@') || !form.email.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }
    if (form.message.trim().length < 10) {
      setError('Please enter a message (at least 10 characters).')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://formspree.io/f/xdabgvyk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full rounded-2xl px-5 py-3.5 text-sm text-white outline-none transition-all duration-200"
  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(93,235,255,0.2)',
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
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(93,235,255,0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 30% 70%, rgba(138,111,255,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Curvy line decorations */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path d="M-100 750 C 300 550, 600 800, 900 500 S 1300 200, 1600 450" fill="none" stroke="rgba(93,235,255,0.06)" strokeWidth="1.2" />
        <path d="M-100 400 C 200 200, 500 500, 800 300 S 1200 50, 1600 200" fill="none" stroke="rgba(138,111,255,0.05)" strokeWidth="1" />
        <path d="M1100 -50 C 1050 200, 1200 400, 1100 700" fill="none" stroke="rgba(93,235,255,0.04)" strokeWidth="0.9" />
      </svg>


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
              >
                {/* Pill */}
                <div className="flex justify-center mb-8">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
                    style={{ background: 'rgba(93,235,255,0.08)', border: '1px solid rgba(93,235,255,0.2)', color: '#5DEBFF' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DEBFF] animate-pulse" />
                    Get in Touch
                  </div>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4 text-center">
                  We&apos;d love to<br />
                  <span className="gradient-text">hear from you.</span>
                </h1>

                <p className="text-[#B8B8B8] text-lg leading-relaxed max-w-lg mx-auto mb-12 text-center">
                  Questions, partnerships, or just curious about MindPlayer? Drop us a message and we&apos;ll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.border = '1px solid rgba(93,235,255,0.5)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(93,235,255,0.2)')}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className={inputClass}
                      style={{
                        ...inputStyle,
                        border: error.includes('email') ? '1px solid rgba(255,107,157,0.6)' : inputStyle.border,
                      }}
                      onFocus={e => (e.currentTarget.style.border = '1px solid rgba(93,235,255,0.5)')}
                      onBlur={e => (e.currentTarget.style.border = error.includes('email') ? '1px solid rgba(255,107,157,0.6)' : '1px solid rgba(93,235,255,0.2)')}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      className={inputClass + ' resize-none'}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.border = '1px solid rgba(93,235,255,0.5)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(93,235,255,0.2)')}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm" style={{ color: '#FF6B9D' }}>{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-full rounded-full py-4 text-sm font-bold tracking-wide text-[#070707] transition-opacity"
                    style={{
                      background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)',
                      boxShadow: '0 0 28px rgba(93,235,255,0.25)',
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? 'Sending…' : 'Send Message'}
                  </motion.button>
                </form>

                <p className="text-xs text-[#606060] text-center mt-6">
                  We typically reply within 24–48 hours.
                </p>
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
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
                  style={{ background: 'rgba(93,235,255,0.10)', border: '1px solid rgba(93,235,255,0.25)' }}
                >
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M8 18L15 25L28 11" stroke="#5DEBFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
                  Message sent.
                </h2>
                <p className="text-[#B8B8B8] text-lg max-w-md mx-auto mb-4">
                  Thanks, <span className="text-white font-medium">{form.name}</span>. We&apos;ll get back to you at{' '}
                  <span className="text-white font-medium">{form.email}</span>.
                </p>
                <p className="text-[#606060] text-sm mb-12">
                  Expect a reply within 24–48 hours.
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
