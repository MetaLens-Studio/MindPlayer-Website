import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import SolutionSection from '@/components/SolutionSection'
import GalaxyBackground from '@/components/GalaxyBackground'

export const metadata: Metadata = {
  title: 'Experiences — MindPlayer',
  description: 'VR, AR, Mobile, and AI — five dimensions of immersive mental state regulation.',
}

export default function ExperiencesPage() {
  return (
    <PageWrapper>
      {/* Hero — full screen intro */}
      <div
        className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-16 pt-28 overflow-hidden"
        style={{ background: '#05080f', contain: 'layout style', willChange: 'auto' }}
      >
        {/* Galaxy canvas background */}
        <GalaxyBackground />

        {/* Soft vignette so text stays readable */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,8,15,0.5) 100%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="mb-4 md:mb-6 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>Experiences</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6 md:mb-8">
            Immersive experiences<br />
            <span className="gradient-text">designed for different</span><br />
            mental states.
          </h1>
          <p className="text-base md:text-xl text-[#B8B8B8] leading-relaxed max-w-2xl mx-auto">
            Mind Player Experiences combine sound, immersive environments and guided sessions designed to support your focus, recovery, sleep, emotional balance and performance.
          </p>
        </div>

      </div>

      <SolutionSection hideHeader />
    </PageWrapper>
  )
}
