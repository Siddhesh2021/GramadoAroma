import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

/* Motion system
   A single native-scroll state drives every scroll effect. Parallax geometry is
   cached and refreshed only when layout can change, keeping animation work on
   the compositor without making React rerender on every frame. */
export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

type ScrollSubscriber = (y: number) => void
const subs = new Set<ScrollSubscriber>()
let smooth = 0
let started = false

function loop() {
  const target = window.scrollY
  const ease = reduced() ? 1 : 0.12
  smooth += (target - smooth) * ease
  if (Math.abs(target - smooth) < 0.05) smooth = target
  subs.forEach((fn) => fn(smooth))
  requestAnimationFrame(loop)
}

export function useSmoothScroll(fn: ScrollSubscriber) {
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    const subscriber = (y: number) => fnRef.current(y)
    if (!started) {
      started = true
      smooth = window.scrollY
      requestAnimationFrame(loop)
    }
    subs.add(subscriber)
    return () => subs.delete(subscriber)
  }, [])
}

/* Viewport-progress parallax.
   Geometry is cached; transforms never participate in document flow. */
export function Parallax({ speed = 0.15, className = '', children, scale, mobileOnly = false }: { speed?: number; className?: string; children: ReactNode; scale?: number; mobileOnly?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const geometry = useRef({ top: 0, height: 1, ready: false })
  const visible = useRef(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const refresh = () => {
      const parent = el.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      geometry.current = {
        top: rect.top + window.scrollY,
        height: Math.max(1, rect.height),
        ready: true,
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
    }, { rootMargin: '250px' })
    io.observe(el)

    const ro = new ResizeObserver(refresh)
    ro.observe(el.parentElement || el)
    addEventListener('resize', refresh, { passive: true })
    addEventListener('orientationchange', refresh, { passive: true })
    requestAnimationFrame(refresh)

    return () => {
      io.disconnect()
      ro.disconnect()
      removeEventListener('resize', refresh)
      removeEventListener('orientationchange', refresh)
    }
  }, [])

  useSmoothScroll((y) => {
    const el = ref.current
    const g = geometry.current
    if (!el || !g.ready || !visible.current || reduced()) return

    const mobile = window.innerWidth < 768
    if (mobileOnly && !mobile) {
      el.style.transform = scale ? `scale(${scale})` : ''
      return
    }

    const range = mobile
      ? Math.min(28, Math.max(8, Math.abs(speed) * 120))
      : Math.min(80, Math.max(12, Math.abs(speed) * 320))
    const progress = (y + window.innerHeight - g.top) / (window.innerHeight + g.height)
    const centered = Math.max(-1, Math.min(1, progress * 2 - 1))
    const offset = -centered * range * Math.sign(speed || 1)

    el.style.transform = `translate3d(0,${offset.toFixed(2)}px,0)${scale ? ` scale(${scale})` : ''}`
  })

  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>
}

// Reveal: adds .in once when entering the viewport — drives .mline / .fade-up / .clip
export function Reveal({ as: Tag = 'div', className = '', children, threshold = 0.2, ...rest }: { as?: ElementType; className?: string; children: ReactNode; threshold?: number; [k: string]: unknown }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current!; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold })
    io.observe(el); return () => io.disconnect()
  }, [threshold])
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>
}

export const Lines = ({ lines, delay = 0, step = 0.09 }: { lines: ReactNode[]; delay?: number; step?: number }) => (
  <>{lines.map((l, i) => <span key={i} className="mline"><span style={{ transitionDelay: `${delay + i * step}s` }}>{l}</span></span>)}</>
)

