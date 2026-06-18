'use client'
import { useEffect, ReactNode } from 'react'


export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
    let rafId: number

    // Always start at the top on every load / reload
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    let onVisibility: (() => void) | null = null

    const init = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      const raf = (time: number) => {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      onVisibility = () => {
        if (document.hidden) cancelAnimationFrame(rafId)
        else rafId = requestAnimationFrame(raf)
      }
      document.addEventListener('visibilitychange', onVisibility)
    }

    init()
    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      if (onVisibility) document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <>{children}</>
}
