'use client'
import { useEffect } from 'react'

export default function ErrorOverlay() {
  useEffect(() => {
    const show = (title: string, msg: string, stack?: string) => {
      const existing = document.getElementById('__err_overlay')
      if (existing) existing.remove()
      const el = document.createElement('div')
      el.id = '__err_overlay'
      el.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:999999', 'background:#0a0a0a',
        'color:#fff', 'font-family:monospace', 'font-size:13px',
        'padding:20px', 'overflow-y:auto', 'white-space:pre-wrap', 'word-break:break-all',
      ].join(';')
      el.innerHTML = `<div style="color:#ff4444;font-size:16px;font-weight:bold;margin-bottom:12px">⚠ ${title}</div>` +
        `<div style="color:#ffaa00;margin-bottom:10px">${msg}</div>` +
        (stack ? `<div style="color:#888;font-size:11px;margin-bottom:16px">${stack}</div>` : '') +
        `<button onclick="this.parentElement.remove()" style="background:#333;color:#fff;border:1px solid #555;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:8px">Dismiss</button>` +
        `<button onclick="location.reload()" style="background:#333;color:#fff;border:1px solid #555;padding:8px 16px;border-radius:6px;cursor:pointer">Reload</button>`
      document.body.appendChild(el)
    }

    const onError = (e: ErrorEvent) => {
      show('JS Error', `${e.message}\n${e.filename}:${e.lineno}:${e.colno}`, e.error?.stack)
    }
    const onUnhandled = (e: PromiseRejectionEvent) => {
      const msg = e.reason instanceof Error ? e.reason.message : String(e.reason)
      const stack = e.reason instanceof Error ? e.reason.stack : undefined
      show('Unhandled Promise Rejection', msg, stack)
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onUnhandled)
    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onUnhandled)
    }
  }, [])

  return null
}
