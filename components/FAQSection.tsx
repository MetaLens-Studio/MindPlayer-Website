'use client'
import { useEffect, useState } from 'react'

const STYLE_ID = 'mindplayer-faq-animations'

const FAQS = [
  {
    question: 'What is Mind Player?',
    answer: 'Mind Player is a mental state regulation platform. It combines sound, immersive environments, and guidance into experiences designed to shift how you feel — helping you access focus, calm, sleep, energy, or clarity on demand.',
    meta: 'Overview',
  },
  {
    question: 'Is Mind Player a meditation app?',
    answer: 'No. Meditation requires practice and discipline. Mind Player is designed to work without effort — you simply enter the experience and let the environment do the work. No training needed.',
    meta: 'About',
  },
  {
    question: 'How does Mind Player work?',
    answer: 'Mind Player uses a combination of spatial audio, curated sound design, visual environments, and guided cues to influence your nervous system and shift your mental state. The experiences are designed around scientific principles — not beliefs or rituals.',
    meta: 'How It Works',
  },
  {
    question: 'What are Minds?',
    answer: 'Minds are individual experiences within Mind Player — each one designed to support a specific mental state. There are Minds for focus, sleep, calm, recovery, energy, and more.',
    meta: 'Features',
  },
  {
    question: 'Is there science behind Mind Player?',
    answer: 'Yes. Mind Player draws on research in cognitive performance, attention regulation, stress and nervous system science, environmental psychology, music and emotional regulation, spatial audio, and neuroplasticity. We apply this research practically — not theoretically.',
    meta: 'Science',
  },
  {
    question: 'Who is Mind Player for?',
    answer: 'Anyone who wants more control over how they feel. People use Mind Player to get into focus before deep work, decompress after a hard day, fall asleep faster, or recover mentally and physically.',
    meta: 'Audience',
  },
  {
    question: 'Who created Mind Player?',
    answer: 'Mind Player was created by a small team obsessed with the gap between how people feel and how they want to feel. We believe the tools to close that gap should be accessible to everyone.',
    meta: 'Team',
  },
  {
    question: 'Does Mind Player require VR?',
    answer: 'No. Mind Player is designed to work across devices — mobile, desktop, and VR. You can access the experiences wherever you are, with whatever you have.',
    meta: 'Platform',
  },
  {
    question: 'Is Mind Player a medical treatment?',
    answer: 'No. Mind Player is not a medical device, therapy, or treatment. It is a tool for mental state regulation and wellbeing. If you have a medical or psychological condition, please consult a qualified professional.',
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
