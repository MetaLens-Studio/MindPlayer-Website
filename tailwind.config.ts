import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#070707',
        'deep-blue': '#0E1525',
        'electric-cyan': '#5DEBFF',
        'soft-purple': '#8A6FFF',
        'warm-gold': '#FFD76A',
        'text-muted': '#B8B8B8',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-outfit)'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-12px) translateX(8px)' },
          '66%': { transform: 'translateY(8px) translateX(-5px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        'spin-slow': 'spinSlow 20s linear infinite',
        'spin-reverse': 'spinReverse 15s linear infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
      },
    },
  },
  plugins: [],
}
export default config
