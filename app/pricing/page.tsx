import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import PricingPlans from '@/components/PricingPlans'

export const metadata: Metadata = {
  title: 'Pricing — Mind Player',
  description: 'Start free and explore Mind Player at your own pace. Upgrade to Premium for the complete experience, or contact us for an Enterprise plan tailored to your organization.',
}

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5DEBFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const Dash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0 text-[#4A4F5C]" aria-hidden="true">
    <path d="M5 12h14" />
  </svg>
)

const COMPARE: { feature: string; free: string; premium: string; enterprise: string }[] = [
  { feature: 'Free content', free: 'y', premium: 'y', enterprise: 'y' },
  { feature: 'Premium content', free: '-', premium: 'y', enterprise: 'According to plan' },
  { feature: 'Selected Free Originals', free: 'y', premium: 'y', enterprise: 'y' },
  { feature: 'All Mind Player Originals', free: '-', premium: 'y', enterprise: 'According to plan' },
  { feature: 'Personal Mind creation', free: 'Limited', premium: 'Unlimited', enterprise: 'Customized' },
  { feature: 'AI Mind Coach', free: '-', premium: 'With limits', enterprise: 'Customized limits' },
  { feature: 'Basic activity & progress', free: 'y', premium: 'y', enterprise: 'y' },
  { feature: 'Detailed insights', free: '-', premium: 'y', enterprise: 'Available' },
  { feature: 'Weekly summaries', free: '-', premium: 'y', enterprise: 'Available' },
  { feature: 'Community & Feed', free: 'y', premium: 'y', enterprise: 'Included or customized' },
  { feature: 'Book Mind Experts', free: 'y', premium: 'y', enterprise: 'Available' },
  { feature: 'Centralized billing', free: '-', premium: '-', enterprise: 'Available' },
  { feature: 'User & licence management', free: '-', premium: '-', enterprise: 'Available' },
  { feature: 'Organization reporting', free: '-', premium: '-', enterprise: 'Available' },
  { feature: 'Customized onboarding', free: '-', premium: '-', enterprise: 'Available' },
  { feature: 'Priority support', free: '-', premium: '-', enterprise: 'Available' },
]

function Cell({ v }: { v: string }) {
  if (v === 'y') return <span className="inline-flex justify-center w-full"><Check /></span>
  if (v === '-') return <span className="inline-flex justify-center w-full"><Dash /></span>
  return <span className="text-[#C4CAD6]">{v}</span>
}

export default function PricingPage() {
  return (
    <PageWrapper>
      <div className="relative overflow-hidden" style={{ background: '#070707' }}>
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgba(93,235,255,0.08) 0%, rgba(138,111,255,0.06) 40%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="mb-4 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>Pricing</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05]">
              Choose the Mind Player<br className="hidden sm:block" />{' '}
              <span className="gradient-text">experience that fits you.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: '#B8B8B8' }}>
              Start free and explore Mind Player at your own pace. Upgrade when you want the complete
              experience, or contact us for a plan tailored to your organization.
            </p>
            <p className="mt-3 text-sm text-[#8A90A0]">No credit card required for Free. No automatic free trial.</p>
          </div>

          {/* Plan cards */}
          <div className="mt-14">
            <PricingPlans />
          </div>

          {/* Compare plans */}
          <div className="mt-24 md:mt-28">
            <h2 className="text-center font-display text-3xl md:text-4xl font-black text-white">Compare plans</h2>
            <div className="mt-10 overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <th className="text-left font-semibold text-[#8A90A0] uppercase tracking-[0.12em] text-xs px-5 py-4">Feature</th>
                    <th className="text-center font-bold text-white px-5 py-4 w-32">Free</th>
                    <th className="text-center font-bold px-5 py-4 w-40" style={{ color: '#5DEBFF' }}>Premium</th>
                    <th className="text-center font-bold text-white px-5 py-4 w-48">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr key={row.feature} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: i % 2 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                      <td className="px-5 py-3.5 text-[#D5D9E2]">{row.feature}</td>
                      <td className="px-5 py-3.5 text-center"><Cell v={row.free} /></td>
                      <td className="px-5 py-3.5 text-center"><Cell v={row.premium} /></td>
                      <td className="px-5 py-3.5 text-center"><Cell v={row.enterprise} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Creators & Mind Experts */}
          <div className="mt-24 md:mt-28">
            <div className="text-center max-w-2xl mx-auto">
              <p className="mb-3 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#8A6FFF' }}>For Creators & Mind Experts</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white">Create, connect and earn inside Mind Player</h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#B8B8B8' }}>
                Creators and Mind Experts can use either the Free or Premium plan — status is separate from your subscription.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl p-7 md:p-8" style={{ background: 'rgba(14,21,37,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-xl font-bold text-white">Creators</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B8B8B8]">
                  Creators are Mind Player users who want to monetize experiences inside the platform.
                </p>
                <div className="mt-5 space-y-3">
                  {['Create paid Spaces', 'Create paid Events', 'Build and monetize their community'].map(f => (
                    <div key={f} className="flex items-start gap-3 text-sm text-[#D5D9E2]"><Check /><span>{f}</span></div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#8A90A0]">
                  Creators are not presented as verified professionals and do not appear in the Mind Experts marketplace.
                </p>
              </div>

              <div className="rounded-3xl p-7 md:p-8" style={{ background: 'rgba(14,21,37,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-xl font-bold text-white">Mind Experts</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B8B8B8]">
                  Mind Experts are professionals whose credentials and areas of expertise have been manually reviewed by the Mind Player team.
                </p>
                <div className="mt-5 space-y-3">
                  {['Appear in the Mind Experts marketplace', 'Promote professional services', 'Receive session bookings', 'Offer paid individual & group sessions', 'Create paid Spaces and Events'].map(f => (
                    <div key={f} className="flex items-start gap-3 text-sm text-[#D5D9E2]"><Check /><span>{f}</span></div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#8A90A0]">
                  Mind Player retains a 20% platform commission from each completed Mind Expert session.
                </p>
              </div>
            </div>
          </div>

          {/* Closing CTA */}
          <div className="mt-24 md:mt-28 rounded-3xl px-6 py-14 md:py-20 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(93,235,255,0.08), rgba(138,111,255,0.08))', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white">
              Start with the <span className="gradient-text">mind you need.</span>
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#B8B8B8' }}>
              Explore Mind Player for free or unlock the complete experience with Premium.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/early-access"
                className="rounded-full px-8 py-3.5 text-sm font-bold tracking-[0.1em] uppercase text-[#070707]"
                style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)', boxShadow: '0 0 28px rgba(93,235,255,0.3)' }}>
                Start Free
              </Link>
              <Link href="/early-access"
                className="rounded-full px-8 py-3.5 text-sm font-bold tracking-[0.1em] uppercase text-white"
                style={{ border: '1px solid rgba(255,255,255,0.18)' }}>
                Unlock Premium
              </Link>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-[#6B7180]">
            Prices are displayed in USD. Local prices, currencies and applicable taxes may vary by country or purchasing platform.
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
