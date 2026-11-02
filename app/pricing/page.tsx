import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'

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

const FREE_INCLUDED = [
  'Access to selected Free content',
  'Selected Free Mind Player Originals',
  'Limited personal Mind creation',
  'Basic activity and progress tracking',
  'Access to the Feed and community',
  'Connect with other users',
  'Discover and book Mind Experts',
  'Join eligible Spaces and Events',
]
const FREE_NOT = [
  'Premium content',
  'Unlimited Mind creation',
  'AI Mind Coach',
  'Detailed insights and weekly summaries',
]
const PREMIUM_FEATURES = [
  'Full Music, Sounds & Visuals libraries',
  'Full Guided Content library',
  'Access to all Mind Player Originals',
  'Unlimited personal Mind creation',
  'Combine any available content',
  'Access to the AI Mind Coach',
  'Complete activity & progress tracking',
  'Detailed weekly summaries',
  'Personalized insights & recommendations',
]
const ENTERPRISE_FEATURES = [
  'Premium access for licensed users',
  'Complete content library',
  'AI Mind Coach with customized limits',
  'Centralized user & licence management',
  'Centralized billing',
  'Organization-level insights & reporting',
  'Private Spaces and Events',
  'Customized onboarding',
  'Mobile and VR access',
  'Priority support',
  'Custom content & experiences',
  'Technical integrations',
]

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
          <div className="mt-14 grid gap-6 lg:grid-cols-3 items-start">

            {/* Free */}
            <div className="rounded-3xl p-7 md:p-8 flex flex-col h-full"
              style={{ background: 'rgba(14,21,37,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-xl font-bold text-white">Free</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-4xl font-black text-white">$0</span>
                <span className="pb-1 text-sm text-[#8A90A0]">Free forever</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
                Experience the core of Mind Player and begin building better mental states.
              </p>
              <Link href="/early-access"
                className="mt-6 flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold tracking-[0.1em] uppercase text-white transition-colors duration-200"
                style={{ border: '1px solid rgba(93,235,255,0.4)' }}>
                Start Free
              </Link>
              <p className="mt-2 text-center text-xs text-[#8A90A0]">No credit card required.</p>

              <div className="mt-7 space-y-3">
                {FREE_INCLUDED.map(f => (
                  <div key={f} className="flex items-start gap-3 text-sm text-[#D5D9E2]"><Check /><span>{f}</span></div>
                ))}
                {FREE_NOT.map(f => (
                  <div key={f} className="flex items-start gap-3 text-sm text-[#6B7180]"><Dash /><span>{f}</span></div>
                ))}
              </div>
            </div>

            {/* Premium (highlighted) */}
            <div className="relative rounded-3xl p-7 md:p-8 flex flex-col h-full lg:-mt-4 overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(93,235,255,0.10) 0%, rgba(138,111,255,0.08) 40%, rgba(14,21,37,0.6) 100%)',
                border: '1px solid rgba(93,235,255,0.45)',
                boxShadow: '0 0 40px rgba(93,235,255,0.12)',
              }}>
              <div className="absolute top-5 right-5 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase text-[#070707]"
                style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)' }}>Most Popular</div>

              <h3 className="text-xl font-bold text-white">Premium</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-4xl font-black text-white">$12.99</span>
                <span className="pb-1 text-sm text-[#8A90A0]">/ month</span>
              </div>
              <p className="mt-1 text-sm text-[#B8B8B8]">or <span className="text-white font-semibold">$69.99 / year</span> · equivalent to $5.83/month</p>

              <div className="mt-4 rounded-xl px-4 py-3" style={{ background: 'rgba(93,235,255,0.08)', border: '1px solid rgba(93,235,255,0.25)' }}>
                <p className="text-xs tracking-[0.12em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>Limited Launch Offer</p>
                <p className="mt-1 text-sm text-white"><span className="font-bold">$59.99 / year</span> — first 250 Premium Annual members</p>
              </div>

              <Link href="/early-access"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold tracking-[0.1em] uppercase text-[#070707] transition-shadow duration-200"
                style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)', boxShadow: '0 0 28px rgba(93,235,255,0.3)' }}>
                Unlock Premium
              </Link>
              <p className="mt-2 text-center text-xs text-[#8A90A0]">AI Mind Coach usage limits apply. Cancel anytime.</p>

              <p className="mt-7 text-xs tracking-[0.14em] uppercase text-[#8A90A0]">Everything in Free, plus</p>
              <div className="mt-4 space-y-3">
                {PREMIUM_FEATURES.map(f => (
                  <div key={f} className="flex items-start gap-3 text-sm text-[#D5D9E2]"><Check /><span>{f}</span></div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-3xl p-7 md:p-8 flex flex-col h-full"
              style={{ background: 'rgba(14,21,37,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-xl font-bold text-white">Enterprise</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-4xl font-black text-white">Custom</span>
                <span className="pb-1 text-sm text-[#8A90A0]">pricing</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
                Bring Mind Player to your organization with a plan adapted to your number of users, goals and technical requirements.
              </p>
              <Link href="/contact"
                className="mt-6 flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold tracking-[0.1em] uppercase text-white transition-colors duration-200"
                style={{ border: '1px solid rgba(138,111,255,0.5)' }}>
                Contact Mind Player
              </Link>
              <p className="mt-2 text-center text-xs text-[#8A90A0]">Tailored commercial proposal.</p>

              <p className="mt-7 text-xs tracking-[0.14em] uppercase text-[#8A90A0]">Enterprise plans may include</p>
              <div className="mt-4 space-y-3">
                {ENTERPRISE_FEATURES.map(f => (
                  <div key={f} className="flex items-start gap-3 text-sm text-[#D5D9E2]"><Check /><span>{f}</span></div>
                ))}
              </div>
            </div>
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
              <Link href="/contact" className="text-sm font-semibold text-[#5DEBFF] hover:text-white transition-colors duration-200">
                Contact Mind Player →
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
