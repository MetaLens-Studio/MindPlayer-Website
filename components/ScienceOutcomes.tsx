'use client'
import RadialOrbitalTimeline from './RadialOrbitalTimeline'

// Simple inline SVG icon components
const FocusIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
  </svg>
)

const RecoveryIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
  </svg>
)

const BalanceIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <circle cx="12" cy="10" r="2" />
  </svg>
)

const PerformanceIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const CreativityIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const WellbeingIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

const OUTCOMES = [
  {
    id: 1,
    title: 'Better Focus',
    date: 'Cognitive',
    content: 'Reduce distractions and improve concentration. Science-backed audio environments help you enter deep work states faster and sustain attention for longer.',
    category: 'Cognitive',
    icon: FocusIcon,
    relatedIds: [4, 5],
    status: 'completed' as const,
    energy: 88,
  },
  {
    id: 2,
    title: 'Deeper Recovery',
    date: 'Physical',
    content: 'Support your body and mind to recover more effectively. Guided sessions designed around rest and restoration help you bounce back faster.',
    category: 'Physical',
    icon: RecoveryIcon,
    relatedIds: [3, 6],
    status: 'completed' as const,
    energy: 82,
  },
  {
    id: 3,
    title: 'Emotional Balance',
    date: 'Emotional',
    content: 'Reduce overwhelm and support emotional regulation. Immersive sound and environment design helps calm the nervous system and restore equilibrium.',
    category: 'Emotional',
    icon: BalanceIcon,
    relatedIds: [2, 6],
    status: 'completed' as const,
    energy: 79,
  },
  {
    id: 4,
    title: 'Higher Performance',
    date: 'Performance',
    content: 'Optimize your mental and cognitive performance. Activation-focused experiences prime your brain for peak output and sharper decision-making.',
    category: 'Performance',
    icon: PerformanceIcon,
    relatedIds: [1, 5],
    status: 'in-progress' as const,
    energy: 91,
  },
  {
    id: 5,
    title: 'More Creativity',
    date: 'Creative',
    content: 'Access flow states and unlock creative potential. Carefully crafted immersive environments reduce mental friction and open the door to inspiration.',
    category: 'Creative',
    icon: CreativityIcon,
    relatedIds: [1, 4],
    status: 'in-progress' as const,
    energy: 75,
  },
  {
    id: 6,
    title: 'Better Wellbeing',
    date: 'Wellbeing',
    content: 'Build a healthier relationship with your mind. Consistent use of MindPlayer supports long-term mental resilience, balance, and overall wellbeing.',
    category: 'Wellbeing',
    icon: WellbeingIcon,
    relatedIds: [2, 3],
    status: 'completed' as const,
    energy: 85,
  },
]

export default function ScienceOutcomes() {
  return (
    <section style={{ background: '#070707' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-4 text-center">
        <p className="mb-4 text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: '#5DEBFF' }}>Outcomes</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4">
          Better mental states<br />
          <span className="gradient-text">can support:</span>
        </h2>
        <p className="text-[#B8B8B8] max-w-xl mx-auto text-base md:text-lg">
          Tap any node to explore how each outcome connects to the science behind it.
        </p>
      </div>
      <RadialOrbitalTimeline timelineData={OUTCOMES} />
      <div className="max-w-2xl mx-auto px-6 md:px-8 pb-16 md:pb-20">
        <div
          className="rounded-xl px-5 py-4 text-center"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <span style={{ color: '#5DEBFF', fontWeight: 600 }}>Important: </span>
            Mind Player is not a medical treatment or replacement for professional healthcare. It is a platform designed to support mental state regulation and cognitive wellbeing in everyday life.
          </p>
        </div>
      </div>
    </section>
  )
}
