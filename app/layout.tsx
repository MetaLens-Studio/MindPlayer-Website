import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import CursorLight from '@/components/CursorLight'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SessionGuard from '@/components/SessionGuard'
import ErrorOverlay from '@/components/ErrorOverlay'

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
    default: 'MindPlayer — Your Mind. Limitless.',
    template: '%s | MindPlayer',
  },
  description: 'A mental state regulation platform — improve focus, recovery, sleep, and wellbeing through immersive experiences.',
  keywords: ['mental performance', 'focus', 'brainwave entrainment', 'spatial audio', 'VR wellness', 'sleep improvement', 'cognitive performance'],
  authors: [{ name: 'MindPlayer' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindplayer.app',
    siteName: 'MindPlayer',
    title: 'MindPlayer — Your Mind. Limitless.',
    description: 'Improve focus, recovery, sleep, and wellbeing through science-backed immersive experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MindPlayer — Immersive mental performance platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindPlayer — Your Mind. Limitless.',
    description: 'Improve focus, recovery, sleep, and wellbeing through science-backed immersive experiences.',
    images: ['/og-image.jpg'],
  },
}

const EARLY_ERROR_SCRIPT = `(function(){
  var STORE_KEY='_mp_err';
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function overlay(title,msg){
    var d=document.createElement('div');
    d.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:#090909;color:#fff;font-family:monospace;font-size:12px;padding:20px;z-index:2147483647;overflow-y:auto;white-space:pre-wrap;word-break:break-all;';
    d.innerHTML='<div style="color:#ff4444;font-size:15px;font-weight:bold;margin-bottom:10px">'+esc(title)+'</div>'
      +'<div style="color:#ffaa44;margin-bottom:14px">'+esc(msg)+'</div>'
      +'<button onclick="try{localStorage.removeItem(\''+STORE_KEY+'\')}catch(e){};location.reload()" style="background:#222;color:#fff;border:1px solid #444;padding:7px 14px;border-radius:5px;margin-right:8px;cursor:pointer">Clear & Reload</button>'
      +'<button onclick="this.parentElement.remove()" style="background:#222;color:#fff;border:1px solid #444;padding:7px 14px;border-radius:5px;cursor:pointer">Dismiss</button>';
    function attach(){document.body?document.body.appendChild(d):setTimeout(attach,50);}
    attach();
  }
  try{
    var prev=localStorage.getItem(STORE_KEY);
    if(prev){overlay('Error from previous session (reload to retry)',prev);}
  }catch(e){}
  window.onerror=function(msg,src,line,col,err){
    var text=err?(err.stack||err.message||msg):msg;
    text+='\\n\\n'+src+':'+line+':'+col;
    try{localStorage.setItem(STORE_KEY,text);}catch(e){}
    overlay('JS Error',text);
    return false;
  };
  window.addEventListener('unhandledrejection',function(e){
    var r=e.reason;
    var text=r?(r.stack||r.message||String(r)):'Unhandled promise rejection';
    try{localStorage.setItem(STORE_KEY,text);}catch(e2){}
    overlay('Promise Rejection',text);
  });
  window.addEventListener('load',function(){
    try{localStorage.removeItem(STORE_KEY);}catch(e){}
  });
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: EARLY_ERROR_SCRIPT }} />
      </head>
      <body>
        <LenisProvider>
          <SessionGuard />
          <ErrorOverlay />
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
