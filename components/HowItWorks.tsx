'use client'
import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { blurDataURLs } from '@/lib/imagePlaceholders'

const STEPS = [
  {
    num: '01',
    title: 'Choose Your Goal',
    desc: 'Select your desired outcome — focus, sleep, relaxation, recovery, or peak performance. Every journey starts with intention.',
    color: '#5DEBFF',
    tags: ['Focus', 'Sleep', 'Relaxation', 'Recovery', 'Performance'],
    image: '/images/step-goal.webp',
    imgW: 831, imgH: 449,
  },
  {
    num: '02',
    title: 'Understand Your Current State',
    desc: 'MindPlayer reads where you are right now — mentally and emotionally — so the experience meets you exactly where you need it.',
    color: '#8A6FFF',
    tags: ['State Sensing', 'Emotional Mapping', 'Real-time Insight'],
    image: '/images/step-state.webp',
    imgW: 725, imgH: 597,
  },
  {
    num: '03',
    title: 'Enter Immersive Experiences',
    desc: 'Step into precisely engineered environments — spatial audio, guided cues, and sensory design working in harmony to shift your mental state.',
    color: '#FFD76A',
    tags: ['Spatial Audio', 'Visual Depth', 'Guided Sessions'],
    image: '/images/step-immersive.webp',
    imgW: 799, imgH: 865,
  },
  {
    num: '04',
    title: 'Create Personalized Minds',
    desc: 'Build and save your own immersive mind sessions — a personal library of mental states designed by you, for you.',
    color: '#FF6B9D',
    tags: ['Custom Sessions', 'Personal Library', 'Your Blueprint'],
    image: '/images/step-create.webp',
    imgW: 845, imgH: 314,
  },
  {
    num: '05',
    title: 'Support Better Mental States',
    desc: 'Over time MindPlayer helps you build lasting mental resilience — better focus, deeper sleep, faster recovery, and lasting emotional balance.',
    color: '#5DEBFF',
    tags: ['Long-term Resilience', 'Progress Tracking', 'Mental Wellness'],
    image: '/images/step-support.webp',
    imgW: 868, imgH: 462,
  },
]

function TextBlock({ step }: { step: typeof STEPS[0] }) {
  return (
    <div>
      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
        {step.title}
      </h3>
      <p className="text-[#B8B8B8] leading-relaxed mb-4 md:mb-6 text-base md:text-lg">
        {step.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {step.tags.map((tag, j) => (
          <span
            key={j}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ color: step.color, background: `${step.color}0E`, border: `1px solid ${step.color}30` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function ImageBlock({ step }: { step: typeof STEPS[0] }) {
  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{
        border: `1px solid ${step.color}25`,
        boxShadow: `0 0 32px ${step.color}18`,
      }}
    >
      <Image
        src={step.image}
        alt={step.title}
        width={step.imgW}
        height={step.imgH}
        sizes="(max-width: 768px) 100vw, 45vw"
        quality={85}
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurDataURLs[step.image.replace('/images/', '')]}
        className="w-full h-auto block"
      />
    </div>
  )
}

// Mobile single-column step card
function MobileStepRow({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '0px 0px -15% 0px' })

  return (
    <motion.div
      ref={ref}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6 py-10 border-t"
      style={{ borderColor: `${step.color}20` }}
    >
      {/* Step node */}
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full font-display font-black text-sm flex-shrink-0"
          style={{
            background: `radial-gradient(circle, ${step.color}22, ${step.color}08)`,
            border: `2px solid ${step.color}`,
            color: step.color,
            boxShadow: `0 0 16px ${step.color}44`,
          }}
        >
          {step.num}
        </div>
        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }} />
      </div>

      <TextBlock step={step} />
      <ImageBlock step={step} />
    </motion.div>
  )
}

