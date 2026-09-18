import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
        className="relative min-h-screen overflow-hidden flex items-center"
        style={{ background: '#070707' }}
      >
        {/* Right full-bleed image (desktop / tablet) */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-[54%] lg:w-[52%]">
          <Image
            src="/images/how-hero.webp"
            alt="A person meditating in a calm, light-filled room"
            fill
            sizes="52vw"
            quality={82}
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover"
            style={{ objectPosition: '62% center' }}
          />
          {/* Fade the left edge of the image into the dark background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, #070707 0%, rgba(7,7,7,0.75) 10%, rgba(7,7,7,0.25) 28%, transparent 46%)',
            }}
          />
          {/* Soft top/bottom vignette for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(7,7,7,0.35) 0%, transparent 20%, transparent 78%, rgba(7,7,7,0.5) 100%)' }}
          />

          {/* Handwritten-style annotation */}
          <div className="absolute top-[12%] right-[14%] text-right">
            <p className="text-white/90 text-lg md:text-xl leading-snug font-light">
              Calmer mind.<br />Better days.
            </p>
            <svg width="70" height="46" viewBox="0 0 70 46" fill="none" className="ml-auto mt-1 opacity-70">
              <path d="M4 4 C 30 6, 58 14, 60 40" stroke="#8A6FFF" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M52 34 L 60 41 L 66 32" stroke="#8A6FFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* Ambient background glows behind the text */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[400px] h-[400px] md:w-[640px] md:h-[640px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(138,111,255,0.20) 0%, transparent 65%)' }} />
          <div className="absolute -bottom-40 left-0 w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(93,235,255,0.10) 0%, transparent 65%)' }} />
        </div>

        {/* Text column — left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16">
          <div className="max-w-xl">
            <p className="mb-4 md:mb-6 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#8A6FFF' }}>
              How It Works
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] mb-6 md:mb-8">
              A simple system{' '}
              <span className="gradient-text">designed around</span>{' '}
              mental state.
            </h1>
            <p className="text-base md:text-lg text-[#B8B8B8] leading-relaxed max-w-md">
              Mind Player combines immersive technology, sound and guided experiences to help you regulate your mental state and perform at your best.
            </p>

            {/* CTA row */}
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/early-access"
                className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-bold tracking-[0.08em] text-[#070707] transition-shadow duration-200"
                style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)', boxShadow: '0 0 28px rgba(93,235,255,0.30)' }}
              >
                Get Early Access
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile image — below text, full width */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-[42%]">
          <Image
            src="/images/how-hero.webp"
            alt="A person meditating in a calm, light-filled room"
            fill
            sizes="100vw"
            quality={80}
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover"
            style={{ objectPosition: '62% center' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, #070707 0%, rgba(7,7,7,0.4) 22%, transparent 55%)' }}
          />
        </div>
      </section>

      <HowItWorks hideHeader />
      <Timeline />
    </PageWrapper>
  )
}
