'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function SessionGuard() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on every page load / navigation
    try { window.scrollTo({ top: 0, behavior: 'instant' }) } catch { window.scrollTo(0, 0) }

    // On fresh session (tab closed & reopened), always land on homepage
    // Wrapped in try/catch — iOS Safari private mode throws SecurityError on sessionStorage
    try {
      const hasSession = sessionStorage.getItem('mp_session')
      if (!hasSession) {
        sessionStorage.setItem('mp_session', '1')
        if (pathname !== '/') {
          router.replace('/')
        }
      }
    } catch {
      // sessionStorage unavailable (private mode) — just stay on current page
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
