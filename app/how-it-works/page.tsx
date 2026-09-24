import type { Metadata } from 'next'
import Image from 'next/image'
import PageWrapper from '@/components/PageWrapper'
import HowItWorks from '@/components/HowItWorks'
import Timeline from '@/components/Timeline'

export const metadata: Metadata = {
  title: 'How It Works — MindPlayer',
  description: 'Four simple steps to mental clarity — choose your goal, enter the experience, regulate your state, create your Minds.',
}

const HERO_BLUR = 'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoKAAYAA4BaJZwAAueK1n7XAAD+2aJ84mLYjA9GHLBuEVpDELd8HxnAgAA='

export default function HowItWorksPage() {
  return (
    <PageWrapper>
      <section
        className="relative overflow-hidden md:flex md:items-center md:min-h-screen"
        style={{ background: '#070707' }}
      >
        {/* Desktop / tablet: full-bleed image that dissolves toward the left via a mask */}
        <div className="hidden md:block absolute inset-0 z-0">
          <Image
            src="/images/how-hero.webp"
            alt="A person meditating in a calm, light-filled room"
            fill
            sizes="100vw"
            quality={82}
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover"
            style={{
              objectPosition: '78% 13%',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 4%, rgba(0,0,0,0.10) 26%, rgba(0,0,0,0.45) 46%, rgba(0,0,0,0.85) 66%, #000 82%)',
              maskImage:
                'linear-gradient(to right, transparent 4%, rgba(0,0,0,0.10) 26%, rgba(0,0,0,0.45) 46%, rgba(0,0,0,0.85) 66%, #000 82%)',
            }}
          />

          {/* Handwritten-style annotation — sits just left of the man's head, arrow curving toward him */}
          <div className="absolute top-[18%] right-[34%] text-right">
            <p className="text-white/90 text-lg md:text-xl leading-snug font-light">
              Calmer mind.<br />Better days.
            </p>
            <svg width="80" height="52" viewBox="0 0 80 52" fill="none" className="ml-auto mt-1 opacity-75">
              <path d="M6 46 C 40 44, 70 34, 74 8" stroke="#8A6FFF" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M66 14 L 75 6 L 79 17" stroke="#8A6FFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* Text column — left */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 pt-28 pb-8 md:py-16">
          <div className="max-w-2xl">
            <p className="mb-4 md:mb-6 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#9AA1B2' }}>
              How It Works
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.08] mb-6 md:mb-8 sm:whitespace-nowrap">
              A simple system designed
              <br />
              around <span className="gradient-text">mental state.</span>
            </h1>
            <p className="text-base md:text-lg text-[#B8B8B8] leading-relaxed max-w-md">
              Mind Player combines immersive technology, sound and guided experiences to help you regulate your mental state and perform at your best.
            </p>
          </div>
        </div>

        {/* Mobile: image as its own band below the text */}
        <div className="md:hidden relative w-full h-[52vh] z-0">
          <Image
            src="/images/how-hero.webp"
            alt="A person meditating in a calm, light-filled room"
            fill
            sizes="100vw"
            quality={78}
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover"
            style={{ objectPosition: '64% center' }}
          />
          {/* Gradual fade from the dark text area into the image (subtle top), tiny blend at the very bottom */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #070707 0%, rgba(7,7,7,0.7) 10%, rgba(7,7,7,0.25) 26%, transparent 44%, transparent 94%, rgba(7,7,7,0.7) 100%)' }}
          />
        </div>
      </section>

      <HowItWorks hideHeader />
      <Timeline />
    </PageWrapper>
  )
}
