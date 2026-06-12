'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CTASection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const COLORS = ['#5DEBFF','#8A6FFF','#FFD76A']
    const COUNT = 55 // reduced from 120

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.5 - 0.1,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        p.opacity += (Math.random() - 0.5) * 0.012
        p.opacity = Math.max(0.05, Math.min(0.65, p.opacity))
        if (p.y < -5) p.y = canvas.height + 5
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        ctx.globalAlpha = p.opacity
        ctx.fillStyle   = p.color
        ctx.shadowBlur  = 6
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section
      className="relative flex min-h-[65vh] items-center justify-center overflow-hidden"
      style={{ background:'linear-gradient(180deg, #070707 0%, #0E1525 50%, #070707 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ willChange:'auto' }} />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div style={{
          width:600, height:600, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(93,235,255,0.08) 0%, rgba(138,111,255,0.05) 40%, transparent 70%)',
        }} />
      </div>

      <div className="relative z-10 px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-60px' }}
          transition={{ duration:0.7 }}
        >
          <p className="mb-6 text-xs tracking-[0.35em] uppercase" style={{ color:'#5DEBFF' }}>Begin</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black leading-none text-white">
            Ready to Expand<br />
            <span className="gradient-text">Your Reality?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-[#B8B8B8]">
            The next evolution of human experience is waiting. Step into it.
          </p>

          <motion.button
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:0.97 }}
            transition={{ type:'spring', stiffness:400, damping:20 }}
            className="mt-12 rounded-full px-14 py-5 font-display text-lg font-black tracking-[0.18em] uppercase text-[#070707]"
            style={{
              background:'linear-gradient(135deg, #5DEBFF, #8A6FFF)',
              boxShadow:'0 0 40px rgba(93,235,255,0.3)',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow='0 0 70px rgba(93,235,255,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow='0 0 40px rgba(93,235,255,0.3)')}
          >
            Join The Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
