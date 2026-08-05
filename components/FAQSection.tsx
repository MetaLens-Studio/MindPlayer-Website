'use client'
import { useEffect, useState } from 'react'

const STYLE_ID = 'mindplayer-faq-animations'

const FAQS = [
  {
    question: 'What is Mind Player?',
    answer: 'Mind Player is a platform designed to help you control how you feel, think and perform — on demand. It combines immersive sound, visual environments and guided experiences to help you shift your mental state when you need it. Whether you need to focus, sleep, recover or find calm — Mind Player gives you a way to get there intentionally.',
    meta: 'Overview',
  },
  {
    question: 'Is Mind Player a meditation app?',
    answer: 'No. Mind Player is not a meditation app. It doesn\'t require you to sit still, clear your mind or follow a spiritual practice. Mind Player is about intentional mental state change — using immersive sound, environments and AI-guided experiences to help you move from how you feel now to how you need to feel. It\'s designed for performance, recovery and everyday mental clarity.',
    meta: 'About',
  },
  {
    question: 'How does Mind Player work?',
    answer: 'Three steps. First, you tell Mind Player what you need — focus, sleep, calm, energy or creativity. Then you describe how you feel right now. Mind Player matches you with an immersive experience — a Mind — designed to help you shift from your current state to your desired one. The more you use it, the better it understands you.',
    meta: 'How It Works',
  },
  {
    question: 'What are Minds?',
    answer: 'Minds are immersive experiences designed to support a specific mental state. A Mind can combine music, spatial sound, immersive visuals and guided sessions into one cohesive experience. Some Minds have a defined duration — like a 20-minute focus session. Others play continuously as a background environment while you work, rest or sleep. Every Mind is designed with a purpose — not just to sound good, but to help shift how you feel.',
    meta: 'Features',
  },
  {
    question: 'Is there science behind Mind Player?',
    answer: 'Yes. Mind Player is built on research in cognitive performance, attention regulation, stress and the nervous system, sleep science, environmental psychology and spatial audio. Every product decision — from the frequencies used in our audio to the design of our visual environments — is informed by this research. Mind Player is not a medical treatment. But it is built on a serious body of scientific knowledge about how sound, environment and sensory input influence mental state.',
    meta: 'Science',
  },
  {
    question: 'Who is Mind Player for?',
    answer: 'Mind Player is for anyone whose brain has to perform under pressure. Professionals who need sustained focus. Students facing exam stress. Athletes managing recovery and mental readiness. Creators looking for flow. High performers who need to be consistently at their best. And anyone who simply finds it hard to switch off at the end of the day.',
    meta: 'Audience',
  },
  {
    question: 'Who created Mind Player?',
    answer: 'Mind Player was created by Jaime Inglez, a medical doctor with a background in health, performance and wellbeing. After years of observing how mental state affects focus, recovery and performance across very different types of people, Jaime became interested in a simple question: what if there was a way to intentionally shift mental state — not through willpower or habit alone, but through immersive technology designed specifically for that purpose? Mind Player is the answer to that question.',
    meta: 'Team',
  },
  {
    question: 'Does Mind Player require VR?',
    answer: 'No. Mind Player works on any smartphone. VR enhances the experience by creating fully immersive environments — but it is optional, not required. The core product is designed to deliver value on mobile, with or without VR.',
    meta: 'Platform',
  },
  {
    question: 'Is Mind Player a medical treatment?',
    answer: 'No. Mind Player is not a medical treatment, a clinical tool or a replacement for professional healthcare. It is a platform designed to support mental state regulation and cognitive wellbeing in everyday life. If you are experiencing mental health issues, please consult a qualified healthcare professional.',
    meta: 'Medical',
  },
]

