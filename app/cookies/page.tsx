import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'

export const metadata: Metadata = {
  title: 'Cookies Policy — MindPlayer',
  description: 'Understand how Mind Player uses cookies and similar technologies to enhance your experience.',
}

const sections = [
  {
    title: '1. Introduction',
    content: 'This Cookies Policy explains how Mind Player uses cookies and similar technologies when you access or use our platform.',
  },
  {
    title: '2. What Are Cookies?',
    content: 'Cookies are small text files stored on your device when you visit a website or use an application. They help us recognise your device, improve performance, and enhance your experience.',
  },
  {
    title: '3. Types of Cookies We Use',
    items: [
      {
        label: 'Essential Cookies',
        text: 'Required for the platform to function properly. These enable navigation, account access, and security features.',
      },
      {
        label: 'Performance and Analytics Cookies',
        text: 'These help us understand how users interact with Mind Player by analysing usage patterns so we can improve the platform.',
      },
      {
        label: 'Functional Cookies',
        text: 'Enable preference retention and personalised settings so the platform remembers your choices.',
      },
      {
        label: 'Marketing Cookies',
        text: 'Reserved for potential future use to deliver relevant content and promotions.',
      },
    ],
  },
  {
    title: '4. Third-Party Cookies',
    content: 'We may use third-party services that place cookies on your device, such as: analytics providers (e.g. Google Analytics or similar), payment providers, and infrastructure services.',
  },
  {
    title: '5. How to Manage Cookies',
    content: 'You can control cookies through your browser settings — including blocking, deleting, or receiving alerts when cookies are set. Please note that disabling cookies may affect the functionality of Mind Player.',
  },
  {
    title: '6. Legal Basis (GDPR)',
    content: 'We use consent as the legal basis for non-essential cookies, and legitimate interest for cookies that are essential to the platform\'s core functionality.',
  },
  {
    title: '7. Updates',
    content: 'We may update this Cookies Policy from time to time. Any changes will be reflected on this page.',
  },
  {
    title: '8. Contact',
    content: 'If you have any questions about how we use cookies, please contact us at support@mindplayer.com.',
  },
]

export default function CookiesPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen relative overflow-hidden" style={{ background: '#070707' }}>
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(93,235,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(138,111,255,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
          {/* Header */}
          <div className="mb-12">
            <p className="mb-3 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>Legal</p>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Cookies Policy
            </h1>
            <p className="text-base leading-relaxed" style={{ color: '#B8B8B8' }}>
              Understand how Mind Player uses cookies and similar technologies to enhance your experience.
            </p>
            <div className="mt-6 h-px w-16 rounded-full" style={{ background: 'linear-gradient(to right, #5DEBFF, #8A6FFF)' }} />
          </div>

          {/* Sections */}
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
