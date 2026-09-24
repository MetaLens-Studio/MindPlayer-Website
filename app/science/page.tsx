import type { Metadata } from 'next'
import Image from 'next/image'
import PageWrapper from '@/components/PageWrapper'
import VisionSection from '@/components/VisionSection'
import ScienceOutcomes from '@/components/ScienceOutcomes'
import ScienceSections from '@/components/ScienceSections'

export const metadata: Metadata = {
  title: 'Science — MindPlayer',
  description: 'The neuroscience behind MindPlayer — brainwave entrainment, spatial audio, and immersive environment design.',
}

const HERO_BLUR = 'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoOAAcAA4BaJYgCdAEPDe8ncwAA/rXT37N39e+Whj4mEj9cXBTd3upXPbGawZ1gm/58AAAA'

export default function SciencePage() {
  return (
    <PageWrapper>
      <div
        className="relative flex items-center min-h-[88vh] md:min-h-screen overflow-hidden"
        style={{ background: '#070707' }}
      >
        {/* Full-bleed image — all screen sizes (left-to-right layout) */}
        <Image
          src="/images/science-hero-bg.webp"
          alt=""
          fill
          sizes="100vw"
          quality={80}
          priority
          placeholder="blur"
          blurDataURL={HERO_BLUR}
          className="object-cover object-[68%_center] md:object-[72%_center] pointer-events-none"
        />

        {/* Left dark gradient — wider/stronger on mobile so the copy stays readable */}
        <div
          className="md:hidden pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,7,7,0.98) 0%, rgba(7,7,7,0.94) 28%, rgba(7,7,7,0.72) 52%, rgba(7,7,7,0.35) 74%, rgba(7,7,7,0.05) 100%)',
          }}
        />
        <div
          className="hidden md:block pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,7,7,0.96) 0%, rgba(7,7,7,0.85) 22%, rgba(7,7,7,0.55) 42%, rgba(7,7,7,0.18) 60%, transparent 76%)',
          }}
        />
        {/* Subtle scrim under the navbar */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(180deg, rgba(7,7,7,0.6) 0%, transparent 16%)' }}
        />
        {/* Bottom fade into the next section */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(180deg, transparent 70%, rgba(7,7,7,0.55) 88%, #070707 100%)' }}
        />

        {/* Copy — left aligned */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 pt-24 pb-16">
          <div className="max-w-xl">
            <p className="mb-4 md:mb-6 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>
              Science
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 md:mb-8">
              Built on science.<br />
              <span className="gradient-text">Designed for real life.</span>
            </h1>
            <p className="text-base md:text-lg text-[#C4CAD6] leading-relaxed max-w-lg mb-4">
              Every Mind, every sound, every environment in Mind Player is built on a body of research. Not as decoration — but as the foundation for every product decision we make.
            </p>
            <p className="text-base text-[#C4CAD6] leading-relaxed max-w-lg" style={{ opacity: 0.85 }}>
              We combine this knowledge with immersive technology to help support better mental states.
            </p>
          </div>
        </div>
      </div>

      <ScienceSections />
      <ScienceOutcomes />
    </PageWrapper>
  )
}
