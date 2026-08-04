'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'

// ─────────────────────────────────────────────
// MindPlayer-themed GLSL shader
// Original structure by Matthias Hurrle (@atzedent)
// Colors replaced: orange/amber → cyan #5DEBFF / purple #8A6FFF / gold #FFD76A
// ─────────────────────────────────────────────
const SHADER = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);
}
float fbm(vec2 p){
  float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}
  return t;
}
float clouds(vec2 p){
  float d=1.,t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);d=a;p*=2./(i+1.);
  }
  return t;
}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.4,-st.y));

  // Pure time-driven animation — no cursor input touches the shader
  uv *= 1.-.3*(sin(T*.2)*.5+.5);

  // MindPlayer palette
  vec3 cyan   = vec3(0.365,0.922,1.000);   // #5DEBFF
  vec3 purple = vec3(0.541,0.435,1.000);   // #8A6FFF
  vec3 gold   = vec3(1.000,0.843,0.416);   // #FFD76A
  vec3 deepBg = vec3(0.042,0.115,0.200);   // slightly brighter deep-space base

  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);

    // Animate blend between cyan and purple
    float blend=sin(i*0.85+T*0.12)*0.5+0.5;
    vec3 themeColor=mix(cyan,purple,blend);
    // Sprinkle gold on select iterations
    themeColor=mix(themeColor,gold,max(0.,sin(i*2.1))*0.10);

    col+=.00125/d*themeColor*1.7;

    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)))*mix(cyan,purple,b)*1.2;

    // Deep-space background blend (replaces warm amber of original)
    col=mix(col,deepBg*bg*0.88,d*0.85);
  }

  // Vignette
  float vignette=smoothstep(1.4,0.3,length((FC-.5*R)/R));
  col*=vignette;

  O=vec4(col,1);
}`

// ─────────────────────────────────────────────
// Minimal WebGL renderer (no external deps)
// ─────────────────────────────────────────────
function buildRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2')
  if (!gl) return null

  const VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }

  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, SHADER)
  const prog = gl.createProgram()!
  gl.attachShader(prog, vs); gl.attachShader(prog, fs)
  gl.linkProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW)
  const pos = gl.getAttribLocation(prog, 'position')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  const uRes  = gl.getUniformLocation(prog, 'resolution')
  const uTime = gl.getUniformLocation(prog, 'time')

  return {
    render(now: number) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(prog)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, now * 1e-3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },
    destroy() {
      gl.deleteProgram(prog)
      gl.deleteShader(vs); gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    },
  }
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const sx = useSpring(mouseX, { stiffness: 60, damping: 22 })
  const sy = useSpring(mouseY, { stiffness: 60, damping: 22 })

  // WebGL render loop — desktop only
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Skip WebGL on mobile — too expensive for low-end devices
    if (window.innerWidth < 768) return

    const dpr = Math.max(1, window.devicePixelRatio * 0.6) // 0.6× for perf

    const resize = () => {
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const renderer = buildRenderer(canvas)
    if (!renderer) return

    let raf: number
    let paused = false

    const loop = (now: number) => {
      renderer.render(now)
      if (!paused) raf = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      if (document.hidden) { paused = true; cancelAnimationFrame(raf) }
      else { paused = false; raf = requestAnimationFrame(loop) }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (paused) { paused = false; raf = requestAnimationFrame(loop) }
      } else { paused = true; cancelAnimationFrame(raf) }
    }, { rootMargin: '200px' })
    io.observe(canvas)

    raf = requestAnimationFrame(loop)

    return () => {
      paused = true
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
      window.removeEventListener('resize', resize)
      renderer.destroy()
    }
  }, [])

  // Parallax — throttled
  const lastMove = useRef(0)
  const isMobileRef = useRef(false)
  useEffect(() => { isMobileRef.current = window.innerWidth < 768 }, [])
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobileRef.current) return
    if (Date.now() - lastMove.current < 28) return
    lastMove.current = Date.now()
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.width / 2)  / rect.width)  * 20)
    mouseY.set(((e.clientY - rect.height / 2) / rect.height) * 12)
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070707]"
      onMouseMove={onMouseMove}
    >
      {/* Mobile static gradient — no JS, no canvas */}
      <div
        className="md:hidden absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 20% 40%, rgba(93,235,255,0.18) 0%, transparent 55%), radial-gradient(ellipse 80% 70% at 80% 70%, rgba(138,111,255,0.15) 0%, transparent 55%), #070707',
        }}
      />

      {/* WebGL background — desktop only */}
      <canvas
        ref={canvasRef}
        className="hidden md:block absolute inset-0 h-full w-full touch-none"
      />

      {/* Dark vignette overlay so text stays readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(7,7,7,0.55) 100%)' }}
      />

      {/* Hero content — parallax layer */}
      <motion.div
        className="relative z-10 px-6 text-center max-w-5xl mx-auto"
        style={{ x: sx, y: sy, willChange: 'transform' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm text-[#B8B8B8]"
        >
          <span className="h-2 w-2 rounded-full bg-[#5DEBFF] animate-pulse" />
          The Future of Human Potential
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black leading-none tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}
        >
          <span className="block text-white">YOUR MIND.</span>
          <span className="block gradient-text">ON DEMAND.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#B8B8B8]"
        >
          A mental state regulation platform — designed to help you improve focus, recovery, sleep, and wellbeing through immersive experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          <button
            className="rounded-full px-6 md:px-9 py-3 md:py-4 text-sm font-bold tracking-[0.18em] uppercase text-[#070707] transition-shadow duration-200"
            style={{ background: 'linear-gradient(135deg, #5DEBFF, #8A6FFF)', boxShadow: '0 0 28px rgba(93,235,255,0.35)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 55px rgba(93,235,255,0.55)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(93,235,255,0.35)')}
          >
            Explore
          </button>
          <Link
            href="/early-access"
            className="rounded-full px-6 md:px-9 py-3 md:py-4 text-sm font-semibold tracking-[0.18em] uppercase text-white transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.18)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(93,235,255,0.5)'; e.currentTarget.style.color = '#5DEBFF' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff' }}
          >
            Get Early Access
          </Link>
        </motion.div>
      </motion.div>

    </section>
  )
}
