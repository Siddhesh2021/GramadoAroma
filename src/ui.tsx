import { createContext, useContext, useEffect, useState, type ReactNode, type InputHTMLAttributes, type SyntheticEvent } from 'react'
import { ArrowRight, Star, Minus, Plus, Play, ShoppingBag } from 'lucide-react'
import { useCMS, brl, type Product, type Post, withImageFallback } from './cms'
import { useRouter } from './motion'

export const ArrowBtn = ({ children, onClick, dark = true, href, className = '' }: { children: ReactNode; onClick?: () => void; dark?: boolean; href?: string; className?: string }) => {
  const cls = `group relative inline-flex items-center gap-4 overflow-hidden border px-7 py-4 eyebrow transition-colors duration-700 ease-out-lux active:opacity-75 disabled:opacity-40 ${dark ? 'border-soft bg-soft text-cream hover:text-soft' : 'border-current text-current hover:text-soft'} ${className}`
  const inner = <>
    <span className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-lux group-hover:scale-y-100 ${dark ? 'bg-ivory' : 'bg-cream'}`} />
    <span className="relative">{children}</span>
    <span className="relative flex w-5 overflow-hidden"><ArrowRight strokeWidth={1} className="h-4 w-4 shrink-0 transition-transform duration-700 ease-lux group-hover:translate-x-full" /><ArrowRight strokeWidth={1} className="h-4 w-4 shrink-0 -translate-x-[200%] transition-transform duration-700 ease-lux group-hover:-translate-x-full" /></span>
  </>
  return href ? <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <button type="button" onClick={onClick} className={cls}>{inner}</button>
}

export const TextLink = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className="group tap-y relative eyebrow pb-1 active:opacity-60">{children}<span className="absolute bottom-0 left-0 h-px w-full origin-right bg-current transition-transform duration-700 ease-lux group-hover:scale-x-0 group-hover:origin-left" /><span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform delay-200 duration-700 ease-lux group-hover:scale-x-100" /></button>
)

export const Sparkle = ({ className = '' }: { className?: string }) => <svg viewBox="0 0 20 20" className={`h-3 w-3 ${className}`} fill="currentColor" aria-hidden><path d="M10 0c.6 5.2 4.8 9.4 10 10-5.2.6-9.4 4.8-10 10-.6-5.2-4.8-9.4-10-10C5.2 9.4 9.4 5.2 10 0z" /></svg>

export const Botanical = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 320" fill="none" stroke="currentColor" strokeWidth="0.8" className={className} aria-hidden>
    <path d="M100 318C96 240 92 160 112 6" />
    {[40, 80, 120, 160, 200, 240].map((y, i) => <g key={y}><path d={`M${104 - i} ${y + 30}c-30-8-52-30-58-56 26 4 48 24 58 56z`} /><path d={`M${106 - i} ${y + 10}c26-12 42-36 44-62-24 8-40 30-44 62z`} /></g>)}
  </svg>
)

export const Stars = ({ n }: { n: number }) => <span className="inline-flex gap-1 text-gold" aria-label={`${n}/5`}>{[1, 2, 3, 4, 5].map((i) => <Star key={i} strokeWidth={1} className={`h-3.5 w-3.5 ${i <= n ? 'fill-gold' : 'opacity-30'}`} />)}</span>

export const Logo = ({ light }: { light?: boolean }) => (
  <span className={`flex flex-col items-center leading-none ${light ? 'text-cream' : 'text-logo'}`}>
    <span className="font-script text-[1.9rem] leading-[0.8]">São Paulo</span>
    <span className="mt-1 text-[8px] tracking-[0.55em] pl-[0.55em]">AROMA</span>
  </span>
)

export const Qty = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => (
  <div className="inline-flex items-center border border-beige">
    <button aria-label="-" disabled={value <= 1} onClick={() => onChange(value - 1)} className="flex h-11 w-11 items-center justify-center transition hover:text-gold active:bg-gold/10 disabled:opacity-30"><Minus strokeWidth={1} className="h-3.5 w-3.5" /></button>
    <span className="w-8 text-center text-sm tabular-nums">{value}</span>
    <button aria-label="+" onClick={() => onChange(value + 1)} className="flex h-11 w-11 items-center justify-center transition hover:text-gold active:bg-gold/10"><Plus strokeWidth={1} className="h-3.5 w-3.5" /></button>
  </div>
)

export function Field({ label, error, textarea, className = '', ...p }: { label: string; error?: string; textarea?: boolean; className?: string } & InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>) {
  const id = 'f-' + label.replace(/\W/g, '')
  /* text-base (16px), never smaller — Android Chrome auto-zooms the viewport on
     focus when an input's font-size is under 16px and never zooms back out. */
  const cls = `peer w-full border-0 border-b bg-transparent px-0 pb-2 pt-7 text-base text-soft placeholder-transparent outline-none transition-colors duration-500 focus:border-gold ${error ? 'border-red-800/60' : 'border-beige'}`
  return (
    <div className={`relative ${className}`}>
      {textarea ? <textarea id={id} rows={4} placeholder={label} className={cls + ' resize-none'} {...p} /> : <input id={id} placeholder={label} className={cls} aria-invalid={!!error} aria-describedby={error ? id + '-err' : undefined} {...p} />}
      <label htmlFor={id} className="pointer-events-none absolute left-0 top-7 text-base text-taupe transition-all duration-500 ease-out-lux peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-[0.25em] peer-focus:uppercase peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.25em] peer-[:not(:placeholder-shown)]:uppercase">{label}</label>
      <span id={id + '-err'} role={error ? 'alert' : undefined} className={`absolute -bottom-5 left-0 text-[11px] text-red-900/80 transition-all duration-500 ${error ? 'opacity-100' : '-translate-y-1 opacity-0'}`}>{error}</span>
    </div>
  )
}

/* ---------------- cart ---------------- */
type Line = { id: string; qty: number }
type CartCtx = { lines: Line[]; add: (id: string, q?: number) => void; set: (id: string, q: number) => void; open: boolean; setOpen: (b: boolean) => void; toast: string; count: number }
const CC = createContext<CartCtx>(null!)
export const useCart = () => useContext(CC)
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => { try { return JSON.parse(localStorage.getItem('ga-cart') || '[]') } catch { return [] } }); const [open, setOpen] = useState(false); const [toast, setToast] = useState('')
  const { products, tr, t } = useCMS()
  const add = (id: string, q = 1) => {
    setLines((l) => l.find((x) => x.id === id) ? l.map((x) => x.id === id ? { ...x, qty: x.qty + q } : x) : [...l, { id, qty: q }])
    const p = products.find((x) => x.id === id); setToast(`${p ? tr(p.name) : ''} — ${t('pdp.added')}`); setTimeout(() => setToast(''), 2800)
  }
  const set = (id: string, q: number) => setLines((l) => q <= 0 ? l.filter((x) => x.id !== id) : l.map((x) => x.id === id ? { ...x, qty: q } : x))
  useEffect(() => { localStorage.setItem('ga-cart', JSON.stringify(lines)) }, [lines])
  return <CC.Provider value={{ lines, add, set, open, setOpen, toast, count: lines.reduce((a, b) => a + b.qty, 0) }}>{children}</CC.Provider>
}

export const Toast = () => {
  const { toast } = useCart()
  return <div role="status" aria-live="polite" className={`fixed bottom-[calc(1.5rem+var(--sab))] left-1/2 z-[75] max-w-[calc(100%-2rem)] -translate-x-1/2 bg-soft px-[max(1.5rem,var(--sal))] py-4 text-center text-sm text-cream transition-all duration-700 ease-out-lux ${toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}><Sparkle className="mr-3 inline text-gold-2" />{toast}</div>
}

