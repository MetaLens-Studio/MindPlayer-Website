'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        background: '#070707',
        color: '#fff',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
        Something went wrong
      </h1>
      <p style={{ color: '#B8B8B8', maxWidth: 420, lineHeight: 1.6, marginBottom: '28px' }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)',
          color: '#070707',
          border: 'none',
          padding: '12px 28px',
          borderRadius: 999,
          fontSize: '0.9rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  )
}
