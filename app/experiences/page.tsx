import type { Metadata } from 'next'
import Image from 'next/image'
import PageWrapper from '@/components/PageWrapper'
import SolutionSection from '@/components/SolutionSection'

export const metadata: Metadata = {
  title: 'Experiences — MindPlayer',
  description: 'VR, AR, Mobile, and AI — five dimensions of immersive mental state regulation.',
}

const HERO_BLUR = 'data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoOAAcAA4BaJbACdAD8at0B1MAA/ufgiAA+US1zcAPrSmMmvgb/6SWhkE+XTPM2pEj9+M2ZfWQ1TyEl6a8YiFlhS0kBp2ZAAAA='

export default function ExperiencesPage() {
  return (
    <PageWrapper>
      {/* Hero — full-bleed on desktop, stacked (text over image) on mobile */}
      <div
        className="relative overflow-hidden md:flex md:items-center md:min-h-screen"
        style={{ background: '#05080f' }}
      >
        {/* Desktop / tablet: full-bleed image with left gradient (md+) */}
        <div className="hidden md:block absolute inset-0 z-0">
          <Image
            src="/images/experiences-hero.webp"
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
                'linear-gradient(90deg, rgba(5,8,15,0.94) 0%, rgba(5,8,15,0.78) 22%, rgba(5,8,15,0.45) 42%, rgba(5,8,15,0.12) 60%, transparent 74%)',
            }}
          />
          {/* Subtle scrim under the navbar */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(5,8,15,0.55) 0%, transparent 16%)' }}
          />
          {/* Bottom fade into the next section */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 68%, rgba(5,8,15,0.6) 88%, #05080f 100%)' }}
          />
        </div>

        {/* Copy — left aligned */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 pt-28 pb-8 md:py-16">
          <div className="max-w-4xl">
            <p className="mb-4 md:mb-6 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>Experiences</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black text-white leading-[1.05] mb-6 md:mb-8 sm:whitespace-nowrap">
              Experiences designed for<br />
              <span className="gradient-text">how you want to feel.</span>
            </h1>
            <p className="text-base md:text-xl text-[#C4CAD6] leading-relaxed max-w-lg">
              Whatever you need: focus, calm, sleep, energy or clarity. There&apos;s a Mind for that.
            </p>
          </div>
        </div>

        {/* Mobile: image as its own band below the text */}
        <div className="md:hidden relative w-full h-[46vh] z-0">
          <Image
            src="/images/experiences-hero.webp"
            alt=""
            fill
            sizes="100vw"
            quality={78}
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover pointer-events-none"
            style={{ objectPosition: '64% center' }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #05080f 0%, transparent 20%, transparent 82%, #05080f 100%)' }}
          />
        </div>

      </div>

      <SolutionSection hideHeader />
    </PageWrapper>
  )
}
