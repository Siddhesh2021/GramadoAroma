import type { VercelRequest, VercelResponse } from '@vercel/node'

type Product = {
  id: string
  name: { pt: string; en: string }
  desc: { pt: string; en: string }
  price: number
  imgs: string[]
  published: boolean
}

/**
 * Server-rendered Open Graph response for social crawlers.
 *
 * The public site is a hash-routed Vite SPA, so link preview bots cannot see
 * the React-rendered product. This endpoint returns crawlable metadata for the
 * product URL while normal visitors continue to receive the regular SPA.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const productId = String(req.query.path || '').replace(/^\/produto\//, '').split('/')[0]
  const origin = String(process.env.SITE_URL || 'https://gramado-aroma.vercel.app').replace(/\/$/, '')

  if (!productId || productId.includes('..')) {
    return res.redirect(302, origin)
  }

  // Keep this mapping synchronized with src/cms.tsx. It provides the crawler
  // metadata without requiring client-side React execution or fetching code.
  const products: Product[] = [
    { id: 'vela-aromatica-oceanica', name: { pt: 'Vela Aromática Oceânica', en: 'Oceânica Scented Candle' }, desc: { pt: 'Vela em vidro com aroma Oceânica. Luz suave e frescor que se espalha lentamente pelo ambiente.', en: 'Glass candle with Oceânica fragrance. Soft light and freshness that slowly fills the room.' }, price: 54.99, imgs: ['https://images.unsplash.com/photo-1559091156-b9610fb12eda?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'difusor-oceanica', name: { pt: 'Difusor de Aromas Oceânica', en: 'Oceânica Reed Diffuser' }, desc: { pt: 'Difusor de varetas para perfumação contínua, ideal para salas e halls de entrada.', en: 'Reed diffuser for continuous fragrance, ideal for living rooms and entryways.' }, price: 76.99, imgs: ['https://images.unsplash.com/photo-1771073386860-b13f030bd3c2?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'sabonete-vidro-oceanica', name: { pt: 'Sabonete Vidro Aroma Oceânica', en: 'Oceânica Liquid Soap · Glass' }, desc: { pt: 'Sabonete líquido em frasco de vidro, para transformar o lavabo em um pequeno ritual.', en: 'Liquid soap in a glass bottle, turning the powder room into a small ritual.' }, price: 65.99, imgs: ['https://images.unsplash.com/photo-1725940889761-35d90aead72d?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'vela-aromatica-madeira', name: { pt: 'Vela Aromática Madeira', en: 'Madeira Scented Candle' }, desc: { pt: 'Vela em vidro com aroma Madeira, quente e acolhedor para fins de tarde.', en: 'Glass candle with Madeira fragrance, warm and welcoming for late afternoons.' }, price: 54.99, imgs: ['https://images.unsplash.com/photo-1640095889747-2090ee12fa7d?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'sabonete-vidro-madeira', name: { pt: 'Sabonete Vidro Aroma Madeira', en: 'Madeira Liquid Soap · Glass' }, desc: { pt: 'Sabonete líquido com aroma Madeira em frasco de vidro com válvula pump.', en: 'Madeira liquid soap in a glass bottle with pump.' }, price: 65.99, imgs: ['https://images.unsplash.com/photo-1656214286228-08fdbf520d1e?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'home-spray-madeira', name: { pt: 'Home Spray Aromática Madeira', en: 'Madeira Home Spray' }, desc: { pt: 'Borrife em tecidos, cortinas e no ar para perfumar o ambiente na hora.', en: 'Mist onto fabrics, curtains and the air to fragrance a room instantly.' }, price: 65.99, imgs: ['https://images.unsplash.com/photo-1632243575963-3143700087ed?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'difusor-madeira', name: { pt: 'Difusor Aromática Madeira', en: 'Madeira Reed Diffuser' }, desc: { pt: 'Difusor de varetas com aroma Madeira para perfumação contínua e elegante.', en: 'Madeira reed diffuser for continuous, elegant fragrance.' }, price: 76.99, imgs: ['https://images.unsplash.com/photo-1765371513189-44702dcee4be?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'vela-vanilla', name: { pt: 'Vela Aromática Vanilla', en: 'Vanilla Scented Candle' }, desc: { pt: 'A baunilha clássica, em vela de vidro, para noites tranquilas.', en: 'Classic vanilla in a glass candle, for quiet evenings.' }, price: 54.99, imgs: ['https://images.unsplash.com/photo-1528351655744-27cc30462816?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'vela-cereja-avela', name: { pt: 'Vela Lata Cereja e Avelã', en: 'Cherry & Hazelnut Tin Candle' }, desc: { pt: 'Vela em lata, compacta e charmosa, com aroma doce e cremoso.', en: 'A compact, charming tin candle with a sweet, creamy scent.' }, price: 44.99, imgs: ['https://images.unsplash.com/photo-1561212856-44e9bae482aa?auto=format&fit=crop&q=75&w=1400'], published: true },
    { id: 'home-spray-capim', name: { pt: 'Home Spray Capim Limão', en: 'Lemongrass Home Spray' }, desc: { pt: 'Frescor herbal para renovar o ar de qualquer cômodo.', en: 'Herbal freshness to renew the air of any room.' }, price: 65.99, imgs: ['https://images.unsplash.com/photo-1720423514789-15a33e59fc81?auto=format&fit=crop&q=75&w=1400'], published: true },
  ]

  const fallback: Product = {
    id: 'brand',
    name: { pt: 'Gramado Aroma', en: 'Gramado Aroma' },
    desc: { pt: 'Fragrâncias para casa que transformam pequenos momentos em experiências.', en: 'Home fragrances that turn small moments into experiences.' },
    price: 0,
    imgs: [origin + '/gramado-aroma-share.jpg'],
    published: true,
  }
  const product = products.find((item) => item.id === productId && item.published) || fallback
  const lang = String(req.query.lang || 'pt') === 'en' ? 'en' : 'pt'
  const title = product.id === 'brand'
    ? 'Gramado Aroma — Fragrâncias para casa'
    : `${product.name[lang]} | Gramado Aroma`
  const description = product.desc[lang]
  const url = `${origin}/produto/${encodeURIComponent(product.id)}`
  // For social previews we prefer a public product image. Keep the brand fallback
  // for any entry that does not yet have its own image.
  const image = product.imgs[0] || `${origin}/gramado-aroma-share.jpg`
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).send(`<!doctype html>
<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${escape(url)}">
<meta property="og:type" content="product">
<meta property="og:site_name" content="Gramado Aroma">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${escape(url)}">
<meta property="og:image" content="${escape(image)}">
<meta property="og:image:secure_url" content="${escape(image)}">
<meta property="og:image:alt" content="${escape(title)}">
<meta property="product:price:amount" content="${product.price.toFixed(2)}">
<meta property="product:price:currency" content="BRL">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}">
<meta name="twitter:image" content="${escape(image)}">
<meta http-equiv="refresh" content="0;url=${escape(url)}#/produto/${encodeURIComponent(product.id)}">
</head>
<body>
<p><a href="${escape(url)}#/produto/${encodeURIComponent(product.id)}">Continue to Gramado Aroma</a></p>
</body>
</html>`)
}
