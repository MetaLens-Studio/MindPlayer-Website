'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SCENES = [
  { title: 'Virtual Presence',    desc: 'Be anywhere. Feel everything.',        color: '#5DEBFF', num: '01', symbol: '⬡' },
  { title: 'Digital Worlds',      desc: 'Environments that breathe.',            color: '#8A6FFF', num: '02', symbol: '◈' },
  { title: 'Mixed Reality',       desc: 'Two worlds. One perfect moment.',       color: '#FFD76A', num: '03', symbol: '◎' },
  { title: 'AI Companions',       desc: 'Intelligence with real empathy.',       color: '#FF6B9D', num: '04', symbol: '✦' },
  { title: 'Spatial Audio',       desc: 'Sound that exists in space.',           color: '#5DEBFF', num: '05', symbol: '◉' },
]

export default function SpatialSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%'])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '300vh', background: 'linear-gradient(180deg, #070707 0%, #0E1525 50%, #070707 100%)' }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 px-8 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#8A6FFF' }}>The Future</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
            The Future Is <span className="gradient-text">Spatial</span>
          </h2>
        </motion.div>

        <div className="overflow-hidden pl-8">
          <motion.div ref={trackRef} style={{ x, width: 'max-content' }} className="flex gap-6">
            {SCENES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="group relative flex-shrink-0 h-[420px] w-[360px] overflow-hidden rounded-3xl glass-card"
                style={{ border: `1px solid ${s.color}18` }}
              >
                {/* Gradient bg */}
                <div
                  className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% -10%, ${s.color}, transparent 65%)` }}
                />

                {/* Number */}
                <span
                  className="absolute top-7 right-7 font-display text-7xl font-black opacity-8"
                  style={{ color: s.color, opacity: 0.08 }}
                >
                  {s.num}
                </span>

                {/* Symbol */}
                <div
                  className="absolute top-10 left-10 text-5xl leading-none"
                  style={{ color: s.color, filter: `drop-shadow(0 0 18px ${s.color})` }}
                >
                  {s.symbol}
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-[#B8B8B8]">{s.desc}</p>
                  <div className="mt-5 h-px w-12 rounded-full" style={{ background: s.color }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
