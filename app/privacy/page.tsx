import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'

export const metadata: Metadata = {
  title: 'Privacy Policy — MindPlayer',
  description: 'How Mind Player collects, uses and protects your personal data.',
}

const sections = [
  {
    title: '1. Introduction',
    content: 'This Privacy Policy explains how Mind Player collects, uses and protects your personal data when you use our platform.',
  },
  {
    title: '2. Data We Collect',
    items: [
      { label: 'Email', text: 'Used to create and manage your account and communicate with you.' },
      { label: 'Name (optional)', text: 'To personalise your experience on the platform.' },
      { label: 'Usage Data', text: 'Non-sensitive analytics about how you interact with the platform, used to improve the service.' },
      { label: 'Device Information', text: 'Technical details about the device you use to access Mind Player.' },
    ],
  },
  {
    title: '3. How We Use Data',
    content: 'We use your data to provide and improve the service, customise your experience, and facilitate communication with you.',
  },
  {
    title: '4. Legal Basis (GDPR)',
    content: 'We process your personal data on the following legal bases: your consent, contractual necessity (to deliver the service you signed up for), and legitimate interest.',
  },
  {
    title: '5. Data Sharing',
    content: 'We may share data with payment providers, analytics tools, and service providers who help us operate the platform. We do not sell personal data.',
  },
  {
    title: '6. Data Storage and Security',
    content: 'Your data is securely stored and protected using appropriate technical and organisational measures. We retain your information only for as long as necessary to deliver the service or comply with legal obligations.',
  },
  {
    title: '7. Your Rights',
    items: [
      { label: 'Access', text: 'You have the right to access the personal data we hold about you.' },
      { label: 'Deletion', text: 'You can request deletion of your personal data at any time.' },
      { label: 'Withdraw Consent', text: 'You may withdraw your consent to data processing at any time.' },
    ],
  },
  {
    title: '8. Cookies and Tracking',
    content: 'We may use cookies and similar technologies to improve your experience. For full details, please refer to our Cookies Policy.',
  },
  {
    title: '9. Contact',
    content: 'If you have any questions about this Privacy Policy or how we handle your data, please contact us at support@mindplayer.com.',
  },
]

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen relative overflow-hidden" style={{ background: '#070707' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(138,111,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(93,235,255,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
          <div className="mb-12">
            <p className="mb-3 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#8A6FFF' }}>Legal</p>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-base leading-relaxed" style={{ color: '#B8B8B8' }}>
              How Mind Player collects, uses and protects your personal data.
            </p>
            <div className="mt-6 h-px w-16 rounded-full" style={{ background: 'linear-gradient(to right, #8A6FFF, #5DEBFF)' }} />
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
                {section.content && (
                  <p className="text-sm leading-relaxed" style={{ color: '#B8B8B8' }}>{section.content}</p>
                )}
                {section.items && (
                  <div className="space-y-4 mt-2">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl px-5 py-4"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
                        <p className="text-sm leading-relaxed" style={{ color: '#B8B8B8' }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
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
