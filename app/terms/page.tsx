import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'

export const metadata: Metadata = {
  title: 'Terms & Conditions — MindPlayer',
  description: 'The terms that govern your use of the Mind Player platform.',
}

const sections = [
  {
    title: '1. Introduction',
    content: 'Welcome to Mind Player. By accessing or using the platform, you agree to be bound by these Terms.',
  },
  {
    title: '2. Services',
    content: 'Mind Player provides digital content and tools for mental state regulation, including audio, visual environments and guided sessions.',
  },
  {
    title: '3. Age Requirement',
    content: 'The platform is designed for users aged 18 and over. Users aged 16–17 may use the app with parental consent.',
  },
  {
    title: '4. User Accounts',
    content: 'You are responsible for maintaining the security of your account and must provide truthful, complete registration details.',
  },
  {
    title: '5. User Content',
    content: 'You retain ownership of any content you submit. By submitting content, you grant Mind Player a licence to use, display and distribute it within the platform.',
  },
  {
    title: '6. Payments and Transactions',
    content: 'Mind Player offers subscriptions, digital content, group and individual sessions, and other paid experiences processed through third-party payment providers. Prices, fees and commissions may be updated at any time.',
  },
  {
    title: '7. Marketplace and Intermediation',
    content: 'Mind Player acts as an intermediary connecting users, creators, and professionals. Mind Player is not a party to agreements made between these parties.',
  },
  {
    title: '8. Commissions and Fees',
    content: 'Mind Player retains a percentage of transactions. Applicable fees and processing timeframes will be disclosed at the point of purchase.',
  },
  {
    title: '9. Payouts',
    content: 'Distributions to creators and service providers are handled by third-party payment processors. Mind Player is not responsible for delays, failed transfers, or tax obligations arising from these payments.',
  },
  {
    title: '10. Refund Policy',
    content: 'All purchases are final unless Mind Player determines otherwise. Refunds for sessions apply only where a session was not delivered.',
  },
  {
    title: '11. Disputes Between Users',
    content: 'Mind Player may review conflicts between users and reserves the right to make final determinations on resolution.',
  },
  {
    title: '12. Acceptable Use',
    content: 'You may not misuse the platform, upload harmful content, or violate any applicable laws or regulations.',
  },
  {
    title: '13. Content and Conduct',
    content: 'Service providers must operate honestly and deliver the experiences they have promised. Mind Player reserves the right to remove content and suspend accounts that do not meet these standards.',
  },
  {
    title: '14. Prohibited Use',
    content: 'Fraudulent services, misrepresentation of credentials, and manipulation of the payment system are strictly forbidden.',
  },
  {
    title: '15. No Professional or Medical Advice',
    content: 'Mind Player is not a medical service. Content and sessions available on the platform do not constitute medical, psychological or professional advice unless explicitly stated and verified.',
  },
  {
    title: '16. Platform Role',
    content: 'Mind Player provides infrastructure and tools. We do not guarantee specific outcomes or supervise interactions between users.',
  },
  {
    title: '17. Limitation of Liability',
    content: 'Mind Player excludes liability for indirect damages, service quality, session outcomes, and user interactions to the fullest extent permitted by applicable law.',
  },
  {
    title: '18. Termination',
    content: 'Accounts that violate these Terms may be suspended or terminated without prior notice.',
  },
  {
    title: '19. Changes to Terms',
    content: 'We may update these Terms from time to time. Continued use of the platform constitutes acceptance of the updated Terms.',
  },
  {
    title: '20. Contact',
    content: 'For any questions about these Terms, please contact us at hello@mindplayer.com.',
  },
]

export default function TermsPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen relative overflow-hidden" style={{ background: '#070707' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,107,157,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 70% 80%, rgba(138,111,255,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
          <div className="mb-12">
            <p className="mb-3 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#FF6B9D' }}>Legal</p>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-base leading-relaxed" style={{ color: '#B8B8B8' }}>
              The terms that govern your use of the Mind Player platform.
            </p>
            <div className="mt-6 h-px w-16 rounded-full" style={{ background: 'linear-gradient(to right, #FF6B9D, #8A6FFF)' }} />
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl px-5 py-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h2 className="text-base font-semibold text-white mb-2">{section.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: '#B8B8B8' }}>{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>© 2026 Mind Player. All rights reserved.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
