import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Flame, PenTool, Gem, Hourglass } from 'lucide-react'
import { useCMS, brl } from './cms'
import { Parallax, Reveal, Lines, useRouter, useSmoothScroll } from './motion'
import { ArrowBtn, TextLink, Sparkle, Botanical, Stars, IgTile } from './ui'

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-[1600px] px-[max(1.25rem,var(--sal))] md:px-[max(2.5rem,var(--sar))] ${className}`}>{children}</div>

function Hero({ ready }: { ready: boolean }) {
  const { t, assets } = useCMS(); const { go } = useRouter()
  return (
    <section className={`hero-stage relative h-[100dvh] min-h-[640px] overflow-hidden bg-blush ${ready ? 'in' : ''}`} aria-labelledby="hero-title">
      <div className={`hero-photo absolute inset-0 transition-transform duration-[2600ms] ease-out-lux ${ready ? 'scale-100' : 'scale-[1.05]'}`}>
        <Parallax speed={0.06} className="absolute inset-[-4%_0] h-[108%]"><img src={assets.living} alt="Sala acolhedora com luz suave" fetchPriority="high" className="h-full w-full object-cover opacity-90" /></Parallax>
      </div>
      <div className="hero-wash absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-grain absolute inset-0" aria-hidden="true" />
      <Parallax speed={-0.1} className="absolute bottom-[-6%] right-[6%] hidden w-[22vw] max-w-[340px] md:block">
        <div className="hero-candle arch clip relative aspect-[3/4.2] overflow-hidden border border-gold/40 bg-mist p-2" style={{ transitionDelay: '.6s' }}>
          <img src={assets.candleTable} alt="Vela aromática Gramado Aroma" className="arch h-full w-full object-cover" style={{ transitionDelay: '.6s' }} />
          <span className="hero-candle-smoke" aria-hidden="true">
            <i className="hero-candle-smoke-puff hero-candle-smoke-puff-a" />
            <i className="hero-candle-smoke-puff hero-candle-smoke-puff-b" />
            <i className="hero-candle-smoke-puff hero-candle-smoke-puff-c" />
          </span>
        </div>
      </Parallax>
      <Parallax speed={-0.05} className="absolute -left-10 top-24 hidden text-logo/30 lg:block"><Botanical className="h-[60vh]" /></Parallax>
      <div className="relative flex h-full flex-col justify-center px-0 pb-10 pt-24 md:justify-end md:px-0 md:pb-24 md:pt-0">
        <Container className="w-full">
          <Parallax speed={0.08}>
            <p className="hero-eyebrow fade-up eyebrow mb-8 flex w-fit items-center gap-3 text-gold" style={{ transitionDelay: '.2s' }}><Sparkle />{t('hero.label')}</p>
            <h1 id="hero-title" className="max-w-6xl font-serif text-[clamp(3.25rem,13vw,5.5rem)] font-light leading-[0.94] tracking-[-0.015em] text-logo md:text-[clamp(4rem,8.2vw,8.4rem)]">
              <Lines delay={0.3} step={0.12} lines={[t('hero.title1'), <em key="e" className="pb-1 font-light italic leading-[1.08] text-taupe">{t('hero.title2')}</em>]} />
            </h1>
            <div className="mt-7 flex flex-col gap-7 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-10 md:pr-[30vw]">
              <p className="hero-subtext fade-up max-w-sm text-[15px] leading-relaxed text-logo/80" style={{ transitionDelay: '.7s' }}>{t('hero.sub')}</p>
              <div className="fade-up flex flex-wrap items-center gap-8 text-logo" style={{ transitionDelay: '.85s' }}>
                <ArrowBtn onClick={() => go('/produtos')} className="!border-logo !bg-logo">{t('hero.cta')}</ArrowBtn>
                <TextLink onClick={() => go('/sobre')}>{t('hero.cta2')}</TextLink>
              </div>
            </div>
          </Parallax>
        </Container>
      </div>
    </section>
  )
}

function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  return <p className={className}>{text}</p>
}

/* Fragrance main image: animates the <img> itself inside its (static, overflow-hidden)
   arch/frame — opacity 0 + translateY(30px)/scale(1.04) → visible, 1000ms ease-out-lux.
   Self-observes via IntersectionObserver so every CMS-driven fragrance (present and
   future) animates on scroll entrance, and remounts (key change) replay it. */
function FragImg({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <img ref={ref} loading="lazy" src={src} alt={alt} className={`frag-image-reveal ${className}`} />
}

function Story() {
  const { t, assets } = useCMS()
  return (
    <section className="relative z-10 flex min-h-fit flex-col justify-center py-12 md:py-20" aria-labelledby="story-t">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h2 id="story-t" className="font-serif text-[clamp(2.8rem,6vw,6rem)] font-light uppercase leading-[0.95] tracking-[0.01em] text-soft"><Lines lines={[t('story.t1'), <em key="a" className="normal-case italic text-gold">{t('story.t2')}</em>]} /></h2>
          <ScrubText text={t('story.body')} className="story-body mt-10 max-w-2xl font-serif text-[clamp(1.4rem,2.2vw,2.1rem)] font-normal leading-[1.35] text-soft md:mt-14" />
          <div className="fade-up mt-10 flex items-center gap-5 md:mt-14"><span className="h-px w-16 bg-gold" /><span className="font-script text-3xl text-gold">{t('story.quote')}</span></div>
        </Reveal>
        <Reveal className="relative flex flex-col items-center justify-center lg:col-span-5">
          {/* Sized to roughly match the text column. It used to be aspect-3/4.3
              at w-85% plus mt-24, which rendered ~740px tall against ~500px of
              copy and left a large dead zone under the quote. */}
          <div className="clip arch relative mx-auto aspect-[4/5] w-[76%] overflow-hidden lg:mt-8"><Parallax speed={0.12} scale={1.2} className="absolute inset-0"><img loading="lazy" src={assets.diffuser} alt="Difusor de aromas Gramado Aroma" className="h-full w-full object-cover" /></Parallax></div>
          <Parallax speed={-0.18} className="relative -mt-[15%] -ml-[25%] w-[42%]"><div className="clip aspect-square overflow-hidden border-8 border-ivory bg-ivory" style={{ transitionDelay: '.3s' }}><img loading="lazy" src={assets.candleTea} alt="" className="h-full w-full object-cover" /></div></Parallax>
          <div className="arch pointer-events-none absolute left-[3%] top-[-3%] aspect-[4/5] w-[80%] border border-gold/40 lg:top-[calc(3rem-3%)] lg:ml-[4.5%]" />
        </Reveal>
      </Container>
    </section>
  )
}

/* Pinned horizontal gallery on desktop (vertical scroll -> x translate); native swipe on touch */
function Collection() {
  const { t, tr, products, fragrances } = useCMS(); const { go } = useRouter()
  const wrap = useRef<HTMLDivElement>(null), track = useRef<HTMLDivElement>(null), bar = useRef<HTMLDivElement>(null)
  const list = products.filter((p) => p.published && p.featured).concat(products.filter((p) => p.published && !p.featured)).slice(0, 7)
  // Size the pinned region from the real horizontal travel instead of a fixed 340vh.
  // This removes the dead scroll space that appeared after the cards finished moving.
  useEffect(() => {
    const w = wrap.current; const tr = track.current
    if (!w || !tr) return
    const syncHeight = () => {
      if (innerWidth < 1024) {
        w.style.removeProperty('height')
        return
      }
      const max = Math.max(0, tr.scrollWidth - innerWidth)
      const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 0
      w.style.height = `${Math.max(innerHeight, innerHeight + max - headerHeight)}px`
    }
    syncHeight()
    const ro = new ResizeObserver(syncHeight)
    ro.observe(tr)
    addEventListener('resize', syncHeight)
    return () => { ro.disconnect(); removeEventListener('resize', syncHeight) }
  }, [list.length])

  useSmoothScroll(() => {
    const w = wrap.current, tr = track.current
    if (!w || !tr || innerWidth < 1024) {
      if (tr) tr.style.transform = ''
      if (bar.current) bar.current.style.transform = 'scaleX(0)'
      return
    }
    const r = w.getBoundingClientRect()
    const max = Math.max(0, tr.scrollWidth - innerWidth)
    const range = Math.max(1, r.height - innerHeight)
    const p = max === 0 ? 0 : Math.min(1, Math.max(0, -r.top / range))
    tr.style.transform = `translate3d(${-p * max}px,0,0)`
    if (bar.current) bar.current.style.transform = `scaleX(${p})`
  })
  return (
    <section ref={wrap} className="relative bg-mist" aria-labelledby="col-t">
      <div className="overflow-hidden py-28 lg:sticky lg:top-[var(--hdr)] lg:flex lg:h-[calc(100dvh-var(--hdr))] lg:flex-col lg:py-0">
        <div className="w-full lg:my-auto lg:py-8">
        <Parallax mobileOnly speed={-0.055} className="collection-heading-plane">
          <Container className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <Reveal><h2 id="col-t" className="font-serif text-[clamp(2.65rem,6vw,6rem)] font-light uppercase leading-[0.95]"><Lines lines={[t('col.title')]} /></h2></Reveal>
            <Reveal className="max-w-sm"><p className="fade-up text-sm leading-relaxed text-taupe">{t('col.sub')}</p></Reveal>
            <p className="eyebrow flex items-center gap-3 !text-[9px] text-gold md:hidden"><span className="h-px w-8 bg-gold" />{t('col.drag')} →</p>
          </Container>
        </Parallax>
        {/* No touch-pan-x here: it would stop the browser scrolling the page
            vertically when a swipe begins on a card, trapping Android users
            at the carousel. Default pan-x pan-y gives both gestures. */}
        <div ref={track} data-cursor="drag" className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-[max(1.25rem,var(--sal))] pb-6 will-change-transform [scrollbar-width:none] md:gap-10 md:px-[max(2.5rem,var(--sar))] lg:snap-none lg:overflow-visible">
          {list.map((p, i) => {
            const f = fragrances.find((x) => x.id === p.frag)!
            return (
              <button key={p.id} onClick={() => go('/produto/' + p.id)} data-cursor="view" data-cursor-label={t('prod.view')} className="group relative w-[82vw] shrink-0 snap-center text-left md:w-[30vw] lg:w-[min(28vw,45vh)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img loading="lazy" src={p.imgs[0]} alt={tr(p.name)} className="h-full w-full scale-[1.08] object-cover transition-transform duration-[1600ms] ease-out-lux group-hover:translate-x-[-2%] group-hover:scale-[1.14]" />
                  <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 pb-6 pt-16 text-white">
                    <p className="eyebrow mb-2 !text-[9px] font-semibold text-gold-2">{tr(f.name)} · {p.size}</p>
                    <p className="overflow-hidden py-1 font-serif text-[clamp(1.6rem,2.4vw,2.6rem)] font-medium leading-[1.02]"><span className="block transition-transform duration-[900ms] ease-out-lux md:translate-y-2 md:group-hover:translate-y-0">{tr(p.name)}</span></p>
                    <div className="mt-3 flex items-center justify-between overflow-hidden py-1"><span className="block text-sm tabular-nums font-semibold transition-all duration-[900ms] ease-out-lux md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">{brl(p.price)}</span><span className="eyebrow flex items-center gap-2 !text-[9px] font-semibold transition-all delay-100 duration-[900ms] ease-out-lux md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">{t('prod.view')}<ArrowRight strokeWidth={1} className="h-3.5 w-3.5" /></span></div>
                  </div>
                </div>
                <span className="eyebrow mt-4 block !text-[9px] text-taupe">0{i + 1} / 0{list.length}</span>
              </button>
            )
          })}
          <div className="flex w-[60vw] shrink-0 items-center justify-center md:w-[24vw]"><ArrowBtn onClick={() => go('/produtos')}>{t('cta.btn')}</ArrowBtn></div>
        </div>
        <Container className="mt-10 hidden lg:block"><div className="h-px bg-beige"><div ref={bar} className="h-px origin-left scale-x-0 bg-gold" /></div></Container>
        </div>
      </div>
    </section>
  )
}

function Fragrances() {
  const { t, tr, fragrances, products } = useCMS(); const { go } = useRouter(); const [a, setA] = useState(0)
  const f = fragrances[a]
  const product = products.find((p) => p.published && p.frag === f.id)
  const mobileWrap = useRef<HTMLElement>(null)
  const mobileStage = useRef<HTMLDivElement>(null)
  const mobileTitle = useRef<HTMLDivElement>(null)
  const mobileCopy = useRef<HTMLDivElement>(null)
  const mobileImage = useRef<HTMLDivElement>(null)
  const mobileIndex = useRef(-1)
  useSmoothScroll((y) => {
    const wrap = mobileWrap.current; const stage = mobileStage.current
    if (!wrap || !stage || innerWidth >= 1024) return
    const distance = Math.max(1, wrap.offsetHeight - innerHeight)
    const progress = Math.min(0.999, Math.max(0, -wrap.getBoundingClientRect().top / distance))
    const raw = progress * fragrances.length
    const index = Math.min(fragrances.length - 1, Math.floor(raw))
    const local = raw - index
    if (index !== mobileIndex.current) { mobileIndex.current = index; setA(index) }
    const drift = (0.5 - local) * 2
    if (mobileTitle.current) mobileTitle.current.style.transform = `translate3d(0, ${(drift * 18).toFixed(2)}px, 0)`
    if (mobileCopy.current) mobileCopy.current.style.transform = `translate3d(0, ${(drift * -28).toFixed(2)}px, 0)`
    if (mobileImage.current) mobileImage.current.style.transform = `translate3d(0, ${(drift * 42).toFixed(2)}px, 0) scale(${1 + Math.abs(drift) * 0.025})`
  })
  return (
    <>
      <section ref={mobileWrap} className="relative lg:hidden" style={{ height: `calc(${fragrances.length} * 100svh)` }} aria-labelledby="frag-t-mobile">
        <div ref={mobileStage} className="sticky top-0 flex h-[100svh] min-h-[640px] flex-col justify-center overflow-hidden px-[max(1.25rem,var(--sal))] py-24 transition-colors duration-700" style={{ background: f.bg, color: f.ink }}>
          <div className="pointer-events-none absolute inset-y-0 left-5 w-px opacity-20" style={{ background: f.ink }} />
          <div ref={mobileTitle} className="relative z-10 transition-transform duration-200 ease-out">
            <h2 id="frag-t-mobile" className="eyebrow mb-8 flex items-center gap-3"><Sparkle />{t('frag.title')}</h2>
            <div key={f.id} className="mobile-fragrance-swap flex items-baseline gap-5 border-b pb-4" style={{ borderColor: f.ink + '28' }}>
              <span className="eyebrow !text-[9px] opacity-60">{String(a + 1).padStart(2, '0')}</span>
              <h3 key={f.id} className="font-serif text-[clamp(2.7rem,13vw,4.4rem)] font-light italic leading-[1.08]">{tr(f.name)}</h3>
            </div>
          </div>
          <div ref={mobileCopy} className="relative z-10 ml-5 mt-7 border-l pl-5 transition-transform duration-200 ease-out" style={{ borderColor: f.accent }}>
            <p className="eyebrow !text-[9px]" style={{ color: f.accent }}>{tr(f.notes)}</p>
            <p key={f.id} className="mobile-fragrance-swap mt-4 max-w-sm font-serif text-xl font-light leading-snug">{tr(f.desc)}</p>
            <div className="mt-6"><TextLink onClick={() => go('/produtos?f=' + f.id)}>{t('frag.cta')}</TextLink></div>
          </div>
          <div ref={mobileImage} className="relative z-0 mx-auto mt-12 w-[78%] transition-transform duration-200 ease-out">
            <button type="button" onClick={() => product && go('/produto/' + product.id)} className="group block w-full text-left">
              <div className="arch relative h-[38svh] min-h-[260px] max-h-[360px] overflow-hidden border p-2" style={{ borderColor: f.accent + '70' }}>
                <FragImg key={f.id} src={product?.imgs[0] || f.img} alt={tr(product?.name || f.name)} className="arch h-full w-full object-cover group-active:scale-105" />
                {product && <div className="mobile-fragrance-swap absolute inset-x-2 bottom-2 bg-gradient-to-t from-soft/75 to-transparent px-4 pb-4 pt-14 text-cream"><p className="font-serif text-xl leading-tight">{tr(product.name)}</p><p className="mt-1 text-xs tabular-nums">{brl(product.promo ?? product.price)}</p></div>}
              </div>
            </button>
          </div>
          <div className="absolute bottom-7 right-5 flex items-center gap-3">
            <span className="eyebrow !text-[8px] opacity-60">{String(a + 1).padStart(2, '0')} / {String(fragrances.length).padStart(2, '0')}</span>
            <span className="h-px w-10 opacity-35" style={{ background: f.ink }} />
          </div>
        </div>
      </section>

      <section className="relative hidden overflow-hidden py-28 transition-colors duration-[1400ms] ease-out-lux lg:block" style={{ background: f.bg, color: f.ink }} aria-labelledby="frag-t">
        <Container>
          <Reveal><h2 id="frag-t" className="eyebrow mb-16 flex items-center gap-3"><Sparkle />{t('frag.title')}</h2></Reveal>
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5" role="tablist" aria-label={t('frag.title')}>
              {fragrances.map((x, i) => (
                <button key={x.id} role="tab" aria-selected={i === a} onClick={() => setA(i)} onMouseEnter={() => setA(i)} className="group flex w-full items-baseline gap-6 border-b py-4 text-left transition-colors duration-700" style={{ borderColor: f.ink + '22' }}>
                  <span className="eyebrow w-6 !text-[9px] opacity-50">0{i + 1}</span>
                  <span className={`font-serif text-[clamp(2rem,3.6vw,3.6rem)] font-light leading-none transition-all duration-[900ms] ease-out-lux ${i === a ? 'translate-x-3 italic' : 'opacity-35 group-hover:opacity-70'}`}>{tr(x.name)}</span>
                </button>
              ))}
            </div>
            <div className="relative lg:col-span-4">
              <div className="arch relative mx-auto aspect-[3/4.2] w-full overflow-hidden">
                {fragrances.map((x, i) => <FragImg key={x.id} src={x.img} alt={tr(x.name)} className={`absolute inset-0 h-full w-full object-cover ${i === a ? 'scale-100 opacity-100 [clip-path:inset(0_0_0_0)]' : 'scale-110 opacity-0 [clip-path:inset(0_0_100%_0)]'}`} />)}
              </div>
              <div className="arch pointer-events-none absolute inset-x-[-1rem] -inset-y-4 border transition-colors duration-1000" style={{ borderColor: f.accent + '80' }} />
            </div>
            <div className="lg:col-span-3">
              <div key={f.id} className="in">
                <p className="mline"><span className="eyebrow block !text-[10px]" style={{ color: f.accent }}>{tr(f.notes)}</span></p>
                <p className="fade-up mt-6 font-serif text-2xl font-light leading-snug">{tr(f.desc)}</p>
                <div className="fade-up mt-10" style={{ transitionDelay: '.15s' }}><TextLink onClick={() => go('/produtos?f=' + f.id)}>{t('frag.cta')}</TextLink></div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function Why() {
  const { t } = useCMS()
  const icons = [Flame, PenTool, Gem, Hourglass]
  return (
    <section className="py-14 md:py-28" aria-labelledby="why-t">
      <Container>
        <Reveal className="mb-9 text-center md:mb-12"><h2 id="why-t" className="font-serif text-[clamp(2.6rem,5vw,5rem)] font-light uppercase leading-none"><Lines lines={[t('why.title')]} /></h2></Reveal>
        <Reveal className="grid grid-flow-dense border-t border-beige sm:grid-cols-2 lg:grid-cols-4">
          {icons.map((I, i) => (
            <div key={i} className="fade-up group relative border-b border-beige px-6 py-9 md:py-12 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-[900ms] ease-lux group-hover:scale-x-100" />
              <I strokeWidth={0.75} className="h-9 w-9 text-gold transition-transform duration-[900ms] ease-out-lux group-hover:-translate-y-1" />
              <h3 className="mt-7 font-serif text-3xl leading-tight md:mt-10">{t(`why.${i + 1}`)}</h3>
              <p className="mt-4 text-sm leading-relaxed text-taupe">{t(`why.${i + 1}d`)}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}

/* Four depth planes: bg 0.1 · decorative arch 0.2 · product 0.35 · type -0.12 */
function Lifestyle() {
  const { t, assets: { living, bath, candleClose } } = useCMS()
  return (
    <section className="lifestyle-stage relative h-[100svh] min-h-[720px] overflow-hidden bg-blush text-logo md:h-[130vh] md:min-h-[760px]" aria-labelledby="life-t">
      <Parallax speed={0.06} className="absolute inset-[-10%_0]"><img loading="lazy" src={living} alt="Sala de estar clara e acolhedora" className="h-full w-full object-cover opacity-76 sepia-[0.02] saturate-[.98] md:opacity-75" /></Parallax>
      <div className="lifestyle-wash absolute inset-0 bg-gradient-to-b from-blush/68 via-blush/22 to-blush/78 md:bg-gradient-to-r md:from-blush/86 md:via-blush/36 md:to-blush/12" />
      <div className="absolute inset-x-0 top-0 h-px bg-gold/30" />
      <Parallax speed={0.16} className="absolute left-1/2 top-[10%] md:top-[18%]"><div className="arch h-[76svh] max-h-[650px] w-[64vw] max-w-[300px] -translate-x-1/2 border border-gold/45 md:h-[70vh] md:w-[34vw] md:max-w-none" /></Parallax>
      <Parallax speed={0.18} className="lifestyle-product absolute -bottom-[2%] -right-[3%] w-[48vw] max-w-[220px] md:bottom-[8%] md:right-[8%] md:w-[24vw] md:max-w-[380px]"><Reveal><div className="clip arch aspect-[3/4.4] overflow-hidden border border-blush bg-blush p-1.5 shadow-2xl shadow-logo/10"><img loading="lazy" src={bath} alt="Sabonete líquido Gramado Aroma no lavabo" className="arch h-full w-full object-cover" /></div></Reveal></Parallax>
      <Parallax speed={0.28} className="absolute left-[6%] top-[14%] hidden w-[16vw] md:block"><Reveal><div className="clip aspect-square overflow-hidden" style={{ transitionDelay: '.2s' }}><img loading="lazy" src={candleClose} alt="" className="h-full w-full object-cover" /></div></Reveal></Parallax>
      <Parallax speed={-0.1} className="absolute inset-x-0 top-[27%] z-20 md:top-[40%]">
        <Reveal as="div" className="mx-auto max-w-[1600px] px-[max(1.25rem,var(--sal))] md:px-[max(2.5rem,var(--sar))]">
          <p className="lifestyle-eyebrow fade-up eyebrow mb-6 flex w-fit items-center gap-3 !text-[9px] text-gold"><Sparkle />{t('hero.label')}</p>
          <h2 id="life-t" className="max-w-5xl font-serif text-[clamp(3rem,12vw,9.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-logo"><Lines lines={[t('life.t1'), <em key="a" className="pl-[7vw] italic text-gold md:pl-[8vw]">{t('life.t2')}</em>]} /></h2>
          <p className="fade-up mt-7 max-w-[18rem] border-l border-gold pl-4 text-sm leading-relaxed text-logo/85 md:ml-[8vw] md:mt-8 md:max-w-xs">{t('life.body')}</p>
        </Reveal>
      </Parallax>
    </section>
  )
}

export function ReviewCarousel() {
  const { t, tr, reviews, products, lang } = useCMS()
  const list = reviews.filter((r) => r.approved && r.featured)
  const [i, setI] = useState(0); const [dx, setDx] = useState(0); const start = useRef<number | null>(null)
  const n = list.length; const clamp = (k: number) => (k + n) % n
  const stack = useRef<HTMLDivElement>(null)
  const slides = useRef<(HTMLElement | null)[]>([])

  /* A grid stack on its own sizes to the TALLEST slide, which left a large empty
     block under shorter quotes. Measure the active slide and pin the box to it;
     the wrapper's overflow-hidden clips the taller inactive ones (opacity 0). */
  useEffect(() => {
    const box = stack.current; const el = slides.current[i]
    if (!box || !el) return
    const fit = () => { box.style.height = `${Math.max(280, el.offsetHeight)}px` }
    fit()
    addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [i, n, lang])

  if (!n) return null
  return (
    /* touch-pan-y keeps vertical page scroll native while letting horizontal
       drags register — without it Android cancels the gesture mid-swipe. */
    <div className="relative touch-pan-y select-none" role="group" aria-roledescription="carousel" aria-label={t('rev.title1')} tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); setI(clamp(i + 1)) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); setI(clamp(i - 1)) }
      }}
      onPointerDown={(e) => { if (e.pointerType === 'mouse' && e.button !== 0) return; start.current = e.clientX; (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId) }}
      onPointerMove={(e) => start.current !== null && setDx(e.clientX - start.current)}
      onPointerUp={() => { if (Math.abs(dx) > 60) setI(clamp(i + (dx < 0 ? 1 : -1))); setDx(0); start.current = null }}
      onPointerCancel={() => { setDx(0); start.current = null }}
      onPointerLeave={() => { setDx(0); start.current = null }} data-cursor="drag">
      {/* Grid stack, not absolute inset-0: the box grows to the tallest slide,
          so long quotes and enlarged Android font scales can never clip. */}
      <div className="relative overflow-hidden">
        <div ref={stack} className="carousel-h grid min-h-[280px] content-start [&>*]:col-start-1 [&>*]:row-start-1">
          {list.map((r, k) => {
            const off = ((k - i + n) % n); const pos = off === 0 ? 0 : off === 1 ? 1 : off === n - 1 ? -1 : 2
            const p = products.find((x) => x.id === r.product)
            return (
              <figure key={r.id} ref={(el) => { slides.current[k] = el }} aria-hidden={pos !== 0} className="transition-all duration-[1200ms] ease-lux" style={{ transform: `translateX(calc(${pos * 100}% + ${pos === 0 ? dx * 0.4 : 0}px))`, opacity: pos === 0 ? 1 : 0, pointerEvents: pos === 0 ? 'auto' : 'none' }}>
                <Stars n={r.rating} />
                <blockquote className="mt-8 max-w-4xl font-serif text-[clamp(1.8rem,3.6vw,3.4rem)] font-light italic leading-[1.15] text-soft">“{tr(r.text)}”</blockquote>
                <figcaption className="mt-10 flex items-center gap-5">
                  {r.photo && <img src={r.photo} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />}
                  <div><p className="eyebrow !text-[10px] text-soft">— {r.name}</p>{p && <p className="mt-1 text-xs text-taupe">{t('rev.bought')}: {tr(p.name)}</p>}</div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-4 sm:gap-6">
        <button type="button" aria-label="Anterior" onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()} onClick={() => { setDx(0); setI(clamp(i - 1)) }} className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-beige transition-colors duration-500 hover:border-gold hover:text-gold active:bg-gold/10 sm:h-12 sm:w-12"><ArrowLeft strokeWidth={1} className="h-4 w-4" /></button>
        <button type="button" aria-label="Próximo" onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()} onClick={() => { setDx(0); setI(clamp(i + 1)) }} className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-beige transition-colors duration-500 hover:border-gold hover:text-gold active:bg-gold/10 sm:h-12 sm:w-12"><ArrowRight strokeWidth={1} className="h-4 w-4" /></button>
        <div className="flex flex-1 gap-2">{list.map((_, k) => <span key={k} className="relative h-px flex-1 bg-beige"><span className={`absolute inset-0 origin-left bg-gold transition-transform duration-[1200ms] ease-lux ${k === i ? 'scale-x-100' : 'scale-x-0'}`} /></span>)}</div>
        <span className="eyebrow !text-[10px] tabular-nums text-taupe">0{i + 1} / 0{n}</span>
      </div>
    </div>
  )
}

function Reviews() {
  const { t } = useCMS(); const { go } = useRouter()
  return (
    <section className="py-20 md:py-28" aria-labelledby="rev-t">
      <Container className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 id="rev-t" className="font-serif text-[clamp(2.2rem,3.8vw,3.8rem)] font-light uppercase leading-[1]"><Lines lines={[t('rev.title1'), <span key="a" className="text-gold">{t('rev.title2')}</span>]} /></h2>
          <div className="fade-up mt-10"><TextLink onClick={() => go('/avaliacoes')}>{t('rev.all')}</TextLink></div>
        </Reveal>
        <div className="lg:col-span-8"><ReviewCarousel /></div>
      </Container>
    </section>
  )
}

export function InstagramGrid() {
  const { t, posts, settings } = useCMS()
  const list = posts.filter((p) => p.featured).slice(0, 8)
  if (!list.length) return <p className="py-20 text-center text-taupe">Instagram indisponível no momento.</p>
  const spans = ['md:col-span-2 md:row-span-2', '', 'md:row-span-2', '', '', 'md:col-span-2', '', 'md:col-span-2']
  return (
    <section className="bg-cream py-20 md:py-28" aria-labelledby="ig-t">
      <Container>
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="ig-t" className="font-serif text-[clamp(2.8rem,6vw,6rem)] font-light uppercase leading-[0.95]"><Lines lines={[t('ig.title')]} /></h2>
          <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer" className="fade-up font-script text-4xl text-gold transition hover:text-soft">@{settings.instagram}</a>
        </Reveal>
        <Reveal className="grid auto-rows-[44vw] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[17vw] md:grid-cols-5 md:gap-4" threshold={0.05}>
          {list.map((p, i) => <div key={p.id} className={`fade-up ${spans[i]}`} style={{ transitionDelay: `${(i % 5) * 0.08}s` }}><IgTile post={p} className="h-full w-full" /></div>)}
        </Reveal>
      </Container>
    </section>
  )
}

export function FinalCTA() {
  const { t, assets } = useCMS(); const { go } = useRouter()
  return (
    <section className="final-cta relative flex min-h-[88svh] items-center overflow-hidden bg-blush text-logo md:min-h-[100dvh]">
      <Parallax speed={0.12} className="absolute inset-[-12%_0]"><img loading="lazy" src={assets.candleMany} alt="" className="h-full w-full object-cover opacity-54 saturate-[.9] contrast-[1.04]" /></Parallax>
      <div className="final-cta-wash absolute inset-0" />
      <Reveal className="relative mx-auto w-full max-w-6xl px-[max(1.25rem,var(--sal))] text-center">
        <Sparkle className="fade-up mx-auto mb-10 text-gold" />
        <h2 className="final-cta-title font-serif text-[clamp(2.8rem,7.5vw,7.6rem)] font-light uppercase leading-[0.95]"><Lines lines={[t('cta.t1'), <em key="a" className="normal-case italic text-taupe">{t('cta.t2')}</em>, t('cta.t3')]} /></h2>
        <div className="fade-up mt-14 flex justify-center" style={{ transitionDelay: '.4s' }}><ArrowBtn onClick={() => go('/produtos')} className="!border-logo !bg-logo">{t('cta.btn')}</ArrowBtn></div>
      </Reveal>
    </section>
  )
}

export function Home({ ready }: { ready: boolean }) {
  const { sections } = useCMS()
  const map: Record<string, ReactNode> = { hero: <Hero ready={ready} />, story: <Story />, collection: <Collection />, fragrances: <Fragrances />, why: <Why />, lifestyle: <Lifestyle />, reviews: <Reviews />, instagram: <InstagramGrid />, cta: <FinalCTA /> }
  return <>{sections.filter((s) => s.on).map((s) => <div key={s.id}>{map[s.id]}</div>)}</>
}
