import { useEffect, useState, type ReactNode } from 'react'
import { X, MessageCircle, Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react'
import { useCMS, brl, type Product } from './cms'
import { Parallax, Reveal, Lines, useRouter } from './motion'
import { Instagram, ArrowBtn, TextLink, Sparkle, Botanical, Stars, ProductCard, Qty, Field, useCart, IgTile } from './ui'
import { Container, InstagramGrid, FinalCTA } from './home'

const PageHero = ({ eyebrow, lines, sub, children }: { eyebrow?: string; lines: ReactNode[]; sub?: string; children?: ReactNode }) => (
  <Reveal as="header" className="relative overflow-hidden pb-10 pt-28 md:pb-14 md:pt-36" threshold={0}>
    <Parallax speed={-0.06} className="absolute -right-8 top-24 text-gold/25"><Botanical className="h-[440px]" /></Parallax>
    <Container className="relative">
      {eyebrow && <p className="fade-up eyebrow mb-8 flex items-center gap-3 text-gold"><Sparkle />{eyebrow}</p>}
      <h1 className="max-w-6xl font-serif text-[clamp(3rem,8vw,8rem)] font-light uppercase leading-[0.92] text-soft"><Lines lines={lines} delay={0.15} /></h1>
      {sub && <p className="fade-up mt-6 max-w-md text-[17px] leading-relaxed text-taupe" style={{ transitionDelay: '.4s' }}>{sub}</p>}
      {children}
    </Container>
  </Reveal>
)

export const Crumbs = ({ items }: { items: { label: string; to?: string }[] }) => {
  const { go } = useRouter()
  return (
    <nav aria-label="Breadcrumb" className="eyebrow flex flex-wrap items-center gap-2 !text-[10px] text-taupe">
      <ol className="flex flex-wrap items-center gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((c, i) => <li key={i} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">{i > 0 && <ChevronRight strokeWidth={1} className="h-3 w-3" />}{c.to ? <button onClick={() => go(c.to!)} className="tap-y -ml-1 px-1 hover:text-soft active:opacity-60" itemProp="name">{c.label}</button> : <span className="px-1 text-soft" itemProp="name" aria-current="page">{c.label}</span>}<meta itemProp="position" content={String(i + 1)} /></li>)}
      </ol>
    </nav>
  )
}

const Chip = ({ on, children, onClick }: { on: boolean; children: ReactNode; onClick: () => void }) => (
  <button aria-pressed={on} onClick={onClick} className={`eyebrow relative whitespace-nowrap px-1.5 py-3 !text-[10px] transition-colors duration-500 active:opacity-60 ${on ? 'text-soft' : 'text-taupe hover:text-soft'}`}>{children}<span className={`absolute bottom-2 left-1.5 right-1.5 h-px origin-left bg-gold transition-transform duration-700 ease-lux ${on ? 'scale-x-100' : 'scale-x-0'}`} /></button>
)

function QuickView({ p, onClose }: { p: Product | null; onClose: () => void }) {
  const { tr, t, fragrances } = useCMS(); const { add } = useCart(); const { go } = useRouter()
  const [last, setLast] = useState<Product | null>(p); useEffect(() => { if (p) setLast(p) }, [p])
  const q = p || last
  return (
    <div className={`fixed inset-0 z-[66] flex items-center justify-center p-4 ${p ? '' : 'pointer-events-none'}`} role="dialog" aria-modal="true" aria-hidden={!p}>
      <div onClick={onClose} className={`absolute inset-0 bg-soft/50 transition-opacity duration-700 ${p ? 'opacity-100' : 'opacity-0'}`} />
      {q && <div className={`relative grid w-full max-w-4xl bg-cream transition-all duration-[1000ms] ease-lux md:grid-cols-2 ${p ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(50%_0_50%_0)]'}`}>
        <img src={q.imgs[0]} alt={tr(q.name)} className="aspect-[4/5] h-full w-full object-cover" />
        <div className="flex flex-col p-8 md:p-12">
          <button onClick={onClose} aria-label={t('nav.close')} className="tap -mr-2 self-end p-2 transition-transform duration-500 hover:rotate-90 active:opacity-60"><X strokeWidth={1} className="h-5 w-5" /></button>
          <p className="eyebrow mt-4 !text-[10px] text-gold">{tr(fragrances.find((f) => f.id === q.frag)!.name)} · {q.size}</p>
          <h3 className="mt-3 font-serif text-4xl leading-tight">{tr(q.name)}</h3>
          <p className="mt-4 text-sm leading-relaxed text-taupe">{tr(q.desc)}</p>
          <p className="mt-6 font-serif text-3xl">{brl(q.price)}</p>
          <div className="mt-auto flex flex-wrap gap-4 pt-8">
            {q.stock ? <ArrowBtn onClick={() => { add(q.id); onClose() }}>{t('pdp.add')}</ArrowBtn> : <span className="eyebrow py-4 text-taupe">{t('prod.out')}</span>}
            <TextLink onClick={() => { onClose(); go('/produto/' + q.id) }}>{t('prod.view')}</TextLink>
          </div>
        </div>
      </div>}
    </div>
  )
}

