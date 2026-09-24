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
      {/* Hero — full-bleed image with left-aligned copy */}
      <div
        className="relative flex items-center min-h-[85vh] md:min-h-screen overflow-hidden"
        style={{ background: '#05080f' }}
      >
        {/* Background image */}
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
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,8,15,0.94) 0%, rgba(5,8,15,0.78) 22%, rgba(5,8,15,0.45) 42%, rgba(5,8,15,0.12) 60%, transparent 74%)',
          }}
        />
        {/* Subtle scrim under the navbar */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(180deg, rgba(5,8,15,0.55) 0%, transparent 16%)' }}
        />
        {/* Bottom fade into the next section */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(180deg, transparent 68%, rgba(5,8,15,0.6) 88%, #05080f 100%)' }}
        />

        {/* Copy — left aligned */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 pt-24 pb-16">
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

      </div>

      <SolutionSection hideHeader />
    </PageWrapper>
  )
}
