import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import CursorLight from '@/components/CursorLight'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SessionGuard from '@/components/SessionGuard'

const inter  = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070707',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mindplayer.app'),
  title: {
    default: 'Mind Player — Your Mind. Limitless.',
    template: '%s | Mind Player',
  },
  description: 'A mental state regulation platform — improve focus, recovery, sleep, and wellbeing through immersive experiences.',
  keywords: ['mental performance', 'focus', 'brainwave entrainment', 'spatial audio', 'VR wellness', 'sleep improvement', 'cognitive performance'],
  authors: [{ name: 'Mind Player' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindplayer.app',
    siteName: 'Mind Player',
    title: 'Mind Player — Your Mind. Limitless.',
    description: 'Improve focus, recovery, sleep, and wellbeing through science-backed immersive experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mind Player — Immersive mental performance platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mind Player — Your Mind. Limitless.',
    description: 'Improve focus, recovery, sleep, and wellbeing through science-backed immersive experiences.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <LenisProvider>
          <SessionGuard />
          <CursorLight />
          <Navbar />
          <div className="pt-0">
            {children}
          </div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
