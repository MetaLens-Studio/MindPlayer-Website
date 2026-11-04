'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import { CheckCheck } from 'lucide-react'

type Plan = {
  name: string
  kind: 'free' | 'paid' | 'custom'
  monthly?: number
  yearly?: number
  priceLabel?: string
  description: string
  cta: string
  href: string
  popular?: boolean
  includesTitle: string
  includes: string[]
  note?: string
}

const PLANS: Plan[] = [
  {
    name: 'Free',
    kind: 'free',
    monthly: 0,
    yearly: 0,
    description: 'Experience the core of Mind Player and begin building better mental states.',
    cta: 'Start Free',
    href: '/early-access',
    includesTitle: 'Free includes:',
    includes: [
      'Selected Free content & Originals',
      'Limited personal Mind creation',
      'Core immersive experiences',
    ],
    note: 'No credit card required.',
  },
  {
    name: 'Premium',
    kind: 'paid',
    monthly: 12.99,
    yearly: 69.99,
    popular: true,
    description: 'Unlock the complete Mind Player experience.',
    cta: 'Unlock Premium',
    href: '/early-access',
    includesTitle: 'Everything in Free, plus:',
    includes: [
      'Full Music, Sounds & Visuals libraries',
      'All Mind Player Originals',
      'Unlimited personal Mind creation',
      'Access to the AI Mind Coach',
    ],
    note: 'AI Mind Coach usage limits apply. Cancel anytime.',
  },
  {
    name: 'Enterprise',
    kind: 'custom',
    priceLabel: 'Custom',
    description: 'Bring Mind Player to your organization with a plan adapted to your needs.',
    cta: 'Contact Mind Player',
    href: '/contact',
    includesTitle: 'Enterprise may include:',
    includes: [
      'Premium access for licensed users',
      'AI Mind Coach with custom limits',
      'Centralized billing & user management',
      'Organization-level insights & reporting',
      'Customized onboarding & priority support',
    ],
    note: 'Tailored commercial proposal.',
  },
]

function Toggle({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex justify-center">
      <div className="relative flex w-fit rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {(['Monthly', 'Yearly'] as const).map((label, i) => {
          const active = yearly === (i === 1)
          return (
            <button
              key={label}
              onClick={() => onChange(i === 1)}
              className="relative z-10 flex items-center gap-2 rounded-full px-5 sm:px-6 h-11 text-sm font-semibold transition-colors duration-200"
              style={{ color: active ? '#070707' : '#B8B8B8' }}
            >
              {active && (
                <motion.span
                  layoutId="pricing-switch"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative">{label}</span>
              {label === 'Yearly' && (
                <span className="relative rounded-full px-2 py-0.5 text-[11px] font-bold"
                  style={{ background: active ? 'rgba(7,7,7,0.18)' : 'rgba(93,235,255,0.15)', color: active ? '#070707' : '#5DEBFF' }}>
                  Save 55%
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function PricingPlans() {
  const [yearly, setYearly] = useState(false)

  return (
    <div>
      <Toggle yearly={yearly} onChange={setYearly} />

      <div className="mt-12 grid gap-6 lg:grid-cols-3 items-center">
        {PLANS.map(plan => {
          const popular = plan.popular
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl p-7 md:p-8 h-full transition-transform duration-300 ${popular ? 'lg:scale-[1.06] z-10' : ''}`}
              style={
                popular
                  ? {
                      background: 'linear-gradient(160deg, rgba(93,235,255,0.12) 0%, rgba(138,111,255,0.10) 42%, rgba(10,15,30,0.85) 100%)',
                      border: '1px solid rgba(93,235,255,0.5)',
                      boxShadow: '0 0 50px rgba(93,235,255,0.15)',
                    }
                  : { background: 'rgba(14,21,37,0.5)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              <div>
                {popular && (
                  <span className="inline-block mb-4 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.12em] uppercase text-[#070707]"
                    style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)' }}>
                    Most Popular
                  </span>
                )}

                {/* Price */}
                <div className="flex items-baseline">
                  {plan.kind === 'custom' ? (
                    <span className="font-display text-4xl font-black text-white">Custom</span>
                  ) : plan.kind === 'free' ? (
                    <span className="font-display text-4xl font-black text-white">$0</span>
                  ) : (
                    <span className="font-display text-4xl font-black text-white flex items-baseline">
                      <NumberFlow
                        value={yearly ? plan.yearly! : plan.monthly!}
                        locales="en-US"
                        format={{ style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }}
                      />
                    </span>
                  )}
                  <span className="ml-1.5 text-sm text-[#8A90A0]">
                    {plan.kind === 'custom' ? 'pricing' : plan.kind === 'free' ? 'forever' : `/ ${yearly ? 'year' : 'month'}`}
                  </span>
                </div>
                {plan.kind === 'paid' && yearly && (
                  <p className="mt-1 text-sm text-[#8A90A0]">Equivalent to $5.83 / month — save 55%</p>
                )}
                {plan.kind === 'paid' && !yearly && (
                  <p className="mt-1 text-sm text-[#8A90A0]">or $69.99 / year — save 55%</p>
                )}

                {/* Launch offer — highlighted */}
                {plan.kind === 'paid' && (
                  <div
                    className="mt-4 rounded-2xl px-4 py-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(93,235,255,0.16), rgba(138,111,255,0.16))',
                      border: '1px solid rgba(93,235,255,0.55)',
                      boxShadow: '0 0 24px rgba(93,235,255,0.18)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-black tracking-[0.12em] uppercase text-[#070707]"
                        style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)' }}>
                        Launch Offer
                      </span>
                      <span className="text-sm font-black text-white">$59.99 / year</span>
                    </div>
                    <p className="mt-1.5 text-xs font-semibold text-[#5DEBFF]">
                      First 250 users only · Save 64%
                    </p>
                  </div>
                )}

                {/* Name + description */}
                <h3 className="mt-5 text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">{plan.description}</p>

                {/* Includes */}
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 className="mb-4 text-sm font-semibold text-white">{plan.includesTitle}</h4>
                  <ul className="space-y-3">
                    {plan.includes.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          className="grid place-content-center h-6 w-6 shrink-0 rounded-full"
                          style={
                            popular
                              ? { background: 'rgba(93,235,255,0.18)', border: '1px solid rgba(93,235,255,0.5)', color: '#5DEBFF' }
                              : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#5DEBFF' }
                          }
                        >
                          <CheckCheck className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm text-[#D5D9E2]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href={plan.href}
                  className="flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold tracking-[0.1em] uppercase transition-shadow duration-200"
                  style={
                    popular
                      ? { background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)', color: '#070707', boxShadow: '0 0 28px rgba(93,235,255,0.3)' }
                      : { border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }
                  }
                >
                  {plan.cta}
                </Link>
                {plan.note && <p className="mt-2 text-center text-xs text-[#8A90A0]">{plan.note}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
