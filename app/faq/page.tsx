import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'FAQ — MindPlayer',
  description: 'Everything you need to know about MindPlayer — mental state regulation, early access, and more.',
}

export default function FAQPage() {
  return (
    <PageWrapper>
      <div
        className="flex items-end px-6 md:px-8 pb-12 md:pb-16 pt-32 md:pt-40"
        style={{ background: 'linear-gradient(180deg, #0E1525 0%, #070707 100%)', minHeight: '35vh' }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: '#5DEBFF' }}>Support</p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
        </div>
      </div>

      <FAQSection hideHeader />
      <CTASection />
    </PageWrapper>
  )
}
