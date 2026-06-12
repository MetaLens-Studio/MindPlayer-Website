'use client'
import { useEffect, useRef } from 'react'

export default function ScienceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const paint = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      // Use parent dimensions so we get full viewport size even before canvas lays out
      const parent = canvas.parentElement
      const W = parent ? parent.offsetWidth  : window.innerWidth
      const H = parent ? parent.offsetHeight : window.innerHeight
      if (!W || !H) { requestAnimationFrame(paint); return }
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      draw(ctx, W, H)
    }

    requestAnimationFrame(paint)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  )
}

function draw(ctx: CanvasRenderingContext2D, W: number, H: number) {
  // ── Base gradient ────────────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0,   '#060a14')
  bg.addColorStop(0.5, '#080d1a')
  bg.addColorStop(1,   '#050709')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // ── Colour atmosphere blobs (static) ────────────────────────────────────────
  const blobs: { x: number; y: number; r: number; rgb: [number,number,number]; a: number }[] = [
    { x: 0.10, y: 0.15, r: 0.42, rgb: [93,  235, 255], a: 0.20 },
    { x: 0.48, y: 0.32, r: 0.38, rgb: [138, 111, 255], a: 0.24 },
    { x: 0.82, y: 0.22, r: 0.32, rgb: [138, 111, 255], a: 0.14 },
    { x: 0.68, y: 0.72, r: 0.30, rgb: [255, 215, 106], a: 0.11 },
    { x: 0.18, y: 0.78, r: 0.28, rgb: [93,  235, 255], a: 0.13 },
    { x: 0.92, y: 0.62, r: 0.26, rgb: [255, 107, 157], a: 0.09 },
  ]
  for (const b of blobs) {
    const [r, g, bl] = b.rgb
    const grd = ctx.createRadialGradient(b.x*W, b.y*H, 0, b.x*W, b.y*H, b.r*W)
    grd.addColorStop(0,   `rgba(${r},${g},${bl},${b.a})`)
    grd.addColorStop(0.5, `rgba(${r},${g},${bl},${b.a * 0.35})`)
    grd.addColorStop(1,   `rgba(${r},${g},${bl},0)`)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, W, H)
  }

  // ── Hexagonal molecular grid ─────────────────────────────────────────────────
  const R   = Math.max(26, Math.min(38, W / 32))   // hex circumradius, responsive
  const hexW = R * Math.sqrt(3)
  const hexH = R * 2
  const cols = Math.ceil(W / hexW) + 2
  const rows = Math.ceil(H / (hexH * 0.75)) + 2

  // Seed random for reproducible nodes
  let seed = 42
  const rand = () => { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646 }

  const nodes: { x: number; y: number; rgb: [number,number,number] }[] = []

  ctx.strokeStyle = 'rgba(93,235,255,0.18)'
  ctx.lineWidth   = 1.0

  for (let row = -1; row <= rows; row++) {
    for (let col = -1; col <= cols; col++) {
      const cx = col * hexW + (row % 2 === 0 ? 0 : hexW / 2)
      const cy = row * R * 1.5
      drawHex(ctx, cx, cy, R - 0.5)

      // Collect a random ~8% of centres as atom nodes
      if (rand() < 0.08) {
        const pick = rand()
        const rgb: [number,number,number] =
          pick < 0.50 ? [93, 235, 255] :
          pick < 0.80 ? [138, 111, 255] :
                        [255, 215, 106]
        nodes.push({ x: cx, y: cy, rgb })
      }
    }
  }

  // ── Atom nodes ───────────────────────────────────────────────────────────────
  for (const n of nodes) {
    const [r, g, b] = n.rgb
    // Outer glow halo
    const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 10)
    glow.addColorStop(0,   `rgba(${r},${g},${b},0.55)`)
    glow.addColorStop(0.45,`rgba(${r},${g},${b},0.18)`)
    glow.addColorStop(1,   `rgba(${r},${g},${b},0)`)
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(n.x, n.y, 10, 0, Math.PI * 2)
    ctx.fill()
    // Bright core
    ctx.fillStyle = `rgba(${r},${g},${b},0.92)`
    ctx.beginPath()
    ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
    ctx.fill()
  }

  // ── Vignette ─────────────────────────────────────────────────────────────────
  const vig = ctx.createRadialGradient(W/2, H/2, H*0.12, W/2, H/2, H*0.84)
  vig.addColorStop(0,   'rgba(6,10,20,0)')
  vig.addColorStop(0.55,'rgba(6,10,20,0.20)')
  vig.addColorStop(1,   'rgba(6,10,20,0.82)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)
}

function drawHex(ctx: CanvasRenderingContext2D, cx: number, cy: number, R: number) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    const x = cx + R * Math.cos(angle)
    const y = cy + R * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()
}
