'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Node { x:number; y:number; vx:number; vy:number; r:number; color:string }
const COLORS = ['#5DEBFF','#8A6FFF','#FFD76A','#FF6B9D']

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x:-9999, y:-9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let nodes: Node[] = []
    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 12 : 38
    const MAX_DIST = isMobile ? 70 : 130
    const FPS_INTERVAL = isMobile ? 66 : 0 // ~15fps on mobile, uncapped on desktop
    let lastTime = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouse.current = { x: t.clientX - rect.left, y: t.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMove, { passive: true })
    canvas.addEventListener('mouseleave', () => { mouse.current = { x:-9999, y:-9999 } })
    canvas.addEventListener('touchmove', onTouch, { passive: true })
    canvas.addEventListener('touchend', () => { mouse.current = { x:-9999, y:-9999 } })

    const draw = (now: number) => {
      if (!paused) raf = requestAnimationFrame(draw)
      if (FPS_INTERVAL && now - lastTime < FPS_INTERVAL) return
      lastTime = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const n of nodes) {
        const dx = mouse.current.x - n.x
        const dy = mouse.current.y - n.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 120) { n.vx += dx * 0.0005; n.vy += dy * 0.0005 }
        n.vx *= 0.988; n.vy *= 0.988
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  { n.vx *= -1; n.x = Math.max(0, Math.min(canvas.width,  n.x)) }
        if (n.y < 0 || n.y > canvas.height) { n.vy *= -1; n.y = Math.max(0, Math.min(canvas.height, n.y)) }
      }

      // Connections — only check pairs within rough distance (skip heavy sqrt for all)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx*dx + dy*dy
          if (d2 < MAX_DIST * MAX_DIST) {
            const d = Math.sqrt(d2)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(93,235,255,${(1 - d / MAX_DIST) * 0.25})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Nodes — skip shadowBlur on mobile (expensive)
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        if (!isMobile) { ctx.shadowBlur = 8; ctx.shadowColor = n.color }
        ctx.fill()
        if (!isMobile) ctx.shadowBlur = 0
      }

    }

    let paused = false

    const onVisibility = () => {
      if (document.hidden) { paused = true; cancelAnimationFrame(raf) }
      else { paused = false; raf = requestAnimationFrame(draw) }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (paused) { paused = false; raf = requestAnimationFrame(draw) }
      } else { paused = true; cancelAnimationFrame(raf) }
    }, { rootMargin: '200px' })
    io.observe(canvas)

    raf = requestAnimationFrame(draw)

    return () => {
      paused = true
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="science" className="relative py-16 md:py-32 overflow-hidden"
      style={{ background:'linear-gradient(180deg, #070707 0%, #0E1525 100%)' }}>
      <motion.div
        initial={{ opacity:0, y:24 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:'-80px' }}
        transition={{ duration:0.6 }}
        className="relative z-10 mb-12 px-4 md:px-8 text-center"
      >
        <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color:'#5DEBFF' }}>Intelligence</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
          Your Neural <span className="gradient-text">Network</span>
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-[#B8B8B8]">
          Move your cursor. Watch intelligence respond and connect.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity:0, scale:0.97 }}
        whileInView={{ opacity:1, scale:1 }}
        viewport={{ once:true, margin:'-80px' }}
        transition={{ duration:0.5 }}
        className="relative mx-2 md:mx-8 h-[280px] md:h-[380px] overflow-hidden rounded-3xl"
        style={{ background:'rgba(14,21,37,0.5)', border:'1px solid rgba(93,235,255,0.07)' }}
      >
        <canvas ref={canvasRef} className="h-full w-full" style={{ willChange:'auto' }} />
        <div className="pointer-events-none absolute inset-0"
          style={{ background:'radial-gradient(ellipse at center, transparent 40%, rgba(7,7,7,0.6) 100%)' }} />
      </motion.div>
    </section>
  )
}
