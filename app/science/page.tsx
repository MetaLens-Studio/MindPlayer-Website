import type { Metadata } from 'next'
import Image from 'next/image'
import { blurDataURLs } from '@/lib/imagePlaceholders'
import PageWrapper from '@/components/PageWrapper'
import VisionSection from '@/components/VisionSection'
import ScienceOutcomes from '@/components/ScienceOutcomes'
import ScienceSections from '@/components/ScienceSections'

export const metadata: Metadata = {
  title: 'Science — MindPlayer',
  description: 'The neuroscience behind MindPlayer — brainwave entrainment, spatial audio, and immersive environment design.',
}

export default function SciencePage() {
  return (
    <PageWrapper>
      <div
        className="relative min-h-screen overflow-hidden"
        style={{ background: '#070707' }}
      >
        {/* Subtle radial glow behind content */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(93,235,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 75% 50%, rgba(138,111,255,0.08) 0%, transparent 65%)',
          }}
        />

        {/* Curvy line decorations */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <path d="M-100 700 C 200 500, 400 800, 700 500 S 1100 200, 1600 400" fill="none" stroke="rgba(93,235,255,0.10)" strokeWidth="1.2" />
          <path d="M-100 500 C 150 300, 350 600, 650 350 S 1050 100, 1600 250" fill="none" stroke="rgba(138,111,255,0.09)" strokeWidth="1" />
          <path d="M-100 850 C 300 650, 500 900, 800 650 S 1200 350, 1600 550" fill="none" stroke="rgba(93,235,255,0.07)" strokeWidth="0.9" />
          <path d="M200 -50 C 300 200, 150 400, 250 650 S 200 850, 100 950" fill="none" stroke="rgba(138,111,255,0.07)" strokeWidth="0.9" />
          <path d="M1300 -50 C 1350 150, 1200 350, 1350 550 S 1400 750, 1300 950" fill="none" stroke="rgba(93,235,255,0.07)" strokeWidth="0.9" />
          <path d="M-100 200 C 250 100, 500 300, 750 150 S 1150 -50, 1600 100" fill="none" stroke="rgba(255,215,106,0.06)" strokeWidth="0.8" />
        </svg>

        {/* Two-column hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-16 md:pt-36 md:pb-20 flex flex-col md:flex-row items-center gap-12 md:gap-16 min-h-screen">

          {/* Left — text */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <p className="mb-4 md:mb-6 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>
              Science
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 md:mb-8">
              Built on science.<br />
              <span className="gradient-text">Designed for real life.</span>
            </h1>
            <p className="text-base md:text-lg text-[#B8B8B8] leading-relaxed max-w-xl mb-4">
              Every Mind, every sound, every environment in Mind Player is built on a body of research. Not as decoration — but as the foundation for every product decision we make.
            </p>
            <p className="text-base text-[#B8B8B8] leading-relaxed max-w-xl" style={{ opacity: 0.8 }}>
              We combine this knowledge with immersive technology to help support better mental states.
            </p>
          </div>

          {/* Right — science image with colour treatment */}
          <div className="w-full md:flex-1 flex items-center justify-center relative">
            {/* Glow halo behind image — pre-softened gradient, no filter (iOS-safe) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(93,235,255,0.12) 0%, rgba(138,111,255,0.08) 45%, transparent 75%)',
              }}
            />

            <div className="relative w-full md:max-w-none md:scale-125 md:origin-center">
              {/* Mobile: crop to center the head */}
              <div className="block md:hidden w-full h-72 overflow-hidden rounded-2xl">
                <Image
                  src="/images/science-hero.webp"
                  alt="Science — neural and molecular research"
                  width={1515}
                  height={1038}
                  quality={90}
                  priority
                  className="w-full h-full"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'right center',
                    filter: 'saturate(0.7) brightness(0.9)',
                  }}
                />
              </div>
              {/* Desktop: full image */}
              <Image
                src="/images/science-hero.webp"
                alt="Science — neural and molecular research"
                width={1515}
                height={1038}
                quality={90}
                priority
                className="hidden md:block w-full h-auto"
                style={{
                  filter: 'saturate(0.7) brightness(0.9) drop-shadow(0 0 40px rgba(93,235,255,0.25)) drop-shadow(0 0 80px rgba(138,111,255,0.15))',
                }}
              />
            </div>
          </div>

        </div>
      </div>

      <ScienceSections />
      <ScienceOutcomes />
    </PageWrapper>
  )
}