export function Products({ query }: { query: string }) {
  const { t, tr, products, fragrances, categories } = useCMS()
  const [cat, setCat] = useState<string>('all'); const [frag, setFrag] = useState<string>(new URLSearchParams(query).get('f') || 'all')
  const [quick, setQuick] = useState<Product | null>(null)
  const list = products.filter((p) => p.published && (cat === 'all' || p.cat === cat) && (frag === 'all' || p.frag === frag))
  return (
    <>
      <PageHero eyebrow={`${products.filter((p) => p.published).length} ${t('prod.count')}`} lines={[t('prod.title')]} sub={t('prod.sub')} />
      <div className="sticky top-[var(--hdr,60px)] z-30 border-y border-beige bg-ivory/90 backdrop-blur-md">
        <Container className="flex flex-col gap-1 py-2 md:flex-row md:items-center md:justify-between md:py-3">
          <div className="-mx-1.5 flex gap-5 overflow-x-auto px-1.5 [scrollbar-width:none]"><Chip on={cat === 'all'} onClick={() => setCat('all')}>{t('prod.all')}</Chip>{categories.map((c) => <Chip key={c.id} on={cat === c.id} onClick={() => setCat(c.id)}>{tr(c.name)}</Chip>)}</div>
          <div className="-mx-1.5 flex items-center gap-4 overflow-x-auto px-1.5 [scrollbar-width:none]"><Chip on={frag === 'all'} onClick={() => setFrag('all')}>{t('prod.allFrag')}</Chip>{fragrances.map((f) => <Chip key={f.id} on={frag === f.id} onClick={() => setFrag(f.id)}><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: f.accent }} />{tr(f.name)}</Chip>)}</div>
        </Container>
      </div>
      <Container className="pt-10 pb-16 md:pt-14 md:pb-20">
        {list.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center"><div className="arch mb-8 h-36 w-24 border border-gold/40" /><p className="font-serif text-4xl">{t('prod.empty')}</p><p className="mt-3 text-taupe">{t('prod.emptyD')}</p><div className="mt-8"><TextLink onClick={() => { setCat('all'); setFrag('all') }}>{t('prod.clear')}</TextLink></div></div>
        ) : (
          <div key={cat + frag} className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => <Reveal key={p.id} className={`fade-up ${i % 3 === 1 ? 'lg:mt-14' : ''}`} threshold={0.1}><ProductCard p={p} tall={i % 3 === 1} onQuick={setQuick} /></Reveal>)}
          </div>
        )}
      </Container>
      <QuickView p={quick} onClose={() => setQuick(null)} />
    </>
  )
}

