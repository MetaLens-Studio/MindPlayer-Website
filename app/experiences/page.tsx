import type { Metadata } from 'next'
import Image from 'next/image'
import PageWrapper from '@/components/PageWrapper'
import SolutionSection from '@/components/SolutionSection'
import { blurDataURLs } from '@/lib/imagePlaceholders'

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
        style={{ background: '#05080f' }}
      >
        {/* Static background image */}
        <Image
          src="/images/experiences-bg.webp"
          alt=""
          fill
          sizes="100vw"
          quality={85}
          priority
          placeholder="blur"
          blurDataURL={blurDataURLs['experiences-bg.webp']}
          className="object-cover object-center pointer-events-none"
        />

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
            Experiences designed for<br />
            <span className="gradient-text">how you want to feel.</span>
          </h1>
          <p className="text-base md:text-xl text-[#B8B8B8] leading-relaxed max-w-2xl mx-auto">
            Whatever you need — focus, calm, sleep, energy or clarity — there&apos;s a Mind for that.
          </p>
        </div>

      </div>

      <SolutionSection hideHeader />
    </PageWrapper>
  )
}
