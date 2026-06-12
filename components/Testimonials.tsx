'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: "MindPlayer changed how I approach my work day. Within two weeks my focus sessions went from 20 minutes to over 90 minutes uninterrupted.",
    name: "Priya Sharma",
    designation: "Data Scientist at QuantumLeap",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
  },
  {
    quote: "The sleep sessions are on another level. I fall asleep faster and wake up actually feeling rested — something I haven't experienced in years.",
    name: "Marcus Johnson",
    designation: "Head of Operations at Synergy Corp",
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
  },
  {
    quote: "As an athlete, recovery is everything. MindPlayer's recovery protocols cut my mental fatigue in half and keep me sharp through back-to-back training days.",
    name: "Isabella Rossi",
    designation: "Professional Athlete",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
  },
  {
    quote: "I was skeptical at first but the science behind it is real. My cognitive performance scores improved measurably within the first month.",
    name: "Kenji Tanaka",
    designation: "Software Engineer at CodeCrafters",
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop",
  },
  {
    quote: "The emotional balance sessions helped me manage stress responses I didn't even know I had. It's like having a therapist and a performance coach in one.",
    name: "Fatima Al-Jamil",
    designation: "CFO at Apex Financial",
    src: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1887&auto=format&fit=crop",
  },
]

const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const handleNext = useCallback(() => {
    setActive(prev => (prev + 1) % TESTIMONIALS.length)
  }, [])

  const handlePrev = () => {
    setActive(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [handleNext])

  return (
    <section
      className="relative py-16 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0E1525 0%, #070707 100%)' }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-4 px-8 text-center"
      >
        <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#5DEBFF' }}>Testimonials</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
          The world is <span className="gradient-text">listening.</span>
        </h2>
      </motion.div>

      {/* Animated testimonials */}
      <div className="mx-auto max-w-sm px-4 py-16 md:max-w-4xl md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">

          {/* Image stack */}
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-full max-w-xs">
              <AnimatePresence>
                {TESTIMONIALS.map((t, index) => (
                  <motion.div
                    key={t.src}
                    initial={{ opacity: 0, scale: 0.9, y: 50, rotate: randomRotate() }}
                    animate={{
                      opacity: index === active ? 1 : 0.4,
                      scale: index === active ? 1 : 0.9,
                      y: index === active ? 0 : 20,
                      zIndex: index === active ? TESTIMONIALS.length : TESTIMONIALS.length - Math.abs(index - active),
                      rotate: index === active ? '0deg' : randomRotate(),
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: -50 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 origin-bottom"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.src}
                      alt={t.name}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover"
                      style={{ boxShadow: '0 0 40px rgba(93,235,255,0.12)' }}
                    />
                    <div
                      className="absolute inset-0 rounded-3xl"
                      style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.6) 0%, transparent 60%)' }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Text + controls */}
          <div className="flex flex-col justify-center py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 className="text-2xl font-bold text-white">
                  {TESTIMONIALS[active].name}
                </h3>
                <p className="text-sm mt-1" style={{ color: '#5DEBFF' }}>
                  {TESTIMONIALS[active].designation}
                </p>
                <p className="mt-8 text-lg leading-relaxed text-[#B8B8B8]">
                  &ldquo;{TESTIMONIALS[active].quote}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-4 pt-12">
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
                style={{ background: 'rgba(93,235,255,0.08)', border: '1px solid rgba(93,235,255,0.2)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(93,235,255,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(93,235,255,0.08)')}
              >
                <ArrowLeft className="h-5 w-5 text-[#5DEBFF] transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next"
                className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
                style={{ background: 'rgba(93,235,255,0.08)', border: '1px solid rgba(93,235,255,0.2)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(93,235,255,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(93,235,255,0.08)')}
              >
                <ArrowRight className="h-5 w-5 text-[#5DEBFF] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '24px' : '6px',
                    height: '6px',
                    background: i === active ? '#5DEBFF' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
