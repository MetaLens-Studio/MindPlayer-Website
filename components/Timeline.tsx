'use client'
import { motion } from 'framer-motion'

const NODES = [
  { step: '01', label: 'Discover',  desc: 'Your journey begins with a single spark of curiosity.',   color: '#5DEBFF' },
  { step: '02', label: 'Explore',   desc: 'Dive into boundless digital dimensions, unlimited.',        color: '#8A6FFF' },
  { step: '03', label: 'Connect',   desc: 'Link minds, worlds, and ideas across space and time.',      color: '#FFD76A' },
  { step: '04', label: 'Transform', desc: 'Evolve beyond what you thought was humanly possible.',      color: '#FF6B9D' },
]

export default function Timeline() {
  return (
    <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: '#070707' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 md:mb-24 px-6 md:px-8 text-center"
      >
        <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#FFD76A' }}>Your Journey</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
          The Experience <span className="gradient-text">Path</span>
        </h2>
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* Connecting beam — desktop only */}
        <div className="absolute hidden lg:block top-10 left-[12%] right-[12%] h-px"
          style={{ background: 'linear-gradient(90deg, #5DEBFF44, #8A6FFF44, #FFD76A44, #FF6B9D44)' }}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14">
          {NODES.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.18 }}
              className="flex flex-col items-center text-center"
            >
              {/* Pulsing node */}
              <motion.div
                className="relative mb-10 flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background: `radial-gradient(circle, ${n.color}22, transparent 70%)`,
                  border: `1px solid ${n.color}55`,
                }}
                whileHover={{ scale: 1.18 }}
                animate={{ boxShadow: [`0 0 18px ${n.color}20`, `0 0 40px ${n.color}45`, `0 0 18px ${n.color}20`] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              >
                <span className="font-display text-xl font-black" style={{ color: n.color }}>{n.step}</span>

                {/* Outer pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1px solid ${n.color}30` }}
                  animate={{ scale: [1, 1.55, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
                />
              </motion.div>

              <h3 className="mb-3 font-display text-xl font-bold text-white">{n.label}</h3>
              <p className="text-sm leading-relaxed text-[#B8B8B8]">{n.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
