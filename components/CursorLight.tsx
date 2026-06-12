'use client'
import { useEffect, useRef } from 'react'

export default function CursorLight() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const dot  = dotRef.current
    if (!glow || !dot) return

    let mx = 0, my = 0, cx = 0, cy = 0
    let frame: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = `${mx}px`
      dot.style.top  = `${my}px`
    }

    const tick = () => {
      cx += (mx - cx) * 0.07
      cy += (my - cy) * 0.07
      glow.style.left = `${cx}px`
      glow.style.top  = `${cy}px`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      {/* Soft ambient glow that lags behind cursor */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(93,235,255,0.07) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Crisp dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          background: '#5DEBFF',
          boxShadow: '0 0 12px rgba(93,235,255,0.9), 0 0 24px rgba(93,235,255,0.4)',
        }}
      />
    </>
  )
}
