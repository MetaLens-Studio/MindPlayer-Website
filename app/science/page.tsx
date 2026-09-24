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
        className="relative overflow-hidden md:flex md:items-center md:min-h-screen"
        style={{ background: '#070707' }}
      >
        {/* Desktop / tablet: full-bleed image with left gradient (md+) */}
        <div className="hidden md:block absolute inset-0 z-0">
          <Image
            src="/images/science-hero-bg.webp"
            alt=""
            fill
            sizes="100vw"
            quality={80}
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover pointer-events-none"
            style={{ objectPosition: '72% center' }}
          />
          {/* Dark gradient on the left so the copy stays readable, image open on the right */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(7,7,7,0.96) 0%, rgba(7,7,7,0.85) 22%, rgba(7,7,7,0.55) 42%, rgba(7,7,7,0.18) 60%, transparent 76%)',
            }}
          />
          {/* Subtle scrim under the navbar */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(7,7,7,0.6) 0%, transparent 16%)' }}
          />
          {/* Bottom fade into the next section */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 68%, rgba(7,7,7,0.6) 88%, #070707 100%)' }}
          />
        </div>

        {/* Copy — left aligned (on top of image on desktop, above image on mobile) */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 pt-28 pb-8 md:py-16">
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

        {/* Mobile: image as its own band below the text */}
        <div className="md:hidden relative w-full h-[46vh] z-0">
          <Image
            src="/images/science-hero-bg.webp"
            alt=""
            fill
            sizes="100vw"
            quality={78}
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover pointer-events-none"
            style={{ objectPosition: '58% center' }}
          />
          {/* Fade the top of the image into the dark text area, and the bottom into the next section */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #070707 0%, transparent 20%, transparent 82%, #070707 100%)' }}
          />
        </div>
      </div>

      <ScienceSections />
      <ScienceOutcomes />
    </PageWrapper>
  )
}
