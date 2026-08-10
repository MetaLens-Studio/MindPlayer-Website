'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function SessionGuard() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on every page load / navigation
    window.scrollTo({ top: 0, behavior: 'instant' })

    // On fresh session (tab closed & reopened), always land on homepage
    const hasSession = sessionStorage.getItem('mp_session')
    if (!hasSession) {
      sessionStorage.setItem('mp_session', '1')
      if (pathname !== '/') {
        router.replace('/')
      }
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