export default function FAQSection({ hideHeader }: { hideHeader?: boolean } = {}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [introReady, setIntroReady] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.innerHTML = `
        @keyframes mp-faq-fade-up {
          0% { transform:translate3d(0,20px,0); opacity:0; filter:blur(6px); }
          60% { filter:blur(0); }
          100% { transform:translate3d(0,0,0); opacity:1; filter:blur(0); }
        }
        @keyframes mp-beam-spin {
          0% { transform:rotate(0deg); }
          100% { transform:rotate(360deg); }
        }
        @keyframes mp-pulse-ring {
          0% { transform:scale(0.7); opacity:0.55; }
          60% { opacity:0.1; }
          100% { transform:scale(1.25); opacity:0; }
        }
        @keyframes mp-meter {
          0%,20% { transform:scaleX(0); transform-origin:left; }
          45%,60% { transform:scaleX(1); transform-origin:left; }
          80%,100% { transform:scaleX(0); transform-origin:right; }
        }
        @keyframes mp-tick {
          0%,30% { transform:translateX(-6px); opacity:0.4; }
          50% { transform:translateX(2px); opacity:1; }
          100% { transform:translateX(20px); opacity:0; }
        }
        .mp-faq-intro {
          position:relative; display:flex; align-items:center; gap:0.85rem;
          padding:0.85rem 1.4rem; border-radius:9999px; overflow:hidden;
          border:1px solid rgba(93,235,255,0.2); background:rgba(93,235,255,0.05);
          color:rgba(93,235,255,0.85); text-transform:uppercase; letter-spacing:0.35em;
          font-size:0.65rem; width:100%; max-width:22rem; margin:0 auto;
          opacity:0; transform:translate3d(0,12px,0); filter:blur(8px);
          transition:opacity 720ms ease, transform 720ms ease, filter 720ms ease; isolation:isolate;
        }
        .mp-faq-intro--active { opacity:1; transform:translate3d(0,0,0); filter:blur(0); }
        .mp-faq-intro__beam, .mp-faq-intro__pulse { position:absolute; inset:-110%; pointer-events:none; border-radius:50%; }
        .mp-faq-intro__beam {
          background:conic-gradient(from 160deg,rgba(93,235,255,0.25),transparent 32%,rgba(138,111,255,0.22) 58%,transparent 78%,rgba(93,235,255,0.18));
          animation:mp-beam-spin 18s linear infinite; opacity:0.6;
        }
        .mp-faq-intro__pulse { border:1px solid rgba(93,235,255,0.4); opacity:0.25; animation:mp-pulse-ring 3.4s ease-out infinite; }
        .mp-faq-intro__label { position:relative; z-index:1; font-weight:600; letter-spacing:0.4em; }
        .mp-faq-intro__meter {
          position:relative; z-index:1; flex:1 1 auto; height:1px;
          background:linear-gradient(90deg,transparent,rgba(93,235,255,0.7) 35%,transparent 85%);
          transform:scaleX(0); transform-origin:left;
          animation:mp-meter 5.8s ease-in-out infinite; opacity:0.7;
        }
        .mp-faq-intro__tick {
          position:relative; z-index:1; width:0.55rem; height:0.55rem; border-radius:9999px;
          background:rgba(93,235,255,0.9); box-shadow:0 0 0 4px rgba(93,235,255,0.15);
          animation:mp-tick 3.2s ease-in-out infinite;
        }
        .mp-faq-wrap { opacity:0; transform:translate3d(0,24px,0); filter:blur(12px); }
        .mp-faq-wrap--ready { animation:mp-faq-fade-up 860ms cubic-bezier(0.22,0.68,0,1) forwards; }
      `
      document.head.appendChild(style)
    }
    const frame = requestAnimationFrame(() => setIntroReady(true))
    const onLoad = () => setTimeout(() => setHasEntered(true), 120)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => cancelAnimationFrame(frame)
  }, [])

  const setGlow = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--faq-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--faq-y', `${e.clientY - rect.top}px`)
  }
  const clearGlow = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.removeProperty('--faq-x')
    e.currentTarget.style.removeProperty('--faq-y')
  }

  return (
    <section
      id="faq"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #070707 0%, #0E1525 50%, #070707 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(93,235,255,0.06) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 -left-20 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(138,111,255,0.06) 0%, transparent 65%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 80% at 10% 0%, rgba(93,235,255,0.05), transparent 65%)', mixBlendMode: 'screen' }} />
      </div>

      <div className={`relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-6 py-24 lg:max-w-5xl lg:px-12 mp-faq-wrap ${hasEntered ? 'mp-faq-wrap--ready' : ''}`}>

        {/* Intro pill */}
        <div className={`mp-faq-intro ${introReady ? 'mp-faq-intro--active' : ''}`}>
          <span className="mp-faq-intro__beam" aria-hidden="true" />
          <span className="mp-faq-intro__pulse" aria-hidden="true" />
          <span className="mp-faq-intro__label">MindPlayer FAQ</span>
          <span className="mp-faq-intro__meter" aria-hidden="true" />
          <span className="mp-faq-intro__tick" aria-hidden="true" />
        </div>

        {/* Header */}
        {!hideHeader && (
          <header className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'rgba(93,235,255,0.6)' }}>Questions</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
              Everything you need to <span className="gradient-text">know.</span>
            </h2>
            <p className="max-w-xl text-base" style={{ color: '#B8B8B8' }}>
              Clear answers about MindPlayer — what it is, how it works, and how to get started.
            </p>
          </header>
        )}

        {/* Items */}
        <ul className="space-y-4">
          {FAQS.map((item, index) => {
            const open = activeIndex === index
            return (
              <li
                key={item.question}
                className="group relative overflow-hidden rounded-3xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5"
                style={{
                  border: open ? '1px solid rgba(93,235,255,0.25)' : '1px solid rgba(255,255,255,0.07)',
                  background: open ? 'rgba(93,235,255,0.04)' : 'rgba(255,255,255,0.025)',
                  boxShadow: open ? '0 36px 140px -60px rgba(93,235,255,0.12)' : '0 8px 40px -20px rgba(0,0,0,0.5)',
                }}
                onMouseMove={setGlow}
                onMouseLeave={clearGlow}
              >
                {/* Radial glow follow */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  style={{ background: 'radial-gradient(240px circle at var(--faq-x,50%) var(--faq-y,50%), rgba(93,235,255,0.06), transparent 70%)' }}
                />

                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActiveIndex(prev => prev === index ? null : index)}
                  className="relative flex w-full items-start gap-6 px-8 py-7 text-left"
                >
                  {/* Icon */}
                  <span
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-105"
                    style={{
                      border: open ? '1px solid rgba(93,235,255,0.45)' : '1px solid rgba(255,255,255,0.1)',
                      background: open ? 'rgba(93,235,255,0.1)' : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {open && (
                      <span className="pointer-events-none absolute inset-0 rounded-full animate-ping"
                        style={{ border: '1px solid rgba(93,235,255,0.3)', opacity: 0.4 }} />
                    )}
                    <svg
                      className="relative h-5 w-5 transition-transform duration-500"
                      style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', color: open ? '#5DEBFF' : 'rgba(255,255,255,0.4)' }}
                      viewBox="0 0 24 24" fill="none"
                    >
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>

                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <h3 className="text-lg font-semibold leading-tight sm:text-xl text-white">
                        {item.question}
                      </h3>
                      <span
                        className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em] sm:ml-auto transition-all duration-300"
                        style={{
                          border: open ? '1px solid rgba(93,235,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                          color: open ? '#5DEBFF' : 'rgba(184,184,184,0.5)',
                          background: open ? 'rgba(93,235,255,0.08)' : 'transparent',
                        }}
                      >
                        {item.meta}
                      </span>
                    </div>

                    <div
                      className="overflow-hidden text-sm leading-relaxed transition-[max-height] duration-500 ease-out"
                      style={{ maxHeight: open ? '16rem' : '0', color: '#B8B8B8' }}
                    >
                      <p className="pr-2 pb-1">{item.answer}</p>
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
