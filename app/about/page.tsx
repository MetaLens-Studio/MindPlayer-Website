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
        className="flex items-end px-6 md:px-8 pb-12 md:pb-16 pt-32 md:pt-40"
        style={{ background: 'linear-gradient(180deg, #0E1525 0%, #070707 100%)', minHeight: '35vh' }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: '#8A6FFF' }}>About</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black text-white leading-none">
            Why <span className="gradient-text">MindPlayer</span>
          </h1>
        </div>
      </div>

      <WhyMindPlayer hideHeader />
      <AudiencesSection />
      <Testimonials />
    </PageWrapper>
  )
}
