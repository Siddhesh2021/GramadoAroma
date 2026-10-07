import { useEffect, useRef, useState } from 'react'
import { ShoppingBag, X, MessageCircle, ArrowLeft } from 'lucide-react'
import { useCMS, brl } from './cms'
import { useRouter } from './motion'
import { Instagram, Facebook, Logo, useCart, useScrolled, Qty, ArrowBtn, Field, Sparkle, Botanical } from './ui'

export const LangSwitch = ({ light }: { light?: boolean }) => {
  const { lang, setLang } = useCMS()
  return (
    <div className={`eyebrow flex items-center gap-2 !text-[10px] ${light ? 'text-cream' : 'text-soft'}`} role="group" aria-label="Idioma / Language">
      {(['pt', 'en'] as const).map((l, i) => <span key={l} className="flex items-center gap-2">{i > 0 && <span className="opacity-40">|</span>}<button aria-pressed={lang === l} onClick={() => setLang(l)} className={`relative transition-opacity duration-500 ${lang === l ? '' : 'opacity-45 hover:opacity-100'}`}>{l.toUpperCase()}<span className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-700 ease-lux ${lang === l ? 'scale-x-100' : 'scale-x-0'}`} /></button></span>)}
    </div>
  )
}

export function WhatsAppFab() {
  const { settings } = useCMS()
  return (
    <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Falar com a São Paulo Aroma pelo WhatsApp" title="WhatsApp" className="whatsapp-fab fixed bottom-[calc(1.25rem+var(--sab))] right-[max(1.25rem,var(--sar))] z-[58] flex h-14 w-14 items-center justify-center rounded-full bg-[#2f6b4f] text-cream shadow-lg shadow-soft/20 transition-transform duration-500 hover:scale-105 active:scale-95">
      <MessageCircle strokeWidth={1.25} className="h-6 w-6" />
      <span className="hidden whitespace-nowrap text-xs font-semibold tracking-[.12em]">WhatsApp</span>
    </a>
  )
}

export function Nav() {
  const { nav, tr, t, settings } = useCMS(); const { go, path } = useRouter(); const { count, setOpen } = useCart()
  const scrolled = useScrolled(); const [menu, setMenu] = useState(false)
  const overHero = false
  const items = nav.filter((n) => n.visible).sort((a, b) => a.order - b.order)
  const nav2 = (u: string) => { setMenu(false); go(u) }
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : '' }, [menu])

  /* Publish the real header height so the sticky filter bars on /produtos and
     /avaliacoes can sit flush underneath it. The header shrinks on scroll and
     grows by the safe-area inset, so a hardcoded offset is always wrong on
     some combination of device, scroll state, or orientation. */
  const headRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const publish = () => document.documentElement.style.setProperty('--hdr', `${el.offsetHeight}px`)
    publish()
    const ro = new ResizeObserver(publish); ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <>
      <header ref={headRef} className={`fixed inset-x-0 top-0 z-[55] transition-all duration-700 ease-out-lux ${scrolled && !menu ? 'safe-t-sm border-b border-beige/70 bg-cream/85 pb-3 backdrop-blur-md' : 'safe-t border-b border-transparent pb-6'}`}>
        {/* Three zones: nav left, brand dead-centre, utilities right.

            Two earlier layouts both failed here:
            - grid-cols-[1fr_auto_1fr] gave the two side columns EQUAL width, so
              the nav's flex row (~520px) overflowed its share and painted over
              the logo. Equal sides only work if both sides need the same width.
            - the old grid also had FOUR children but THREE columns, so between
              sm and lg the hamburger took a cell and pushed the utilities onto a
              second row.

            space-between with content-sized zones can never overflow. The brand
            is absolutely centred so no side width can displace it. The inline
            nav only appears from xl: below 1280 the nav needs ~520px while a
            centred logo needs half the viewport, so the two genuinely cannot
            coexist — the hamburger sheet covers 640–1280 instead. */}
        <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-[max(1.25rem,var(--sal))] md:px-[max(2.5rem,var(--sar))]">
          <div className="flex min-w-0 items-center">
            <button onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={t('nav.menu')} className={`tap -ml-2 flex items-center gap-3 py-2 pl-2 active:opacity-60 xl:hidden ${overHero ? 'text-cream' : 'text-soft'}`}>
              <span className="relative block h-3 w-6"><span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-700 ease-lux ${menu ? 'translate-y-1.5 rotate-45' : ''}`} /><span className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-700 ease-lux ${menu ? 'w-full -translate-y-1.5 -rotate-45' : 'w-4'}`} /></span>
              <span className="eyebrow hidden !text-[10px] sm:inline">{menu ? t('nav.close') : t('nav.menu')}</span>
            </button>
            <nav aria-label="Principal" className="hidden items-center gap-7 xl:flex 2xl:gap-9">
              {items.map((n) => <button key={n.id} onClick={() => nav2(n.url)} className={`group tap relative eyebrow !text-[10px] transition-colors duration-500 active:opacity-60 ${overHero ? 'text-cream' : 'text-soft'}`}>{tr(n.label)}<span className={`absolute -bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-gold transition-all duration-500 ${path === n.url ? 'opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} /></button>)}
            </nav>
          </div>
          <button onClick={() => nav2('/')} aria-label={settings.brand} className="tap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 hover:scale-[1.03] active:scale-100"><Logo light={overHero} /></button>
          <div className="flex shrink-0 items-center justify-end gap-6">
            <div className="hidden sm:block"><LangSwitch light={overHero} /></div>
            <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram" className={`tap-y hidden transition hover:text-gold xl:block ${overHero ? 'text-cream' : 'text-soft'}`}><Instagram strokeWidth={1} className="h-[18px] w-[18px]" /></a>
            <button onClick={() => setOpen(true)} aria-label={`${t('nav.cart')} (${count})`} className={`tap relative -mr-2 flex items-center gap-2 py-2 pr-2 transition hover:text-gold active:opacity-60 ${overHero ? 'text-cream' : 'text-soft'}`}>
              <ShoppingBag strokeWidth={1} className="h-[19px] w-[19px]" />
              <span className={`absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] text-cream transition-transform duration-500 ease-out-lux ${count ? 'scale-100' : 'scale-0'}`}>{count}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — ivory sheet drops via clip-path, links rise through masks */}
      <div className={`fixed inset-0 z-[54] bg-ivory transition-[clip-path] duration-[1100ms] ease-lux xl:hidden ${menu ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'}`} aria-hidden={!menu}>
        <Botanical className="absolute -right-10 bottom-10 h-[60vh] text-gold/25" />
        <nav className="flex h-full flex-col justify-center overflow-y-auto overscroll-contain px-[max(2rem,var(--sal))] pb-[calc(2.5rem+var(--sab))] pt-24">
          {items.map((n, i) => (
            <span key={n.id} className="mline border-b border-beige/60 py-2.5">
              <button tabIndex={menu ? 0 : -1} onClick={() => nav2(n.url)} className="tap-y -ml-1 flex w-full items-baseline justify-between pl-1 text-left font-serif text-[2.6rem] font-light leading-none text-soft transition-[transform,opacity] duration-[1100ms] ease-out-lux active:opacity-60" style={{ transform: menu ? 'none' : 'translateY(110%)', transitionDelay: menu ? `${0.35 + i * 0.07}s` : '0s' }}>
                {tr(n.label)}<span className="eyebrow !text-[9px] text-taupe">0{i + 1}</span>
              </button>
            </span>
          ))}
          <div className={`mt-10 flex items-center justify-between transition-all delay-700 duration-700 ${menu ? 'opacity-100' : 'opacity-0'}`}><LangSwitch /><a href={`https://instagram.com/${settings.instagram}`} className="eyebrow tap-y !text-[10px] text-gold">@{settings.instagram}</a></div>
        </nav>
      </div>
    </>
  )
}

/* ---------------- cart drawer + WhatsApp checkout ---------------- */
const FIELDS = ['name', 'phone', 'email', 'cep', 'street', 'number', 'comp', 'district', 'city', 'state', 'notes'] as const
type Form = Record<(typeof FIELDS)[number], string>
const REQ: (keyof Form)[] = ['name', 'phone', 'cep', 'street', 'number', 'city', 'state']

export function CartDrawer() {
  const { open, setOpen, lines, set } = useCart(); const { products, tr, t, settings, addLead } = useCMS(); const { go } = useRouter()
  const [step, setStep] = useState<'cart' | 'form'>('cart')
  const [f, setF] = useState<Form>(() => { try { return JSON.parse(localStorage.getItem('ga-customer') || '') } catch { return Object.fromEntries(FIELDS.map((k) => [k, ''])) as Form } })
  const [err, setErr] = useState<Partial<Form>>({}); const [save, setSave] = useState(true)
  const items = lines.map((l) => ({ ...l, p: products.find((p) => p.id === l.id)! })).filter((x) => x.p)
  const subtotal = items.reduce((a, b) => a + b.qty * (b.p.promo ?? b.p.price), 0)
  useEffect(() => { if (!open) setTimeout(() => setStep('cart'), 800) }, [open])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])

  const submit = () => {
    const e: Partial<Form> = {}
    REQ.forEach((k) => { if (!f[k]?.trim()) e[k] = t('form.required') })
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = t('form.invalidEmail')
    if (f.phone && f.phone.replace(/\D/g, '').length < 10) e.phone = t('form.invalidPhone')
    setErr(e); if (Object.keys(e).length) return
    if (save) localStorage.setItem('ga-customer', JSON.stringify(f))
    addLead({
      id: `GA-${Date.now().toString().slice(-6)}`,
      customer: f,
      items: items.map((i) => ({ id: i.p.id, name: tr(i.p.name), qty: i.qty, price: i.p.promo ?? i.p.price })),
      total: subtotal,
      date: new Date().toISOString(),
      status: 'Novo',
    })
    const B = ' '
    const msg = [t('wa.hello'), B, ...items.map((i) => `• ${tr(i.p.name)} — ${i.qty}x — ${brl(i.qty * i.p.price)}`), B, `${t('cart.subtotal')}: ${brl(subtotal)}`, B, t('wa.data'),
      `${t('form.name')}: ${f.name}`, `${t('form.phone')}: ${f.phone}`, f.email && `${t('form.email')}: ${f.email}`, `${t('form.street')}: ${f.street}, ${f.number}${f.comp ? ' — ' + f.comp : ''}${f.district ? ' · ' + f.district : ''}`,
      `${t('form.city')}: ${f.city} / ${f.state}`, `${t('form.cep')}: ${f.cep}`, f.notes && `${t('form.notes')}: ${f.notes}`, B, t('wa.confirm')].filter(Boolean).join('\n')
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }
  const fld = (k: keyof Form, c = '', type = 'text') => <Field key={k} className={c} type={type} label={t('form.' + k) + (REQ.includes(k) ? ' *' : '')} value={f[k] || ''} error={err[k]} textarea={k === 'notes'} onChange={(e) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: undefined }) }} />

  return (
    <div className={`fixed inset-0 z-[65] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-soft/40 transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <aside role="dialog" aria-modal="true" aria-label={t('cart.title')} className={`absolute right-0 top-0 flex h-[100dvh] max-h-[100dvh] w-full max-w-[520px] flex-col bg-cream transition-transform duration-[1000ms] ease-lux ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-beige px-[max(1.25rem,var(--sal))] py-5 sm:px-[max(2rem,var(--sar))] sm:py-6">
          {step === 'form' ? <button onClick={() => setStep('cart')} className="eyebrow tap-y -ml-1 flex items-center gap-2 pl-1 !text-[10px] active:opacity-60"><ArrowLeft strokeWidth={1} className="h-4 w-4" />{t('form.back')}</button> : <h2 className="font-serif text-3xl">{t('cart.title')} <sup className="text-sm text-gold">{items.length}</sup></h2>}
          <button onClick={() => setOpen(false)} aria-label={t('nav.close')} className="tap -mr-2 p-2 transition-transform duration-500 hover:rotate-90 active:opacity-60"><X strokeWidth={1} className="h-5 w-5" /></button>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className={`absolute inset-0 overscroll-contain overflow-y-auto px-[max(1.25rem,var(--sal))] transition-all duration-[900ms] ease-lux sm:px-[max(2rem,var(--sar))] ${step === 'cart' ? '' : '-translate-x-1/3 opacity-0 pointer-events-none'}`}>
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="arch mb-8 flex h-40 w-28 items-end justify-center border border-gold/40 pb-6"><Sparkle className="text-gold" /></div>
                <p className="font-serif text-3xl">{t('cart.empty')}</p><p className="mt-3 text-sm text-taupe">{t('cart.emptyD')}</p>
                <ArrowBtn className="mt-8" onClick={() => { setOpen(false); go('/produtos') }}>{t('cta.btn')}</ArrowBtn>
              </div>
            ) : items.map(({ p, qty }) => (
              <div key={p.id} className="flex gap-5 border-b border-beige/70 py-6">
                <img src={p.imgs[0]} alt={tr(p.name)} className="arch h-28 w-20 shrink-0 object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3"><div><p className="font-serif text-xl leading-tight">{tr(p.name)}</p><p className="text-xs text-taupe">{p.size}</p></div><p className="text-sm tabular-nums">{brl(p.price * qty)}</p></div>
                  <div className="flex items-center justify-between"><Qty value={qty} onChange={(n) => set(p.id, n)} /><button onClick={() => set(p.id, 0)} className="eyebrow tap-y !text-[10px] text-taupe active:opacity-60 hover:text-soft">{t('cart.remove')}</button></div>
                </div>
              </div>
            ))}
          </div>
          <div className={`absolute inset-0 overscroll-contain overflow-y-auto px-[max(1.25rem,var(--sal))] pb-10 transition-all duration-[900ms] ease-lux sm:px-[max(2rem,var(--sar))] ${step === 'form' ? '' : 'translate-x-1/3 opacity-0 pointer-events-none'}`}>
            <h2 className="mt-8 font-serif text-4xl">{t('form.title')}</h2><p className="mt-2 text-sm text-taupe">{t('form.sub')}</p>
            <div className="mt-6 grid grid-cols-6 gap-x-5 gap-y-7">
              {fld('name', 'col-span-6')}{fld('phone', 'col-span-3', 'tel')}{fld('email', 'col-span-3', 'email')}{fld('cep', 'col-span-2')}{fld('street', 'col-span-4')}{fld('number', 'col-span-2')}{fld('comp', 'col-span-4')}{fld('district', 'col-span-6')}{fld('city', 'col-span-4')}{fld('state', 'col-span-2')}{fld('notes', 'col-span-6')}
            </div>
            <label className="tap-y mt-8 flex cursor-pointer items-center gap-3 py-1 text-sm text-soft"><input type="checkbox" checked={save} onChange={(e) => setSave(e.target.checked)} className="h-4 w-4 accent-[#B58A35]" />{t('form.save')}</label>
          </div>
        </div>
        {items.length > 0 && (
          <div className="safe-b border-t border-beige px-[max(1.25rem,var(--sal))] pt-6 sm:px-[max(2rem,var(--sar))]">
            <div className="flex items-baseline justify-between"><span className="eyebrow text-taupe">{t('cart.subtotal')}</span><span className="font-serif text-3xl tabular-nums">{brl(subtotal)}</span></div>
            <p className="mt-1 text-xs text-taupe">{t('cart.note')}</p>
            <button onClick={() => step === 'cart' ? setStep('form') : submit()} className="group mt-5 mb-6 flex w-full items-center justify-center gap-3 bg-soft py-5 eyebrow text-cream transition-colors duration-700 hover:bg-[#2f6b4f] active:opacity-80"><MessageCircle strokeWidth={1} className="h-4 w-4" />{step === 'cart' ? t('cart.checkout') : t('form.send')}</button>
          </div>
        )}
      </aside>
    </div>
  )
}