export function ProductDetail({ id }: { id: string }) {
  const { t, tr, products, fragrances, settings, categories } = useCMS(); const { add, setOpen } = useCart(); const { go } = useRouter()
  const p = products.find((x) => x.id === id && x.published)
  const [img, setImg] = useState(0); const [qty, setQty] = useState(1); const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null); const [tab, setTab] = useState(0)
  useEffect(() => { setImg(0); setQty(1) }, [id])
  if (!p) return <NotFound />
  const f = fragrances.find((x) => x.id === p.frag)!
  const related = products.filter((x) => x.id !== p.id && x.published && (x.frag === p.frag || x.cat === p.cat)).slice(0, 3)
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: tr(p.name), sku: p.sku, image: p.imgs, description: tr(p.desc), brand: { '@type': 'Brand', name: settings.brand }, offers: { '@type': 'Offer', priceCurrency: 'BRL', price: p.price, availability: p.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } }
  const tabs = [[t('pdp.details'), t('pdp.detailsD')], [t('pdp.ship'), t('pdp.shipD')], [t('pdp.care'), t('pdp.careD')]]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Container className="pt-28 md:pt-32"><Crumbs items={[{ label: t('prod.title'), to: '/produtos' }, { label: tr(categories.find((c) => c.id === p.cat)?.name || { pt: p.cat, en: p.cat }), to: '/produtos' }, { label: tr(p.name) }]} /></Container>
      <Container className="grid gap-12 pb-28 pt-10 lg:grid-cols-12 lg:gap-20">
        <div className="flex flex-col-reverse gap-4 md:flex-row lg:col-span-7">
          <div className="flex gap-3 md:flex-col">{p.imgs.map((s, i) => <button key={i} onClick={() => setImg(i)} aria-label={`Imagem ${i + 1}`} aria-current={i === img} className={`relative h-24 w-20 shrink-0 overflow-hidden transition-opacity duration-500 active:opacity-100 ${i === img ? '' : 'opacity-45 hover:opacity-100'}`}><img src={s} alt="" className="h-full w-full object-cover" /><span className={`absolute inset-x-0 bottom-0 h-px bg-gold transition-transform duration-700 ${i === img ? 'scale-x-100' : 'scale-x-0'}`} /></button>)}</div>
          <Reveal className="clip relative flex-1 overflow-hidden bg-mist" threshold={0}>
            <div className="relative aspect-[4/5]" data-cursor="view" data-cursor-label="Zoom" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }) }} onMouseLeave={() => setZoom(null)}>
              {p.imgs.map((s, i) => <img key={i} src={s} alt={i === 0 ? tr(p.name) : ''} className={`absolute inset-0 h-full w-full object-cover transition-[opacity,clip-path,transform] duration-[1200ms] ease-lux ${i === img ? 'opacity-100 [clip-path:inset(0_0_0_0)]' : 'opacity-0 [clip-path:inset(0_0_0_100%)]'}`} style={i === img && zoom ? { transform: 'scale(1.8)', transformOrigin: `${zoom.x}% ${zoom.y}%`, transitionDuration: '600ms' } : undefined} />)}
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 lg:pt-10" threshold={0}>
          <p className="fade-up eyebrow flex items-center gap-3 !text-[10px]" style={{ color: f.accent }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: f.accent }} />{tr(f.name)}</p>
          <h1 className="mt-5 font-serif text-[clamp(2.4rem,4vw,3.6rem)] font-light leading-[1.02]"><Lines lines={[tr(p.name)]} delay={0.1} /></h1>
          <p className="fade-up mt-6 font-serif text-3xl tabular-nums">{brl(p.price)}</p>
          <p className="fade-up mt-6 max-w-md leading-relaxed text-taupe">{tr(p.desc)}</p>
          <div className="fade-up mt-8 border-y border-beige py-6"><p className="eyebrow !text-[9px] text-taupe">{t('pdp.notes')}</p><p className="mt-2 font-serif text-xl italic">{tr(f.notes)}</p></div>
          <div className="fade-up mt-8 flex items-center gap-10"><div><p className="eyebrow mb-3 !text-[9px] text-taupe">{t('pdp.size')}</p><span className="inline-block border border-soft px-4 py-2.5 text-sm">{p.size}</span></div><div><p className="eyebrow mb-3 !text-[9px] text-taupe">{t('pdp.qty')}</p><Qty value={qty} onChange={setQty} /></div></div>
          {!p.stock && <p className="fade-up mt-8 border-l border-gold pl-4 text-sm text-taupe">{t('pdp.unavailable')}</p>}
          <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row">
            <button disabled={!p.stock} onClick={() => add(p.id, qty)} className="group relative flex-1 overflow-hidden bg-soft py-5 eyebrow text-cream disabled:cursor-not-allowed disabled:opacity-40"><span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-enabled:group-hover:scale-x-100" /><span className="relative">{t('pdp.add')}</span></button>
            <button type="button" onClick={() => { add(p.id, qty); setOpen(true) }} className="flex flex-1 items-center justify-center gap-3 border border-soft py-5 eyebrow transition-colors duration-500 hover:bg-soft hover:text-cream"><MessageCircle strokeWidth={1} className="h-4 w-4" />{t('pdp.wa')}</button>
          </div>
          <div className="fade-up mt-12">
            {tabs.map(([h, b], i) => (
              <div key={i} className="border-b border-beige">
                <button aria-expanded={tab === i} onClick={() => setTab(tab === i ? -1 : i)} className="flex w-full items-center justify-between py-5 text-left"><span className="eyebrow !text-[10px]">{h}</span><span className="relative h-3 w-3"><span className="absolute top-1/2 h-px w-3 bg-soft" /><span className={`absolute left-1/2 h-3 w-px bg-soft transition-transform duration-500 ${tab === i ? 'scale-y-0' : ''}`} /></span></button>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-lux ${tab === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden text-sm leading-relaxed text-taupe"><span className="block pb-6">{b}</span></p></div>
              </div>
            ))}
            <p className="mt-4 text-xs text-taupe">SKU {p.sku}</p>
          </div>
        </Reveal>
      </Container>
      {related.length > 0 && <section className="bg-mist py-28"><Container><Reveal><h2 className="mb-14 font-serif text-[clamp(2.2rem,4vw,4rem)] font-light"><Lines lines={[t('pdp.related')]} /></h2></Reveal><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <Reveal key={r.id} className="fade-up"><ProductCard p={r} /></Reveal>)}</div></Container></section>}
    </>
  )
}

