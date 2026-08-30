'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SessionGuard() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on every page navigation
    try { window.scrollTo(0, 0) } catch {}
  }, [pathname])

  return null
}