export function Footer() {
  const { nav, tr, t, settings } = useCMS(); const { go } = useRouter()
  const [email, setEmail] = useState(''); const [ok, setOk] = useState(false)
  return (
    <footer className="relative overflow-hidden border-t border-logo/10 bg-blush pt-20 text-logo md:pt-28">
      <Botanical className="footer-botanical absolute -left-16 top-10 h-[420px]" />
      <div className="relative mx-auto max-w-[1600px] px-[max(1.25rem,var(--sal))] md:px-[max(2.5rem,var(--sar))]">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-serif text-[clamp(2.4rem,4.5vw,4.2rem)] font-light leading-[1.02]">{t('footer.news')}</p>
            <form onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+/.test(email)) setOk(true) }} className="footer-newsletter mt-10 flex max-w-lg items-end gap-6 border-b border-logo/25 pb-3 focus-within:border-gold">
              <label className="sr-only" htmlFor="news">{t('form.email')}</label>
              <input id="news" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('form.email')} className="flex-1 bg-transparent text-lg text-soft placeholder-logo/70 outline-none" />
              <button className="eyebrow tap-y shrink-0 !text-[10px] py-1 font-semibold text-soft hover:text-gold active:opacity-60">{t('footer.newsBtn')}</button>
            </form>
            <p className={`mt-3 text-xs text-gold transition-opacity duration-500 ${ok ? 'opacity-100' : 'opacity-0'}`}>{t('footer.newsOk')}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            <div><p className="eyebrow mb-4 !text-[10px] text-taupe">{t('footer.nav')}</p><ul className="space-y-1">{nav.filter((n) => n.visible).map((n) => <li key={n.id}><button onClick={() => go(n.url)} className="tap-y py-1 text-left text-sm text-logo/80 transition hover:text-gold active:opacity-60">{tr(n.label)}</button></li>)}</ul></div>
            <div><p className="eyebrow mb-4 !text-[10px] text-taupe">{t('footer.service')}</p><ul className="space-y-1 text-sm text-logo/80"><li><a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="tap-y block py-1 hover:text-gold active:opacity-60">WhatsApp</a></li><li><a href={`mailto:${settings.email}`} className="tap-y block break-all py-1 hover:text-gold active:opacity-60">{settings.email}</a></li><li className="py-1">{settings.address}</li></ul></div>
            <div><p className="eyebrow mb-4 !text-[10px] text-taupe">{t('footer.social')}</p><ul className="space-y-1 text-sm text-logo/80"><li><a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer" className="tap-y flex items-center gap-2 py-1 hover:text-gold active:opacity-60"><Instagram strokeWidth={1} className="h-4 w-4" />Instagram</a></li><li><a href={`https://facebook.com/${settings.facebook}`} target="_blank" rel="noreferrer" className="tap-y flex items-center gap-2 py-1 hover:text-gold active:opacity-60"><Facebook strokeWidth={1} className="h-4 w-4" />Facebook</a></li></ul><div className="mt-6"><LangSwitch /></div></div>
          </div>
        </div>
        <div className="mt-20 select-none text-center font-script text-[clamp(4rem,20vw,19rem)] leading-[0.8] text-logo/[0.07] md:mt-28" aria-hidden>São Paulo</div>
        {/* safe-b sets padding-bottom outright and outranks py-*, so the design
            padding is expressed additively here — otherwise this bar loses its
            2rem and sits flush against the gesture bar. */}
        <div className="flex flex-col gap-2 border-t border-logo/15 pb-[calc(2rem+var(--sab))] pt-8 text-xs text-logo/60 md:flex-row md:items-center md:justify-between">
          <p className="max-w-sm">{t('footer.statement')}</p>
          <div className="flex flex-wrap gap-x-6">{[t('footer.privacy'), t('footer.terms'), 'Admin'].map((l) => <button key={l} onClick={() => (l === 'Admin' ? go('/admin') : undefined)} className="tap-y py-1.5 text-left hover:text-logo active:opacity-60">{l}</button>)}<span className="py-1.5">© 2026 {settings.brand}. {t('footer.rights')}</span></div>
        </div>
      </div>
    </footer>
  )
}
