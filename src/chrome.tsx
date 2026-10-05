import { useEffect, useState } from 'react'
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

export function Nav() {
  const { nav, tr, t, settings } = useCMS(); const { go, path } = useRouter(); const { count, setOpen } = useCart()
  const scrolled = useScrolled(); const [menu, setMenu] = useState(false)
  const overHero = false
  const items = nav.filter((n) => n.visible).sort((a, b) => a.order - b.order)
  const nav2 = (u: string) => { setMenu(false); go(u) }
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : '' }, [menu])
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[55] transition-all duration-700 ease-out-lux ${scrolled && !menu ? 'border-b border-beige/70 bg-cream/80 py-3 backdrop-blur-md' : 'border-b border-transparent py-6'}`}>
        <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10">
          <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
            {items.map((n) => <button key={n.id} onClick={() => nav2(n.url)} className={`group relative eyebrow !text-[10px] transition-colors duration-500 ${overHero ? 'text-cream' : 'text-soft'}`}>{tr(n.label)}<span className={`absolute -bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-gold transition-all duration-500 ${path === n.url ? 'opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} /></button>)}
          </nav>
          <button onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={t('nav.menu')} className={`flex items-center gap-3 lg:hidden ${overHero ? 'text-cream' : 'text-soft'}`}>
            <span className="relative block h-3 w-6"><span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-700 ease-lux ${menu ? 'translate-y-1.5 rotate-45' : ''}`} /><span className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-700 ease-lux ${menu ? 'w-full -translate-y-1.5 -rotate-45' : 'w-4'}`} /></span>
            <span className="eyebrow hidden !text-[10px] sm:inline">{menu ? t('nav.close') : t('nav.menu')}</span>
          </button>
          <button onClick={() => nav2('/')} aria-label={settings.brand} className="transition-transform duration-700 hover:scale-[1.03]"><Logo light={overHero} /></button>
          <div className="flex items-center justify-end gap-6">
            <div className="hidden sm:block"><LangSwitch light={overHero} /></div>
            <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram" className={`hidden transition hover:text-gold lg:block ${overHero ? 'text-cream' : 'text-soft'}`}><Instagram strokeWidth={1} className="h-[18px] w-[18px]" /></a>
            <button onClick={() => setOpen(true)} aria-label={`${t('nav.cart')} (${count})`} className={`relative flex items-center gap-2 transition hover:text-gold ${overHero ? 'text-cream' : 'text-soft'}`}>
              <ShoppingBag strokeWidth={1} className="h-[19px] w-[19px]" />
              <span className={`absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] text-cream transition-transform duration-500 ease-out-lux ${count ? 'scale-100' : 'scale-0'}`}>{count}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — ivory sheet drops via clip-path, links rise through masks */}
      <div className={`fixed inset-0 z-[54] bg-ivory transition-[clip-path] duration-[1100ms] ease-lux lg:hidden ${menu ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'}`} aria-hidden={!menu}>
        <Botanical className="absolute -right-10 bottom-10 h-[60vh] text-gold/25" />
        <nav className="flex h-full flex-col justify-center px-8 pt-16">
          {items.map((n, i) => (
            <span key={n.id} className="mline border-b border-beige/60 py-3">
              <button tabIndex={menu ? 0 : -1} onClick={() => nav2(n.url)} className="flex w-full items-baseline justify-between text-left font-serif text-[2.6rem] font-light leading-none text-soft transition-transform duration-[1100ms] ease-out-lux" style={{ transform: menu ? 'none' : 'translateY(110%)', transitionDelay: menu ? `${0.35 + i * 0.07}s` : '0s' }}>
                {tr(n.label)}<span className="eyebrow !text-[9px] text-taupe">0{i + 1}</span>
              </button>
            </span>
          ))}
          <div className={`mt-10 flex items-center justify-between transition-all delay-700 duration-700 ${menu ? 'opacity-100' : 'opacity-0'}`}><LangSwitch /><a href={`https://instagram.com/${settings.instagram}`} className="eyebrow !text-[10px] text-gold">@{settings.instagram}</a></div>
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
      <aside role="dialog" aria-modal="true" aria-label={t('cart.title')} className={`absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col bg-cream transition-transform duration-[1000ms] ease-lux ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-beige px-8 py-6">
          {step === 'form' ? <button onClick={() => setStep('cart')} className="eyebrow flex items-center gap-2 !text-[10px]"><ArrowLeft strokeWidth={1} className="h-4 w-4" />{t('form.back')}</button> : <h2 className="font-serif text-3xl">{t('cart.title')} <sup className="text-sm text-gold">{items.length}</sup></h2>}
          <button onClick={() => setOpen(false)} aria-label={t('nav.close')} className="transition-transform duration-500 hover:rotate-90"><X strokeWidth={1} className="h-5 w-5" /></button>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className={`absolute inset-0 overflow-y-auto px-8 transition-all duration-[900ms] ease-lux ${step === 'cart' ? '' : '-translate-x-1/3 opacity-0 pointer-events-none'}`}>
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="arch mb-8 flex h-40 w-28 items-end justify-center border border-gold/40 pb-6"><Sparkle className="text-gold" /></div>
                <p className="font-serif text-3xl">{t('cart.empty')}</p><p className="mt-3 text-sm text-taupe">{t('cart.emptyD')}</p>
                <ArrowBtn className="mt-8" onClick={() => { setOpen(false); go('/produtos') }}>{t('cta.btn')}</ArrowBtn>
              </div>
            ) : items.map(({ p, qty }) => (
              <div key={p.id} className="flex gap-5 border-b border-beige/70 py-6">
                <img src={p.imgs[0]} alt={tr(p.name)} className="arch h-28 w-20 object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3"><div><p className="font-serif text-xl leading-tight">{tr(p.name)}</p><p className="text-xs text-taupe">{p.size}</p></div><p className="text-sm tabular-nums">{brl(p.price * qty)}</p></div>
                  <div className="flex items-center justify-between"><Qty value={qty} onChange={(n) => set(p.id, n)} /><button onClick={() => set(p.id, 0)} className="eyebrow !text-[9px] text-taupe hover:text-soft">{t('cart.remove')}</button></div>
                </div>
              </div>
            ))}
          </div>
          <div className={`absolute inset-0 overflow-y-auto px-8 pb-10 transition-all duration-[900ms] ease-lux ${step === 'form' ? '' : 'translate-x-1/3 opacity-0 pointer-events-none'}`}>
            <h2 className="mt-8 font-serif text-4xl">{t('form.title')}</h2><p className="mt-2 text-sm text-taupe">{t('form.sub')}</p>
            <div className="mt-6 grid grid-cols-6 gap-x-5 gap-y-7">
              {fld('name', 'col-span-6')}{fld('phone', 'col-span-3', 'tel')}{fld('email', 'col-span-3', 'email')}{fld('cep', 'col-span-2')}{fld('street', 'col-span-4')}{fld('number', 'col-span-2')}{fld('comp', 'col-span-4')}{fld('district', 'col-span-6')}{fld('city', 'col-span-4')}{fld('state', 'col-span-2')}{fld('notes', 'col-span-6')}
            </div>
            <label className="mt-8 flex cursor-pointer items-center gap-3 text-sm text-soft"><input type="checkbox" checked={save} onChange={(e) => setSave(e.target.checked)} className="h-4 w-4 accent-[#B58A35]" />{t('form.save')}</label>
          </div>
        </div>
        {items.length > 0 && (
          <div className="border-t border-beige px-8 py-6">
            <div className="flex items-baseline justify-between"><span className="eyebrow text-taupe">{t('cart.subtotal')}</span><span className="font-serif text-3xl tabular-nums">{brl(subtotal)}</span></div>
            <p className="mt-1 text-xs text-taupe">{t('cart.note')}</p>
            <button onClick={() => step === 'cart' ? setStep('form') : submit()} className="group mt-5 flex w-full items-center justify-center gap-3 bg-soft py-5 eyebrow text-cream transition-colors duration-700 hover:bg-[#2f6b4f]"><MessageCircle strokeWidth={1} className="h-4 w-4" />{step === 'cart' ? t('cart.checkout') : t('form.send')}</button>
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
      <Botanical className="absolute -left-16 top-10 h-[420px] text-logo/20" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-serif text-[clamp(2.4rem,4.5vw,4.2rem)] font-light leading-[1.02]">{t('footer.news')}</p>
            <form onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+/.test(email)) setOk(true) }} className="mt-10 flex max-w-lg items-end gap-6 border-b border-logo/25 pb-3 focus-within:border-gold">
              <label className="sr-only" htmlFor="news">{t('form.email')}</label>
              <input id="news" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('form.email')} className="flex-1 bg-transparent text-lg text-logo placeholder-logo/40 outline-none" />
              <button className="eyebrow !text-[10px] text-gold hover:text-logo">{t('footer.newsBtn')}</button>
            </form>
            <p className={`mt-3 text-xs text-gold transition-opacity duration-500 ${ok ? 'opacity-100' : 'opacity-0'}`}>{t('footer.newsOk')}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            <div><p className="eyebrow mb-6 !text-[10px] text-taupe">{t('footer.nav')}</p><ul className="space-y-3">{nav.filter((n) => n.visible).map((n) => <li key={n.id}><button onClick={() => go(n.url)} className="text-sm text-logo/80 transition hover:text-gold">{tr(n.label)}</button></li>)}</ul></div>
            <div><p className="eyebrow mb-6 !text-[10px] text-taupe">{t('footer.service')}</p><ul className="space-y-3 text-sm text-logo/80"><li><a href={`https://wa.me/${settings.whatsapp}`} className="hover:text-gold">WhatsApp</a></li><li><a href={`mailto:${settings.email}`} className="break-all hover:text-gold">{settings.email}</a></li><li>{settings.address}</li></ul></div>
            <div><p className="eyebrow mb-6 !text-[10px] text-taupe">{t('footer.social')}</p><ul className="space-y-3 text-sm text-logo/80"><li><a href={`https://instagram.com/${settings.instagram}`} className="flex items-center gap-2 hover:text-gold"><Instagram strokeWidth={1} className="h-4 w-4" />Instagram</a></li><li><a href={`https://facebook.com/${settings.facebook}`} className="flex items-center gap-2 hover:text-gold"><Facebook strokeWidth={1} className="h-4 w-4" />Facebook</a></li></ul><div className="mt-8"><LangSwitch /></div></div>
          </div>
        </div>
        <div className="mt-20 select-none text-center font-script text-[clamp(4rem,20vw,19rem)] leading-[0.8] text-logo/[0.07] md:mt-28" aria-hidden>Gramado</div>
        <div className="flex flex-col gap-4 border-t border-logo/15 py-8 text-xs text-logo/60 md:flex-row md:items-center md:justify-between">
          <p className="max-w-sm">{t('footer.statement')}</p>
          <div className="flex flex-wrap gap-6"><button className="hover:text-logo">{t('footer.privacy')}</button><button className="hover:text-logo">{t('footer.terms')}</button><button onClick={() => go('/admin')} className="hover:text-logo">Admin</button><span>© 2026 {settings.brand}. {t('footer.rights')}</span></div>
        </div>
      </div>
    </footer>
  )
}
