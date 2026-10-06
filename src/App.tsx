import { useState } from 'react'
import { CMSProvider } from './cms'
import { Router, Loader } from './motion'
import { CartProvider, Toast } from './ui'
import { Nav, Footer, CartDrawer } from './chrome'
import { Home } from './home'
import { Products, ProductDetail, About, ReviewsPage, Contact, NotFound } from './pages'
import Admin from './admin'

function Site({ path, ready }: { path: string; ready: boolean }) {
  const [route, query = ''] = path.split('?')
  if (route.startsWith('/admin')) return <Admin />
  const page = route === '/' ? <Home ready={ready} />
    : route === '/produtos' ? <Products key={query} query={query} />
    : route.startsWith('/produto/') ? <ProductDetail id={route.slice(9)} />
    : route === '/sobre' ? <About />
    : route === '/avaliacoes' ? <ReviewsPage />
    : route === '/contato' ? <Contact />
    : <NotFound />
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-soft focus:px-4 focus:py-2 focus:text-cream">Pular para o conteúdo</a>
      <Nav />
      <main id="main" className="w-full max-w-full overflow-x-clip">{page}</main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  return (
    <CMSProvider>
      <CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Gramado Aroma', url: 'https://gramadoaroma.com.br', sameAs: ['https://instagram.com/gramadoaromaoficial'] }) }} />
        <Router>{(path) => <Site path={path} ready={!loading} />}</Router>
        {loading && <Loader onDone={() => setLoading(false)} />}
        <div className="grain" aria-hidden />
      </CartProvider>
    </CMSProvider>
  )
}
