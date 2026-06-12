'use client'
import { useEffect, useRef } from 'react'

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const dpr = Math.min(window.devicePixelRatio, 2)

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', () => { ctx.resetTransform(); resize() }, { passive: true })

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    // ── Stars ──────────────────────────────────────────────────────────────────
    type Star = { x: number; y: number; r: number; alpha: number; speed: number; phase: number; color: string }
    const STAR_COLORS = ['#ffffff', '#c8e8ff', '#d4c8ff', '#5DEBFF', '#8A6FFF', '#FFD76A']
    const stars: Star[] = Array.from({ length: 280 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.012 + 0.004,
      phase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }))

    // Larger bright stars with glow
    type GlowStar = { x: number; y: number; r: number; phase: number; color: string }
    const glowStars: GlowStar[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: Math.random() * 2 + 1.2,
      phase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }))

    // ── Nebula clouds ──────────────────────────────────────────────────────────
    type Nebula = { x: number; y: number; rx: number; ry: number; color: string; alpha: number; drift: number; phase: number }
    const nebulas: Nebula[] = [
      { x: 0.15, y: 0.2,  rx: 0.35, ry: 0.28, color: '#5DEBFF', alpha: 0.055, drift: 0.00008, phase: 0 },
      { x: 0.75, y: 0.6,  rx: 0.32, ry: 0.30, color: '#8A6FFF', alpha: 0.065, drift: 0.00006, phase: 1.4 },
      { x: 0.5,  y: 0.85, rx: 0.28, ry: 0.22, color: '#FF6B9D', alpha: 0.04,  drift: 0.00009, phase: 2.8 },
      { x: 0.88, y: 0.15, rx: 0.22, ry: 0.20, color: '#FFD76A', alpha: 0.035, drift: 0.00007, phase: 0.7 },
    ]

    // ── Shooting stars ─────────────────────────────────────────────────────────
    type Shoot = { x: number; y: number; len: number; angle: number; speed: number; life: number; maxLife: number; color: string }
    let shooters: Shoot[] = []
    let nextShoot = Date.now() + 2000 + Math.random() * 3000

    const spawnShooter = () => {
      const colors = ['#ffffff', '#5DEBFF', '#8A6FFF']
      shooters.push({
        x: Math.random() * W() * 0.7,
        y: Math.random() * H() * 0.4,
        len: 80 + Math.random() * 120,
        angle: Math.PI / 5 + Math.random() * 0.3,
        speed: 6 + Math.random() * 5,
        life: 0,
        maxLife: 40 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
      nextShoot = Date.now() + 2500 + Math.random() * 4000
    }

    // ── Draw loop ──────────────────────────────────────────────────────────────
    let t = 0
    const draw = () => {
      const w = W(), h = H()
      ctx.clearRect(0, 0, w, h)

      // Deep space gradient base
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0,   '#05080f')
      bg.addColorStop(0.4, '#080c18')
      bg.addColorStop(1,   '#040608')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Nebula clouds
      for (const n of nebulas) {
        const pulse = Math.sin(t * n.drift * 1000 + n.phase) * 0.012
        const grd = ctx.createRadialGradient(
          n.x * w, n.y * h, 0,
          n.x * w, n.y * h, n.rx * w
        )
        grd.addColorStop(0,   hexToRgba(n.color, n.alpha + pulse))
        grd.addColorStop(0.5, hexToRgba(n.color, (n.alpha + pulse) * 0.4))
        grd.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.save()
        ctx.scale(1, n.ry / n.rx)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(n.x * w, (n.y * h) * (n.rx / n.ry), n.rx * w, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // Regular stars — twinkle
      for (const s of stars) {
        const alpha = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 60 + s.phase))
        ctx.globalAlpha = alpha
        ctx.fillStyle = s.color
        ctx.shadowBlur = s.r > 1 ? 4 : 0
        ctx.shadowColor = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Glow stars — breathe
      for (const g of glowStars) {
        const breathe = 0.5 + 0.5 * Math.sin(t * 0.4 + g.phase)
        ctx.globalAlpha = 0.55 + 0.45 * breathe
        ctx.shadowBlur = 10 + breathe * 14
        ctx.shadowColor = g.color
        ctx.fillStyle = g.color
        ctx.beginPath()
        ctx.arc(g.x, g.y, g.r * (0.85 + 0.15 * breathe), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

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

        // Head sparkle
        ctx.globalAlpha = alpha * 0.85
        ctx.fillStyle = '#fff'
        ctx.shadowBlur = 8
        ctx.shadowColor = s.color
        ctx.beginPath()
        ctx.arc(headX, headY, 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed * 0.6
        s.life++
      }

      ctx.globalAlpha = 1
      t += 0.016
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
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
