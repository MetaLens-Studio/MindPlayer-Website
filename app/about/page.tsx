import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import WhyMindPlayer from '@/components/WhyMindPlayer'
import AudiencesSection from '@/components/AudiencesSection'
import Testimonials from '@/components/Testimonials'

export const metadata: Metadata = {
  title: 'About — MindPlayer',
  description: 'Why MindPlayer? Immersion, intelligence, and human-centered design — built for every mind.',
}

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Page hero */}
      <div
        className="flex items-end px-6 md:px-8 pb-6 md:pb-8 pt-24 md:pt-28"
        style={{ background: 'linear-gradient(180deg, #0E1525 0%, #070707 100%)' }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: '#8A6FFF' }}>About</p>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            We are not building<br className="hidden sm:block" />
            {' '}<span className="gradient-text">another wellness app.</span>
          </h1>
        </div>
      </div>

      <WhyMindPlayer hideHeader />
      <AudiencesSection />
      <Testimonials />
    </PageWrapper>
  )
}
