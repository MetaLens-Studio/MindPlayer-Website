'use client'
import { useEffect, useRef } from 'react'

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    // Cap at 1× — it's a background, Retina res wastes GPU for zero visual gain
    const dpr = 1

    let cachedBg: CanvasGradient | null = null

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      cachedBg = null // invalidate cached gradient on resize
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    // ── Stars — reduced count, split into two buckets ──────────────────────
    type Star = { x: number; y: number; r: number; alpha: number; speed: number; phase: number; color: string; large: boolean }
    const STAR_COLORS = ['#ffffff', '#c8e8ff', '#d4c8ff', '#5DEBFF', '#8A6FFF', '#FFD76A']
    const stars: Star[] = Array.from({ length: 140 }, () => {
      const r = Math.random() * 1.4 + 0.2
      return {
        x: Math.random() * W(),
        y: Math.random() * H(),
        r,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.01 + 0.003,
        phase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        large: r > 1,
      }
    })

    // Split buckets upfront — avoids per-frame branching
    const smallStars = stars.filter(s => !s.large)
    const largeStars = stars.filter(s => s.large)

    // ── Glow stars — reduced to 8, drawn with a single shared blur value ───
    type GlowStar = { x: number; y: number; r: number; phase: number; color: string }
    const glowStars: GlowStar[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: Math.random() * 2 + 1.2,
      phase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }))

    // ── Nebulas — reduced to 2, gradients recreated only when t crosses steps ─
    type Nebula = { x: number; y: number; rx: number; ry: number; color: string; alpha: number }
    const nebulas: Nebula[] = [
      { x: 0.15, y: 0.3, rx: 0.32, ry: 0.26, color: '#5DEBFF', alpha: 0.05 },
      { x: 0.78, y: 0.6, rx: 0.30, ry: 0.28, color: '#8A6FFF', alpha: 0.06 },
    ]
    // Pre-build nebula gradients — only rebuild on resize
    let nebulaGrds: CanvasGradient[] = []
    const buildNebulaGrds = () => {
      const w = W(), h = H()
      nebulaGrds = nebulas.map(n => {
        const grd = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, n.rx * w)
        grd.addColorStop(0,   hexToRgba(n.color, n.alpha))
        grd.addColorStop(0.5, hexToRgba(n.color, n.alpha * 0.35))
        grd.addColorStop(1,   'rgba(0,0,0,0)')
        return grd
      })
    }
    buildNebulaGrds()
    window.addEventListener('resize', buildNebulaGrds, { passive: true })

    // ── Shooting stars ─────────────────────────────────────────────────────
    type Shoot = { x: number; y: number; len: number; angle: number; speed: number; life: number; maxLife: number; color: string }
    let shooters: Shoot[] = []
    let nextShoot = Date.now() + 3000 + Math.random() * 4000

    const spawnShooter = () => {
      shooters.push({
        x: Math.random() * W() * 0.7,
        y: Math.random() * H() * 0.4,
        len: 80 + Math.random() * 100,
        angle: Math.PI / 5 + Math.random() * 0.3,
        speed: 6 + Math.random() * 4,
        life: 0,
        maxLife: 40 + Math.random() * 20,
        color: ['#ffffff', '#5DEBFF', '#8A6FFF'][Math.floor(Math.random() * 3)],
      })
      nextShoot = Date.now() + 3000 + Math.random() * 5000
    }

    // ── Draw loop — throttled to ~30 fps ──────────────────────────────────
    let t = 0
    let lastTime = 0
    const draw = (now: number) => {
      if (!paused) raf = requestAnimationFrame(draw)
      if (now - lastTime < 33) return // ~30 fps cap
      lastTime = now

      const w = W(), h = H()
      ctx.clearRect(0, 0, w, h)

      // Background gradient — cached, rebuilt only after resize
      if (!cachedBg) {
        cachedBg = ctx.createLinearGradient(0, 0, 0, h)
        cachedBg.addColorStop(0,   '#05080f')
        cachedBg.addColorStop(0.4, '#080c18')
        cachedBg.addColorStop(1,   '#040608')
      }
      ctx.fillStyle = cachedBg
      ctx.fillRect(0, 0, w, h)

      // Nebula clouds — static gradients, no shadowBlur
      ctx.shadowBlur = 0
      for (let i = 0; i < nebulas.length; i++) {
        const n = nebulas[i]
        ctx.save()
        ctx.scale(1, n.ry / n.rx)
        ctx.fillStyle = nebulaGrds[i]
        ctx.beginPath()
        ctx.arc(n.x * w, (n.y * h) * (n.rx / n.ry), n.rx * w, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // Small stars — NO shadowBlur (single state, batch draw)
      ctx.shadowBlur = 0
      for (const s of smallStars) {
        const alpha = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 60 + s.phase))
        ctx.globalAlpha = alpha
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Large stars — single shared shadowBlur value (set once)
      ctx.shadowBlur = 4
      for (const s of largeStars) {
        const alpha = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 60 + s.phase))
        ctx.globalAlpha = alpha
        ctx.fillStyle = s.color
        ctx.shadowColor = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Glow stars — single shared shadowBlur, only alpha varies per star
      ctx.shadowBlur = 12
      for (const g of glowStars) {
        const breathe = 0.5 + 0.5 * Math.sin(t * 0.4 + g.phase)
        ctx.globalAlpha = 0.55 + 0.45 * breathe
        ctx.fillStyle = g.color
        ctx.shadowColor = g.color
        ctx.beginPath()
        ctx.arc(g.x, g.y, g.r * (0.85 + 0.15 * breathe), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      // Shooting stars
      if (Date.now() > nextShoot) spawnShooter()
      shooters = shooters.filter(s => s.life < s.maxLife)
      for (const s of shooters) {
        const progress = s.life / s.maxLife
        const alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7
        const tailX = s.x - Math.cos(s.angle) * s.len * progress
        const tailY = s.y + Math.sin(s.angle) * s.len * progress
        const headX = tailX + Math.cos(s.angle) * s.len * 0.18
        const headY = tailY - Math.sin(s.angle) * s.len * 0.18

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY)
        grad.addColorStop(0, 'rgba(255,255,255,0)')
        grad.addColorStop(1, hexToRgba(s.color, alpha * 0.9))

        ctx.globalAlpha = 1
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(headX, headY)
        ctx.stroke()

        ctx.globalAlpha = alpha * 0.85
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(headX, headY, 1.5, 0, Math.PI * 2)
        ctx.fill()

        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed * 0.6
        s.life++
      }

      ctx.globalAlpha = 1
      t += 0.016
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
      window.removeEventListener('resize', buildNebulaGrds)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
