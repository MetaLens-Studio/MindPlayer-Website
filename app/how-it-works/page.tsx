import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import HowItWorks from '@/components/HowItWorks'
import Timeline from '@/components/Timeline'

export const metadata: Metadata = {
  title: 'How It Works — MindPlayer',
  description: 'Four simple steps to mental clarity — choose your goal, enter the experience, regulate your state, create your Minds.',
}

export default function HowItWorksPage() {
  return (
    <PageWrapper>
      <div
        className="relative min-h-screen overflow-hidden flex items-center"
        style={{ background: '#070707' }}
      >
        {/* Background gradients */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(138,111,255,0.22) 0%, transparent 65%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(93,235,255,0.1) 0%, transparent 65%)' }} />
          <div className="absolute -bottom-40 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.12) 0%, transparent 65%)' }} />
          <div className="absolute top-1/4 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,215,106,0.08) 0%, transparent 65%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center pt-28 pb-16">

          {/* Text — left */}
          <div>
            <p className="mb-4 md:mb-6 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#8A6FFF' }}>How It Works</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6 md:mb-8">
              A simple system<br />
              <span className="gradient-text">designed around</span><br />
              mental state.
            </h1>
            <p className="text-base md:text-lg text-[#B8B8B8] leading-relaxed">
              Mind Player combines immersive technology, sound and guided experiences to help you regulate your mental state and perform at your best.
            </p>
          </div>

          {/* Image container — right */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden w-full"
              style={{
                height: 'clamp(260px, 45vw, 520px)',
                backgroundImage: 'url(/images/howitworksbg.png)',
                backgroundSize: 'cover',
                backgroundPosition: '90% center',
                backgroundRepeat: 'no-repeat',
                border: '2px solid rgba(93,235,255,0.6)',
                outline: '1px solid rgba(138,111,255,0.4)',
                outlineOffset: '6px',
              }}>
            </div>
          </div>
        </div>

      </div>

      <HowItWorks hideHeader />
      <Timeline />
    </PageWrapper>
  )
}
