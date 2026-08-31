'use client'
import { motion } from 'framer-motion'

export default function VisionSection() {
  return (
    <section
      className="relative py-16 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0E1525 0%, #070707 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left – simple fade-in text (no scroll-driven motion values) */}
        <div className="space-y-8 md:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              We don&apos;t build applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight gradient-text">
              We build experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-[#B8B8B8] text-base md:text-xl leading-relaxed max-w-md">
              Experiences that reshape how people learn, connect, and imagine.
              Every interaction is a step toward the limitless.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {(['#5DEBFF', '#8A6FFF', '#FFD76A'] as const).map((c, i) => (
                <div key={i} className="h-1 rounded-full" style={{ width: i === 0 ? 40 : i === 1 ? 24 : 16, background: c }} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right – CSS-animated orb (no framer-motion scroll tracking) */}
        <div className="hidden sm:flex items-center justify-center h-[320px] md:h-[440px]">
          <div className="relative w-52 h-52 md:w-72 md:h-72">
            {/* Outer spinning ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(93,235,255,0.25)', animation: 'orbSpin1 12s linear infinite' }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{ background: '#5DEBFF', boxShadow: '0 0 12px #5DEBFF' }} />
            </div>

            {/* Middle spinning ring */}
            <div
              className="absolute inset-8 rounded-full"
              style={{ border: '1px solid rgba(138,111,255,0.35)', animation: 'orbSpin2 8s linear infinite' }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                style={{ background: '#8A6FFF', boxShadow: '0 0 10px #8A6FFF' }} />
            </div>

            {/* Core */}
            <div
              className="absolute inset-16 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(93,235,255,0.25) 0%, rgba(138,111,255,0.15) 50%, transparent 70%)',
                boxShadow: '0 0 60px rgba(93,235,255,0.3), 0 0 120px rgba(138,111,255,0.2)',
              }}
            >
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 12C24 12 16 20 16 29C16 33.5 18 37.5 21 40C18 41.5 16 44.5 16 48C16 53.5 20.5 58 26 58C27.2 58 28.3 57.8 29.3 57.4C31.3 60.5 33 62 35 62C37 62 38.7 60.5 40.7 57.4C41.7 57.8 42.8 58 44 58C49.5 58 54 53.5 54 48C54 44.5 52 41.5 49 40C52 37.5 54 33.5 54 29C54 20 46 12 35 12Z"
                  stroke="#5DEBFF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M35 12C35 22 30 27 35 38C40 27 35 22 35 12" stroke="#8A6FFF" strokeWidth="1" fill="none" opacity="0.7"/>
                <path d="M20 30 Q28 26 35 30 Q42 34 50 30" stroke="#FFD76A" strokeWidth="0.8" fill="none" opacity="0.5"/>
                <circle cx="26" cy="32" r="2.5" fill="#5DEBFF" opacity="0.7"/>
                <circle cx="44" cy="32" r="2.5" fill="#8A6FFF" opacity="0.7"/>
                <circle cx="35" cy="46" r="2.5" fill="#FFD76A" opacity="0.7"/>
              </svg>
            </div>

            {/* Gold ring outermost */}
            <div
              className="absolute -inset-6 rounded-full"
              style={{ border: '1px solid rgba(255,215,106,0.12)', animation: 'orbPulse 4s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