// Desktop 3-column row
function DesktopStepRow({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(nodeRef, { once: false, margin: '0px 0px -25% 0px' })

  const imageFromRight = index % 2 === 0
  const imageX = imageFromRight ? 120 : -120
  const textX = imageFromRight ? -80 : 80

  return (
    <div className="relative grid grid-cols-[1fr_48px_1fr] items-center min-h-screen py-12">
      {/* Left column */}
      <div className="pr-4">
        {imageFromRight ? (
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: textX }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full"
          >
            <TextBlock step={step} />
          </motion.div>
        ) : (
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageX }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="w-full"
          >
            <ImageBlock step={step} />
          </motion.div>
        )}
      </div>

      {/* Center node */}
      <div ref={nodeRef} className="flex justify-center items-center relative z-10">
        <motion.div
          animate={isInView
            ? { scale: 1, opacity: 1, boxShadow: `0 0 24px ${step.color}66, 0 0 48px ${step.color}33` }
            : { scale: 0.4, opacity: 0.3, boxShadow: 'none' }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-center w-12 h-12 rounded-full font-display font-black text-sm"
          style={{
            background: `radial-gradient(circle, ${step.color}22, ${step.color}08)`,
            border: `2px solid ${step.color}`,
            color: step.color,
          }}
        >
          {step.num}
        </motion.div>
      </div>

      {/* Right column */}
      <div className="pl-4">
        {imageFromRight ? (
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageX }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <ImageBlock step={step} />
          </motion.div>
        ) : (
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: textX }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full"
          >
            <TextBlock step={step} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ZigzagLines({ progress }: { progress: MotionValue<number> }) {
  const p1 = useTransform(progress, [0, 1], [0, 1])
  const p2 = useTransform(progress, [0.05, 1], [0, 1])
  const p3 = useTransform(progress, [0.1, 1], [0, 1])

  // Three wavy zigzag paths across left / center-left / right of the section
  const paths = [
    // Cyan — left sweep
    'M 180,0 C 380,280 120,560 360,840 C 120,1120 380,1400 140,1680 C 360,1960 120,2240 340,2520 C 120,2800 360,3000 200,3200',
    // Purple — center, wider swing
    'M 500,0 C 750,300 280,600 720,900 C 280,1200 750,1500 260,1800 C 740,2100 260,2400 720,2700 C 260,2900 680,3100 500,3200',
    // Gold — right sweep
    'M 820,0 C 620,280 880,560 640,840 C 880,1120 620,1400 860,1680 C 640,1960 880,2240 660,2520 C 880,2800 640,3000 800,3200',
  ]
  const colors  = ['#5DEBFF', '#8A6FFF', '#FFD76A']
  const opacities = [0.13, 0.11, 0.10]
  const progValues = [p1, p2, p3]

  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full"
      viewBox="0 0 1000 3200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={colors[i]}
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{
            pathLength: progValues[i],
            opacity: opacities[i],
            filter: `drop-shadow(0 0 4px ${colors[i]})`,
          }}
        />
      ))}
    </svg>
  )
}

export default function HowItWorks({ hideHeader }: { hideHeader?: boolean } = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="how-it-works"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0E1525 0%, #070707 100%)' }}
    >
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(138,111,255,0.05) 0%, transparent 70%)' }}
      />

      {!hideHeader && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 px-6 md:px-8 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: '#8A6FFF' }}>How It Works</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
            Five Steps to <span className="gradient-text">Mental Clarity</span>
          </h2>
        </motion.div>
      )}

      {/* Mobile layout */}
      <div className="md:hidden max-w-xl mx-auto px-6">
        {STEPS.map((step, i) => (
          <MobileStepRow key={i} step={step} index={i} />
        ))}
      </div>

      {/* Desktop layout */}
      <div ref={containerRef} className="hidden md:block max-w-7xl mx-auto px-8 relative">
        {/* Scroll-driven zigzag background lines */}
        <ZigzagLines progress={scrollYProgress} />

        {/* Background track */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />
        {/* Scroll-driven glowing line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px origin-top"
          style={{
            height: lineHeight,
            background: 'linear-gradient(to bottom, #5DEBFF, #8A6FFF, #FFD76A, #FF6B9D, #5DEBFF)',
            boxShadow: '0 0 6px rgba(93,235,255,0.7)',
          }}
        />
        {STEPS.map((step, i) => (
          <DesktopStepRow key={i} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}
