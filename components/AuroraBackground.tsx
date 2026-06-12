'use client'

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ background: '#060a14' }}
    >
      {/* Cyan band — top left drift */}
      <div className="aurora-blob aurora-cyan-1" />
      {/* Purple band — centre */}
      <div className="aurora-blob aurora-purple-1" />
      {/* Second cyan — right */}
      <div className="aurora-blob aurora-cyan-2" />
      {/* Gold accent — bottom */}
      <div className="aurora-blob aurora-gold-1" />
      {/* Pink accent — far right */}
      <div className="aurora-blob aurora-pink-1" />
      {/* Second purple — upper right */}
      <div className="aurora-blob aurora-purple-2" />

      {/* Edge vignette to keep text sharp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 25%, rgba(6,10,20,0.55) 100%)',
        }}
      />
    </div>
  )
}
