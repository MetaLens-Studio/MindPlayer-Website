'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000', color: '#fff',
      fontFamily: 'monospace', fontSize: '13px', padding: '24px',
      overflowY: 'auto', zIndex: 9999, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
    }}>
      <div style={{ color: '#ff4444', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>
        ⚠ App Error
      </div>
      <div style={{ color: '#ffaa00', marginBottom: '8px' }}>
        {error?.name}: {error?.message}
      </div>
      {error?.stack && (
        <div style={{ color: '#aaa', fontSize: '11px', marginBottom: '16px' }}>
          {error.stack}
        </div>
      )}
      {error?.digest && (
        <div style={{ color: '#888', marginBottom: '16px' }}>
          Digest: {error.digest}
        </div>
      )}
      <button
        onClick={reset}
        style={{ background: '#333', color: '#fff', border: '1px solid #555', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  )
}