/* Cursor: small dot + ring that lerps behind. Elements opt in via data-cursor="view|drag|link". */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState(''); const [mode, setMode] = useState('')
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.body.classList.add('has-cursor')
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      const t = (e.target as HTMLElement).closest?.('[data-cursor],a,button,input,textarea,select,label') as HTMLElement | null
      const m = t?.dataset.cursor || (t ? 'link' : '')
      setMode(m); setLabel(t?.dataset.cursorLabel || '')
    }
    const tick = () => { rx += (x - rx) * 0.14; ry += (y - ry) * 0.14
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`
      raf = requestAnimationFrame(tick) }
    addEventListener('pointermove', move); tick()
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); document.body.classList.remove('has-cursor') }
  }, [])
  const big = mode === 'view' || mode === 'drag'
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden [@media(pointer:fine)]:block">
      <div ref={dot} className="absolute left-0 top-0"><div className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-gold transition-all duration-500 ease-out-lux ${big ? 'h-0 w-0' : 'h-1.5 w-1.5'}`} /></div>
      <div ref={ring} className="absolute left-0 top-0">
        <div className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-700 ease-out-lux ${big ? 'h-24 w-24 border-transparent bg-soft/85 backdrop-blur-sm' : mode === 'link' ? 'h-12 w-12 border-gold/60' : 'h-8 w-8 border-soft/25'}`}>
          <span className={`eyebrow !text-[9px] text-cream transition-opacity duration-300 ${big ? 'opacity-100' : 'opacity-0'}`}>{label || (mode === 'drag' ? '← →' : '')}</span>
        </div>
      </div>
    </div>
  )
}

/* Router + curtain page transition: ivory panel wipes up over the page, route swaps, panel continues up and out. */
type RouterCtx = { path: string; go: (p: string) => void }
const RC = createContext<RouterCtx>(null!)
export const useRouter = () => useContext(RC)
const read = () => location.hash.replace(/^#/, '') || '/'
export function Router({ children }: { children: (path: string) => ReactNode }) {
  const [path, setPath] = useState(read)
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')
  const [label, setLabel] = useState('')
  useEffect(() => { const f = () => setPath(read()); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  const go = (p: string) => {
    if (p === path) { scrollTo({ top: 0, behavior: 'smooth' }); return }
    if (reduced()) { location.hash = p; scrollTo(0, 0); return }
    setLabel(p === '/' ? 'Gramado Aroma' : p.split('/')[1].replace(/-/g, ' '))
    setPhase('cover')
    setTimeout(() => { location.hash = p; setPath(p); scrollTo(0, 0); setPhase('reveal') }, 900)
    setTimeout(() => setPhase('idle'), 1900)
  }
  return (
    <RC.Provider value={{ path, go }}>
      {children(path)}
      <div aria-hidden className={`fixed inset-0 z-[70] flex items-center justify-center bg-ivory transition-transform duration-[900ms] ease-lux ${phase === 'idle' ? 'pointer-events-none translate-y-full' : phase === 'cover' ? 'translate-y-0' : '-translate-y-full'}`}>
        <span className={`font-serif text-4xl italic text-soft transition-all duration-700 ease-out-lux ${phase === 'cover' ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-6 opacity-0'}`}>{label}</span>
      </div>
      {phase === 'idle' && null}
    </RC.Provider>
  )
}

/* Loader: letters rise through a mask, a gold hairline counts 0→100, then the panel splits as an arch opening onto the hero. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0); const [out, setOut] = useState(false); const [ready, setReady] = useState(false)
  useEffect(() => {
    if (reduced()) { onDone(); return }
    requestAnimationFrame(() => setReady(true))
    const t0 = performance.now(); let raf = 0
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / 2400); setN(Math.round((1 - Math.pow(1 - p, 3)) * 100)); if (p < 1) raf = requestAnimationFrame(tick); else { setTimeout(() => setOut(true), 250); setTimeout(onDone, 1650) } }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [])
  const word = (w: string, d: number) => <span className="flex overflow-hidden">{w.split('').map((c, i) => <span key={i} className="inline-block transition-transform duration-[1200ms] ease-out-lux" style={{ transform: ready ? 'none' : 'translateY(105%)', transitionDelay: `${d + i * 0.06}s` }}>{c}</span>)}</span>
  return (
    <div role="status" aria-label="Carregando Gramado Aroma" className="fixed inset-0 z-[90]">
      <div className={`absolute inset-x-0 top-0 h-1/2 bg-ivory transition-transform duration-[1300ms] ease-lux ${out ? '-translate-y-full' : ''}`} />
      <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-ivory transition-transform duration-[1300ms] ease-lux ${out ? 'translate-y-full' : ''}`} />
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out-lux ${out ? 'scale-95 opacity-0' : ''}`}>
        <div className={`mb-6 h-px bg-gold transition-all duration-[1600ms] ease-out-lux ${ready ? 'w-10' : 'w-0'}`} />
        <div className="font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[0.18em] text-soft">{word('GRAMADO', 0.1)}</div>
        <div className="mt-3 text-[clamp(.8rem,1.4vw,1.1rem)] tracking-[0.9em] text-taupe">{word('AROMA', 0.6)}</div>
        <div className="absolute bottom-12 left-1/2 w-48 -translate-x-1/2">
          <div className="h-px w-full bg-beige"><div className="h-px bg-gold" style={{ width: `${n}%` }} /></div>
          <div className="eyebrow mt-3 flex justify-between text-taupe"><span>Gramado · RS</span><span className="tabular-nums">{String(n).padStart(3, '0')}</span></div>
        </div>
      </div>
    </div>
  )
}