export function About() {
  const { t, assets } = useCMS(); const { go } = useRouter()
  const chapters = [[assets.fire, 'about.h1', 'about.b1'], [assets.shelf, 'about.h2', 'about.b2'], [assets.candleLit, 'about.h3', 'about.b3'], [assets.vanity, 'about.h4', 'about.b4']]
  return (
    <>
      <section className="relative flex h-[100dvh] min-h-[620px] items-end overflow-hidden bg-blush text-logo">
        <Parallax speed={-0.18} className="absolute inset-[-8%_0]"><img src={assets.living} alt="" className="h-full w-full object-cover opacity-72 sepia-[0.04] saturate-[0.95]" /></Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-blush/72 via-blush/24 to-blush/8" />
        <Reveal className="relative w-full pb-20" threshold={0}><Container>
          <h1 className="font-serif text-[clamp(3rem,9vw,9rem)] font-light uppercase leading-[0.9]"><Lines delay={0.2} lines={[t('about.t1'), <em key="a" className="normal-case italic text-taupe">{t('about.t2')}</em>]} /></h1>
          <p className="fade-up mt-10 max-w-md font-serif text-2xl font-light italic text-logo/80" style={{ transitionDelay: '.5s' }}>{t('about.sub')}</p>
        </Container></Reveal>
      </section>
      {/* sticky chapter timeline: number column pins while chapters scroll */}
      <section className="py-28 md:py-44">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="hidden lg:col-span-3 lg:block"><div className="sticky top-40"><Botanical className="h-72 text-gold/40" /><p className="mt-6 font-script text-4xl text-gold">São Paulo, SP</p></div></div>
          <div className="space-y-32 md:space-y-48 lg:col-span-9">
            {chapters.map(([img, h, b], i) => (
              <Reveal key={h} className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <div className={`clip relative overflow-hidden ${i % 2 ? 'aspect-square' : 'arch aspect-[3/4]'}`}><Parallax speed={0.1} scale={1.2} className="absolute inset-0"><img loading="lazy" src={img} alt="" className="h-full w-full object-cover" /></Parallax></div>
                <div>
                  <span className="fade-up font-serif text-7xl font-light italic text-gold/50">0{i + 1}</span>
                  <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-none"><Lines lines={[t(h)]} /></h2>
                  <p className="fade-up mt-8 max-w-md text-[17px] leading-relaxed text-taupe" style={{ transitionDelay: '.2s' }}>{t(b)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-beige py-24 text-center">
        <Reveal>
          <p className="font-serif text-[clamp(2.4rem,6vw,6rem)] font-light italic"><Lines lines={[t('about.cta')]} /></p>
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-8">
            <ArrowBtn onClick={() => go('/contato')}>{t('about.btn')}</ArrowBtn>
            {/* go() routes through the hash router, so this lands on /#/admin
                and keeps the page-transition curtain instead of reloading. */}
            <button onClick={() => go('/admin')} className="eyebrow tap-y flex items-center gap-3 py-2 text-taupe transition-colors duration-500 hover:text-soft active:opacity-60">
              <Sparkle />{t('about.admin')}
            </button>
          </div>
        </Reveal>
      </section>
    </>
  )
}

export function ReviewsPage() {
  const { t, tr, reviews, products, categories } = useCMS(); const { go } = useRouter(); const [cat, setCat] = useState('all')
  const approved = reviews.filter((r) => r.approved)
  const list = approved.filter((r) => cat === 'all' || products.find((p) => p.id === r.product)?.cat === cat)
  const avg = approved.reduce((a, b) => a + b.rating, 0) / (approved.length || 1)
  return (
    <>
      <PageHero lines={[t('reviews.t1'), <em key="a" className="normal-case italic text-gold">{t('reviews.t2')}</em>]}>
        <div className="fade-up mt-14 flex flex-wrap items-end gap-14 border-t border-beige pt-8" style={{ transitionDelay: '.5s' }}>
          <div><p className="font-serif text-7xl font-light leading-none">{avg.toFixed(1).replace('.', ',')}</p><div className="mt-3"><Stars n={Math.round(avg)} /></div><p className="eyebrow mt-2 !text-[9px] text-taupe">{t('reviews.avg')}</p></div>
          <div><p className="font-serif text-7xl font-light leading-none">{approved.length}</p><p className="eyebrow mt-3 !text-[9px] text-taupe">{t('reviews.total')}</p></div>
        </div>
      </PageHero>
      <Container className="flex gap-5 overflow-x-auto border-y border-beige py-2 [scrollbar-width:none]"><Chip on={cat === 'all'} onClick={() => setCat('all')}>{t('prod.all')}</Chip>{categories.slice(0, 3).map((c) => <Chip key={c.id} on={cat === c.id} onClick={() => setCat(c.id)}>{tr(c.name)}</Chip>)}</Container>
      <Container className="py-20 md:py-28">
        {list.length === 0 ? <p className="py-20 text-center font-serif text-3xl text-taupe">{t('reviews.empty')}</p> : (
          <div key={cat} className="columns-1 gap-8 md:columns-2 lg:columns-3">
            {list.map((r) => { const p = products.find((x) => x.id === r.product); return (
              <Reveal key={r.id} as="article" className="fade-up mb-8 break-inside-avoid border border-beige bg-cream p-8">
                {r.photo && <img loading="lazy" src={r.photo} alt="" className="mb-6 aspect-[4/3] w-full object-cover" />}
                <div className="flex items-center justify-between"><Stars n={r.rating} /><time className="text-xs text-taupe" dateTime={r.date}>{new Date(r.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</time></div>
                <p className="mt-6 font-serif text-2xl font-light italic leading-snug">“{tr(r.text)}”</p>
                <div className="mt-8 flex items-end justify-between gap-4 border-t border-beige pt-5"><div><p className="eyebrow !text-[10px]">{r.name}</p>{p && <p className="mt-1 text-xs text-taupe">{tr(p.name)}</p>}</div>{p && <button onClick={() => go('/produto/' + p.id)} className="eyebrow tap-y shrink-0 !text-[10px] text-gold hover:text-soft active:opacity-60">{t('reviews.see')}</button>}</div>
              </Reveal>) })}
          </div>
        )}
      </Container>
      <InstagramGrid />
    </>
  )
}

export function Contact() {
  const { t, tr, settings } = useCMS()
  const [f, setF] = useState({ name: '', email: '', phone: '', subject: '', message: '' }); const [err, setErr] = useState<Record<string, string>>({}); const [state, setState] = useState<'idle' | 'loading' | 'ok'>('idle')
  const send = () => {
    const e: Record<string, string> = {}; (['name', 'email', 'message'] as const).forEach((k) => { if (!f[k].trim()) e[k] = t('form.required') })
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = t('form.invalidEmail')
    setErr(e); if (Object.keys(e).length) return
    setState('loading'); setTimeout(() => setState('ok'), 1400)
  }
  const info = [[MessageCircle, 'WhatsApp', settings.phone, `https://wa.me/${settings.whatsapp}`], [Phone, t('form.phone'), settings.phone, `tel:${settings.phone}`], [Mail, 'E-mail', settings.email, `mailto:${settings.email}`], [Instagram, 'Instagram', '@' + settings.instagram, `https://instagram.com/${settings.instagram}`], [MapPin, t('contact.address'), settings.address], [Clock, t('contact.hours'), tr(settings.hours)]] as const
  const fl = (k: keyof typeof f, label: string, c = '', ta = false) => <Field className={c} label={label} textarea={ta} value={f[k]} error={err[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
  return (
    <>
      <PageHero lines={[t('contact.t1'), <em key="a" className="normal-case italic text-gold">{t('contact.t2')}</em>]} sub={t('contact.sub')} />
      <Container className="grid gap-20 pb-28 lg:grid-cols-12">
        <Reveal className="grid gap-px self-start bg-beige sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-2">
          {info.map(([I, l, v, href], i) => { const inner = <><I strokeWidth={0.8} className="h-5 w-5 text-gold" /><p className="eyebrow mt-6 !text-[10px] text-taupe">{l}</p><p className="mt-2 break-words font-serif text-xl">{v}</p></>; return href ? <a key={i} href={href} target="_blank" rel="noreferrer" className="fade-up group flex min-h-[112px] flex-col justify-between bg-ivory p-7 transition-colors duration-500 hover:bg-cream active:bg-cream" style={{ transitionDelay: `${i * 0.06}s` }}>{inner}</a> : <div key={i} className="fade-up flex min-h-[112px] flex-col justify-between bg-ivory p-7" style={{ transitionDelay: `${i * 0.06}s` }}>{inner}</div> })}
        </Reveal>
        <Reveal className="lg:col-span-7">
          {state === 'ok' ? <div className="flex h-full flex-col items-start justify-center"><Sparkle className="text-gold" /><p className="mt-6 font-serif text-4xl">{t('contact.sent')}</p></div> : (
            <form onSubmit={(e) => { e.preventDefault(); send() }} noValidate className="fade-up grid grid-cols-2 gap-x-8 gap-y-10">
              {fl('name', t('form.name') + ' *', 'col-span-2')}{fl('email', t('form.email') + ' *', 'col-span-2 sm:col-span-1')}{fl('phone', t('form.phone'), 'col-span-2 sm:col-span-1')}{fl('subject', t('contact.subject'), 'col-span-2')}{fl('message', t('contact.message') + ' *', 'col-span-2', true)}
              <div className="col-span-2 mt-4 flex flex-wrap items-center gap-6">
                <button type="submit" disabled={state === 'loading'} className="group relative inline-flex items-center gap-3 overflow-hidden bg-soft px-8 py-5 eyebrow text-cream disabled:opacity-70"><span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100" /><span className="relative">{state === 'loading' ? '· · ·' : t('contact.send')}</span></button>
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="eyebrow flex items-center gap-2 !text-[10px] text-soft hover:text-[#2f6b4f]"><MessageCircle strokeWidth={1} className="h-4 w-4" />{t('contact.wa')}</a>
              </div>
            </form>
          )}
        </Reveal>
      </Container>
      <section aria-label="Mapa" className="relative h-[60vh] overflow-hidden border-t border-beige">
        <iframe title={settings.address} loading="lazy" className="h-full w-full grayscale-[0.9] sepia-[0.25] contrast-[0.9]" src={settings.mapUrl} />
        <div className="pointer-events-none absolute left-5 top-5 bg-cream/95 px-6 py-4 md:left-10"><p className="eyebrow !text-[9px] text-gold">{settings.brand}</p><p className="font-serif text-xl">{settings.address}</p></div>
      </section>
    </>
  )
}

export function NotFound() {
  const { t } = useCMS(); const { go } = useRouter()
  return (
    <Reveal className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-[max(1.25rem,var(--sal))] text-center" threshold={0}>
      <div className="arch absolute top-1/2 h-[70vh] w-[40vh] -translate-y-1/2 border border-gold/30" />
      <p className="fade-up font-script text-[clamp(7rem,20vw,16rem)] leading-none text-gold/70">404</p>
      <h1 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light"><Lines lines={[t('404.title')]} delay={0.2} /></h1>
      <p className="fade-up mt-5 max-w-sm text-taupe">{t('404.sub')}</p>
      <div className="fade-up mt-10"><ArrowBtn onClick={() => go('/')}>{t('404.cta')}</ArrowBtn></div>
    </Reveal>
  )
}

export { FinalCTA, IgTile }