/* ---------------- product cards ---------------- */
export function ProductCard({ p, tall, onQuick }: { p: Product; tall?: boolean; onQuick?: (p: Product) => void }) {
  const { tr, t, fragrances } = useCMS(); const { go } = useRouter(); const { add } = useCart()
  const f = fragrances.find((x) => x.id === p.frag)!
  return (
    <article className="group" itemScope itemType="https://schema.org/Product">
      <button onClick={() => go('/produto/' + p.id)} data-cursor="view" data-cursor-label={t('prod.view')} className="block w-full text-left" aria-label={tr(p.name)}>
        <div className="relative aspect-[4/5] overflow-hidden bg-mist">
          <img itemProp="image" loading="lazy" decoding="async" onError={withImageFallback} src={p.imgs[0]} alt={tr(p.name)} className="swap-press absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out-lux group-hover:scale-[1.04] group-active:scale-[1.02]" />
          <img loading="lazy" decoding="async" onError={withImageFallback} src={p.imgs[1]} alt="" className="swap-press absolute inset-0 h-full w-full scale-[1.12] object-cover opacity-0 transition-all duration-[700ms] ease-out-lux group-hover:scale-100 group-hover:opacity-100 group-active:scale-100 group-active:opacity-100" />
          {!p.stock && <span className="eyebrow absolute left-4 top-4 bg-cream/90 px-3 py-1.5 !text-[9px] text-taupe">{t('prod.out')}</span>}
          <span className="eyebrow absolute right-4 top-4 flex items-center gap-2 !text-[9px] text-cream mix-blend-difference"><span className="h-1.5 w-1.5 rounded-full" style={{ background: f.accent }} />{tr(f.name)}</span>
        </div>
      </button>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 itemProp="name" className="font-serif text-2xl leading-tight text-soft">{tr(p.name)}</h3>
          <p className="mt-1 text-xs tracking-wide text-taupe">{p.size} · {tr(f.notes).split('·')[0]}</p>
        </div>
        <div className="shrink-0 text-right" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="BRL" /><meta itemProp="price" content={String(p.price)} />
          <link itemProp="availability" href={p.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'} />
          <p className="text-sm tabular-nums text-soft">{brl(p.price)}</p>
          {onQuick && <button onClick={() => onQuick(p)} className="eyebrow tap-y mt-1 !text-[10px] text-gold opacity-100 transition duration-500 active:opacity-60 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">{t('prod.quick')}</button>}
        </div>
      </div>
      <button type="button" disabled={!p.stock} onClick={() => add(p.id)} className="group mt-5 flex w-full items-center justify-center gap-3 border border-soft/25 py-3.5 eyebrow !text-[10px] transition-colors duration-500 hover:border-soft hover:bg-soft hover:text-cream active:bg-soft active:text-cream disabled:cursor-not-allowed disabled:opacity-40">
        <ShoppingBag strokeWidth={1} className="h-3.5 w-3.5" />{p.stock ? t('prod.add') : t('prod.out')}
      </button>
    </article>
  )
}

/* Instagram tile — display-only, no outbound links */
export function IgTile({ post, className = '' }: { post: Post; className?: string }) {
  const { assets } = useCMS()
  const bx = ((16 + post.col * 203) / (1237 - 203)) * 100, by = ((9 + post.row * 270) / (887 - 270)) * 100
  return (
    <div role="img" aria-label={post.title} className={`group relative block overflow-hidden bg-mist ${className}`}>
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out-lux group-hover:scale-110" style={{ backgroundImage: `url(${assets.igGrid})`, backgroundSize: '609% 328%', backgroundPosition: `${bx}% ${by}%` }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-soft/0 text-cream opacity-0 transition-all duration-700 ease-out-lux group-hover:bg-soft/55 group-hover:opacity-100">
        {post.type === 'reel' ? <Play strokeWidth={1} className="h-6 w-6" /> : <Instagram strokeWidth={1} className="h-6 w-6" />}
        <span className="eyebrow !text-[9px]">{post.title}</span>
      </div>
      {post.type === 'reel' && <Play strokeWidth={1.2} className="absolute right-3 top-3 h-4 w-4 fill-cream/80 text-cream" />}
    </div>
  )
}

export function useScrolled(px = 40) {
  const [s, set] = useState(false)
  useEffect(() => { const f = () => set(scrollY > px); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [px])
  return s
}

type IP = { className?: string; strokeWidth?: number }
export const Instagram = ({ className = '', strokeWidth = 1 }: IP) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>
export const Facebook = ({ className = '', strokeWidth = 1 }: IP) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} aria-hidden><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>
