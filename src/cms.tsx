import { createContext, useContext, useEffect, useState, type Context, type ReactNode } from 'react'
import igGrid from './imports/Screenshot_2026-10-05_231343.png'
import logo from './imports/623959740_17842566177686511_6336884742571772822_n.jpg'

export type Lang = 'pt' | 'en'
export type L = { pt: string; en: string }
const u = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`

export const IMG = {
  hero: u('1601922046210-41e129a3e64a', 2000),
  candleTable: u('1640095889747-2090ee12fa7d'),
  candleClose: u('1561212856-44e9bae482aa'),
  candleTea: u('1528351655744-27cc30462816'),
  candleMany: u('1476900164809-ff19b8ae5968', 2000),
  candleLit: u('1559091156-b9610fb12eda'),
  diffuser: u('1771073386860-b13f030bd3c2'),
  shelf: u('1765371513189-44702dcee4be'),
  vase: u('1675864252494-5835ec0f857c'),
  soap: u('1725940889761-35d90aead72d'),
  soapSink: u('1656214286228-08fdbf520d1e'),
  bath: u('1777014547456-7d94a04382ee'),
  vanity: u('1754788358645-d6e6cca12e25'),
  spray: u('1632243575963-3143700087ed'),
  bottle: u('1720423514789-15a33e59fc81'),
  living: u('1631510390389-c1e4fb20ff31', 2000),
  sofa: u('1541194577687-8c63bf9e7ee3', 2000),
  chest: u('1601617956235-c97e358d054f'),
  fire: u('1726090401458-7abb00f7450c', 2000),
  igGrid,
  logo,
}

export type Fragrance = { id: string; name: L; notes: L; desc: L; bg: string; ink: string; accent: string; img: string }
export const FRAGRANCES: Fragrance[] = [
  { id: 'madeira', name: { pt: 'Madeira', en: 'Madeira' }, notes: { pt: 'Notas amadeiradas · âmbar · acolhimento', en: 'Woody notes · amber · warmth' }, desc: { pt: 'Quente e envolvente, como uma tarde de inverno na serra. Um aroma que deixa a casa com cara de abrigo.', en: 'Warm and enveloping, like a winter afternoon in the mountains. A scent that turns a house into a shelter.' }, bg: '#E7DCCB', ink: '#3B2D1F', accent: '#8A6A43', img: IMG.candleTable },
  { id: 'oceanica', name: { pt: 'Oceânica', en: 'Oceânica' }, notes: { pt: 'Brisa marinha · frescor · leveza', en: 'Sea breeze · freshness · lightness' }, desc: { pt: 'Leve e luminosa, traz para dentro de casa a sensação de janelas abertas para o mar.', en: 'Light and luminous, it brings the feeling of windows open to the sea inside your home.' }, bg: '#E3E9EA', ink: '#1F3338', accent: '#5D8088', img: IMG.vanity },
  { id: 'capim', name: { pt: 'Capim Limão', en: 'Lemongrass' }, notes: { pt: 'Herbal · cítrico · verde', en: 'Herbal · citrus · green' }, desc: { pt: 'Fresco e revigorante, desperta os ambientes com a delicadeza das manhãs de jardim.', en: 'Fresh and invigorating, it awakens your spaces with the gentleness of garden mornings.' }, bg: '#E5E6D6', ink: '#2C3320', accent: '#717C4E', img: IMG.vase },
  { id: 'cereja', name: { pt: 'Cereja e Avelã', en: 'Cherry & Hazelnut' }, notes: { pt: 'Frutado · gourmand · cremoso', en: 'Fruity · gourmand · creamy' }, desc: { pt: 'Doce na medida certa, cremoso e aconchegante. Para noites de conversa e cobertor.', en: 'Just the right sweetness, creamy and cosy. For evenings of conversation and blankets.' }, bg: '#EDDFD6', ink: '#41241F', accent: '#9A5A4C', img: IMG.candleClose },
  { id: 'vanilla', name: { pt: 'Vanilla', en: 'Vanilla' }, notes: { pt: 'Baunilha · calor · doçura', en: 'Vanilla · warmth · softness' }, desc: { pt: 'Clássica e afetiva. A baunilha que abraça o espaço e permanece na memória.', en: 'Classic and affectionate. Vanilla that embraces the space and stays in memory.' }, bg: '#F1E6CF', ink: '#3D2E14', accent: '#B58A35', img: IMG.candleLit },
]

export type Category = 'velas' | 'difusores' | 'sprays' | 'sabonetes'
export type CategoryItem = { id: Category; name: L }
export const CATEGORIES: CategoryItem[] = [
  { id: 'velas', name: { pt: 'Velas', en: 'Candles' } },
  { id: 'difusores', name: { pt: 'Difusores', en: 'Diffusers' } },
  { id: 'sprays', name: { pt: 'Home Spray', en: 'Home Spray' } },
  { id: 'sabonetes', name: { pt: 'Sabonetes', en: 'Soaps' } },
]

export type Product = { id: string; sku: string; name: L; cat: Category; frag: string; size: string; price: number; promo?: number; desc: L; imgs: string[]; stock: boolean; published: boolean; featured: boolean }
export const PRODUCTS: Product[] = [
  { id: 'vela-aromatica-oceanica', sku: 'GA-VL-OCE', name: { pt: 'Vela Aromática Oceânica', en: 'Oceânica Scented Candle' }, cat: 'velas', frag: 'oceanica', size: '100g', price: 54.99, desc: { pt: 'Vela em vidro com aroma Oceânica. Luz suave e frescor que se espalha lentamente pelo ambiente.', en: 'Glass candle with Oceânica fragrance. Soft light and freshness that slowly fills the room.' }, imgs: [IMG.candleLit, IMG.candleTea, IMG.vanity], stock: true, published: true, featured: true },
  { id: 'difusor-oceanica', sku: 'GA-DF-OCE', name: { pt: 'Difusor de Aromas Oceânica', en: 'Oceânica Reed Diffuser' }, cat: 'difusores', frag: 'oceanica', size: '250ml', price: 76.99, desc: { pt: 'Difusor de varetas para perfumação contínua, ideal para salas e halls de entrada.', en: 'Reed diffuser for continuous fragrance, ideal for living rooms and entryways.' }, imgs: [IMG.diffuser, IMG.shelf, IMG.living], stock: true, published: true, featured: true },
  { id: 'sabonete-vidro-oceanica', sku: 'GA-SB-OCE', name: { pt: 'Sabonete Vidro Aroma Oceânica', en: 'Oceânica Liquid Soap · Glass' }, cat: 'sabonetes', frag: 'oceanica', size: '250ml', price: 65.99, desc: { pt: 'Sabonete líquido em frasco de vidro, para transformar o lavabo em um pequeno ritual.', en: 'Liquid soap in a glass bottle, turning the powder room into a small ritual.' }, imgs: [IMG.soap, IMG.bath, IMG.soapSink], stock: true, published: true, featured: false },
  { id: 'vela-aromatica-madeira', sku: 'GA-VL-MAD', name: { pt: 'Vela Aromática Madeira', en: 'Madeira Scented Candle' }, cat: 'velas', frag: 'madeira', size: '100g', price: 54.99, desc: { pt: 'Vela em vidro com aroma Madeira, quente e acolhedor para fins de tarde.', en: 'Glass candle with Madeira fragrance, warm and welcoming for late afternoons.' }, imgs: [IMG.candleTable, IMG.candleClose, IMG.chest], stock: true, published: true, featured: true },
  { id: 'sabonete-vidro-madeira', sku: 'GA-SB-MAD', name: { pt: 'Sabonete Vidro Aroma Madeira', en: 'Madeira Liquid Soap · Glass' }, cat: 'sabonetes', frag: 'madeira', size: '250ml', price: 65.99, desc: { pt: 'Sabonete líquido com aroma Madeira em frasco de vidro com válvula pump.', en: 'Madeira liquid soap in a glass bottle with pump.' }, imgs: [IMG.soapSink, IMG.soap, IMG.bath], stock: false, published: true, featured: false },
  { id: 'home-spray-madeira', sku: 'GA-HS-MAD', name: { pt: 'Home Spray Aromática Madeira', en: 'Madeira Home Spray' }, cat: 'sprays', frag: 'madeira', size: '200ml', price: 65.99, desc: { pt: 'Borrife em tecidos, cortinas e no ar para perfumar o ambiente na hora.', en: 'Mist onto fabrics, curtains and the air to fragrance a room instantly.' }, imgs: [IMG.spray, IMG.bottle, IMG.sofa], stock: true, published: true, featured: true },
  { id: 'difusor-madeira', sku: 'GA-DF-MAD', name: { pt: 'Difusor Aromática Madeira', en: 'Madeira Reed Diffuser' }, cat: 'difusores', frag: 'madeira', size: '250ml', price: 76.99, desc: { pt: 'Difusor de varetas com aroma Madeira para perfumação contínua e elegante.', en: 'Madeira reed diffuser for continuous, elegant fragrance.' }, imgs: [IMG.shelf, IMG.diffuser, IMG.chest], stock: true, published: true, featured: false },
  { id: 'vela-vanilla', sku: 'GA-VL-VAN', name: { pt: 'Vela Aromática Vanilla', en: 'Vanilla Scented Candle' }, cat: 'velas', frag: 'vanilla', size: '100g', price: 54.99, desc: { pt: 'A baunilha clássica, em vela de vidro, para noites tranquilas.', en: 'Classic vanilla in a glass candle, for quiet evenings.' }, imgs: [IMG.candleTea, IMG.candleLit, IMG.fire], stock: true, published: true, featured: false },
  { id: 'vela-cereja-avela', sku: 'GA-VL-CER', name: { pt: 'Vela Lata Cereja e Avelã', en: 'Cherry & Hazelnut Tin Candle' }, cat: 'velas', frag: 'cereja', size: '80g', price: 44.99, desc: { pt: 'Vela em lata, compacta e charmosa, com aroma doce e cremoso.', en: 'A compact, charming tin candle with a sweet, creamy scent.' }, imgs: [IMG.candleClose, IMG.candleTable, IMG.fire], stock: true, published: true, featured: false },
  { id: 'home-spray-capim', sku: 'GA-HS-CAP', name: { pt: 'Home Spray Capim Limão', en: 'Lemongrass Home Spray' }, cat: 'sprays', frag: 'capim', size: '200ml', price: 65.99, desc: { pt: 'Frescor herbal para renovar o ar de qualquer cômodo.', en: 'Herbal freshness to renew the air of any room.' }, imgs: [IMG.bottle, IMG.spray, IMG.vase], stock: true, published: true, featured: false },
]

export type Review = { id: string; name: string; rating: number; date: string; product: string; text: L; photo?: string; approved: boolean; featured: boolean }
export const REVIEWS: Review[] = [
  { id: 'r1', name: 'Mariana C.', rating: 5, date: '2026-09-12', product: 'vela-aromatica-madeira', text: { pt: 'Minha casa nunca esteve tão aconchegante. O aroma Madeira virou parte da nossa rotina.', en: 'My home has never felt so cosy. Madeira has become part of our routine.' }, photo: IMG.candleTable, approved: true, featured: true },
  { id: 'r2', name: 'Juliana P.', rating: 5, date: '2026-08-28', product: 'difusor-oceanica', text: { pt: 'O difusor Oceânica deixou a sala com cheiro de casa de praia. Recebo elogios de todas as visitas.', en: 'The Oceânica diffuser made the living room smell like a beach house. Every guest compliments it.' }, approved: true, featured: true },
  { id: 'r3', name: 'Rafael M.', rating: 5, date: '2026-08-10', product: 'home-spray-madeira', text: { pt: 'Uso o home spray nas cortinas antes de dormir. Virou um pequeno ritual.', en: 'I mist the home spray on the curtains before bed. It has become a small ritual.' }, approved: true, featured: true },
  { id: 'r4', name: 'Camila S.', rating: 4, date: '2026-07-22', product: 'sabonete-vidro-oceanica', text: { pt: 'O frasco é lindo no lavabo e o aroma é delicado, do jeito que eu queria.', en: 'The bottle looks beautiful in the powder room and the scent is delicate, just as I wanted.' }, photo: IMG.soap, approved: true, featured: true },
  { id: 'r5', name: 'Beatriz L.', rating: 5, date: '2026-07-03', product: 'vela-vanilla', text: { pt: 'Comprei para presentear e acabei comprando outra para mim. Embalagem impecável.', en: 'I bought it as a gift and ended up buying another for myself. Impeccable packaging.' }, approved: true, featured: false },
  { id: 'r6', name: 'Fernanda R.', rating: 5, date: '2026-06-18', product: 'difusor-madeira', text: { pt: 'Chegou rápido e bem embalado. O aroma dura muito e é muito elegante.', en: 'Arrived fast and well packed. The scent lasts a long time and is very elegant.' }, approved: false, featured: false },
]

export type Post = { id: string; type: 'post' | 'reel'; title: string; col: number; row: number; url: string; featured: boolean }
export const POSTS: Post[] = [
  [0, 0, 'post', 'Conheça nossas coleções'], [3, 0, 'reel', 'Difusor ao entardecer'], [5, 0, 'post', 'Vela e flores'],
  [1, 1, 'reel', 'Muda o clima da casa'], [2, 1, 'post', 'Com nossas velas'], [3, 1, 'post', 'Relaxe, respire'],
  [4, 1, 'post', 'Difusor vs. Home Spray'], [0, 2, 'reel', 'Já reparou?'], [1, 2, 'post', 'Presente'], [4, 2, 'post', 'Dia das mães'],
].map(([c, r, t, title], i) => ({ id: 'ig' + i, col: c as number, row: r as number, type: t as 'post' | 'reel', title: title as string, url: 'https://instagram.com/saopauloaroma', featured: i < 8 }))

export type NavItem = { id: string; label: L; url: string; order: number; visible: boolean; external: boolean }
export const NAV: NavItem[] = [
  { id: 'n1', label: { pt: 'Início', en: 'Home' }, url: '/', order: 1, visible: true, external: false },
  { id: 'n2', label: { pt: 'Produtos', en: 'Products' }, url: '/produtos', order: 2, visible: true, external: false },
  { id: 'n3', label: { pt: 'Sobre Nós', en: 'About' }, url: '/sobre', order: 3, visible: true, external: false },
  { id: 'n4', label: { pt: 'Avaliações', en: 'Reviews' }, url: '/avaliacoes', order: 4, visible: true, external: false },
  { id: 'n5', label: { pt: 'Contato', en: 'Contact' }, url: '/contato', order: 5, visible: true, external: false },
]

export const SETTINGS = {
  brand: 'São Paulo Aroma', whatsapp: '5554999999999', phone: '+55 (54) 99999-9999', email: 'contato@saopauloaroma.com.br',
  address: 'São Paulo · São Paulo · Brasil', instagram: 'saopauloaroma', facebook: 'saopauloaroma',
  mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-46.70%2C-23.60%2C-46.56%2C-23.50&layer=mapnik&marker=-23.5505%2C-46.6333',
  hours: { pt: 'Seg a Sex · 9h às 18h · Sáb · 9h às 13h', en: 'Mon to Fri · 9am to 6pm · Sat · 9am to 1pm' } as L,
  currency: 'BRL', defaultLang: 'pt' as Lang,
}

export const SECTIONS = [
  { id: 'hero', label: 'Hero', on: true }, { id: 'story', label: 'Brand Story', on: true }, { id: 'collection', label: 'Featured Products', on: true },
  { id: 'fragrances', label: 'Fragrances', on: true }, { id: 'why', label: 'Why São Paulo Aroma', on: true }, { id: 'lifestyle', label: 'Lifestyle', on: true },
  { id: 'reviews', label: 'Testimonials', on: true }, { id: 'instagram', label: 'Instagram', on: true }, { id: 'cta', label: 'CTA', on: true },
]

export type CustomerDetails = {
  name: string; phone: string; email: string; cep: string; street: string; number: string
  comp: string; district: string; city: string; state: string; notes: string
}
export type OrderLead = {
  id: string; customer: CustomerDetails; items: { id: string; name: string; qty: number; price: number }[]
  total: number; date: string; status: 'Novo' | 'Confirmado' | 'Enviado' | 'Entregue'
}

// Translation dictionary: key -> [pt, en]. Group = first segment.
export const T: Record<string, [string, string]> = {
  'nav.cart': ['Sacola', 'Bag'], 'nav.menu': ['Menu', 'Menu'], 'nav.close': ['Fechar', 'Close'],
  'hero.label': ['Fragrâncias para casa · São Paulo, SP', 'Home fragrance · São Paulo, Brazil'],
  'hero.title1': ['A fragrância que', 'Fragrance that'], 'hero.title2': ['transforma espaços.', 'transforms spaces.'],
  'hero.sub': ['Aromas pensados para transformar momentos cotidianos em experiências.', 'Scents designed to turn everyday moments into experiences.'],
  'hero.cta': ['Explorar coleção', 'Explore collection'], 'hero.cta2': ['Conheça a São Paulo Aroma', 'Discover São Paulo Aroma'], 'hero.scroll': ['Role', 'Scroll'],
  'story.t1': ['Mais que um aroma.', 'More than a scent.'], 'story.t2': ['A experiência.', 'The experience.'],
  'story.body': ['Cada aroma tem o poder de transformar um espaço, despertar uma memória e criar um momento. São Paulo Aroma nasceu para tornar esses pequenos momentos ainda mais especiais.', 'Every scent has the power to transform a space, awaken a memory and create a moment. São Paulo Aroma was born to make those small moments even more special.'],
  'story.quote': ['Relaxe, respire e sinta o aroma.', 'Relax, breathe and feel the scent.'],
  'col.title': ['Nossas coleções', 'Our collections'], 'col.sub': ['Velas, difusores, home sprays e sabonetes — cada peça pensada para um canto da casa.', 'Candles, diffusers, home sprays and soaps — each piece made for a corner of your home.'], 'col.drag': ['Arraste', 'Drag'],
  'frag.title': ['Encontre o seu aroma', 'Find your scent'], 'frag.cta': ['Ver produtos', 'See products'],
  'why.title': ['Por que São Paulo Aroma?', 'Why São Paulo Aroma?'],
  'why.1': ['Aromas que acolhem', 'Scents that embrace'], 'why.1d': ['Fragrâncias pensadas para criar uma atmosfera de conforto desde a porta de entrada.', 'Fragrances crafted to create comfort from the front door in.'],
  'why.2': ['Design que transforma', 'Design that transforms'], 'why.2d': ['Peças que decoram tanto quanto perfumam — vidro, lata e linhas delicadas.', 'Pieces that decorate as much as they fragrance — glass, tin and delicate lines.'],
  'why.3': ['Qualidade em cada detalhe', 'Quality in every detail'], 'why.3d': ['Do aroma à embalagem, cuidado em cada etapa até chegar à sua casa.', 'From scent to packaging, care at every step until it reaches your home.'],
  'why.4': ['Momentos que permanecem', 'Moments that linger'], 'why.4d': ['Um aroma pode mudar completamente a atmosfera de um espaço — e ficar na memória.', 'A scent can completely change the atmosphere of a space — and stay in memory.'],
  'life.t1': ['Sua casa', 'Your home'], 'life.t2': ['é uma experiência.', 'is an experience.'], 'life.body': ['Da sala ao lavabo, do quarto à mesa posta. Transforme pequenos momentos em experiências.', 'From living room to powder room, bedroom to set table. Turn small moments into experiences.'],
  'rev.title1': ['Quem vive a experiência', 'Those who live the'], 'rev.title2': ['São Paulo Aroma', 'São Paulo Aroma experience'], 'rev.all': ['Ver todas as avaliações', 'See all reviews'], 'rev.bought': ['Comprou', 'Purchased'],
  'ig.title': ['Siga o aroma', 'Follow the scent'], 'ig.view': ['Ver no Instagram', 'View on Instagram'],
  'cta.t1': ['Seu espaço', 'Your space'], 'cta.t2': ['merece um aroma', 'deserves a special'], 'cta.t3': ['especial.', 'scent.'], 'cta.btn': ['Explorar produtos', 'Explore products'],
  'prod.title': ['Nossos produtos', 'Our products'], 'prod.sub': ['Encontre o aroma perfeito para cada espaço e momento.', 'Find the perfect scent for every space and moment.'], 'prod.add': ['Adicionar à sacola', 'Add to bag'],
  'prod.all': ['Todos', 'All'], 'prod.allFrag': ['Todos os aromas', 'All scents'], 'prod.count': ['peças', 'pieces'], 'prod.view': ['Ver produto', 'View product'], 'prod.quick': ['Espiar', 'Quick view'],
  'prod.in': ['Disponível', 'In stock'], 'prod.out': ['Indisponível', 'Unavailable'], 'prod.empty': ['Nenhum produto encontrado', 'No products found'], 'prod.emptyD': ['Tente outra combinação de categoria e aroma.', 'Try another category and scent combination.'], 'prod.clear': ['Limpar filtros', 'Clear filters'],
  'pdp.size': ['Tamanho', 'Size'], 'pdp.qty': ['Quantidade', 'Quantity'], 'pdp.add': ['Adicionar à sacola', 'Add to bag'], 'pdp.wa': ['Comprar via WhatsApp', 'Buy via WhatsApp'], 'pdp.notes': ['Notas', 'Notes'],
  'pdp.details': ['Detalhes do produto', 'Product details'], 'pdp.detailsD': ['Recipiente em vidro ou lata, conforme o modelo. Rótulo São Paulo Aroma. Consulte a embalagem para composição completa.', 'Glass or tin vessel depending on model. São Paulo Aroma label. See packaging for full composition.'],
  'pdp.ship': ['Envio', 'Shipping'], 'pdp.shipD': ['Pedidos finalizados pelo WhatsApp. Confirmamos disponibilidade, frete e prazo para o seu CEP.', 'Orders are completed via WhatsApp. We confirm availability, shipping and delivery time for your postcode.'],
  'pdp.care': ['Cuidados', 'Care'], 'pdp.careD': ['Nunca deixe a vela acesa sem supervisão. Na primeira queima, mantenha acesa até a superfície derreter por completo. Mantenha longe de crianças e animais.', 'Never leave a lit candle unattended. On first burn, keep it lit until the surface melts fully. Keep away from children and pets.'],
  'pdp.related': ['Você também pode gostar', 'You may also like'], 'pdp.added': ['adicionado à sacola', 'added to your bag'], 'pdp.unavailable': ['Este produto está temporariamente indisponível. Fale conosco para ser avisado.', 'This product is temporarily unavailable. Contact us to be notified.'],
  'cart.title': ['Sua sacola', 'Your bag'], 'cart.empty': ['Sua sacola está vazia', 'Your bag is empty'], 'cart.emptyD': ['Encontre a fragrância que combina com você.', 'Find the fragrance that suits you.'],
  'cart.subtotal': ['Subtotal', 'Subtotal'], 'cart.note': ['Frete e disponibilidade confirmados pelo WhatsApp.', 'Shipping and availability confirmed via WhatsApp.'], 'cart.checkout': ['Finalizar pelo WhatsApp', 'Checkout via WhatsApp'], 'cart.remove': ['Remover', 'Remove'],
  'form.title': ['Seus dados', 'Your details'], 'form.sub': ['Enviaremos estas informações junto ao pedido no WhatsApp. Sem cadastro.', 'We will send these details with your order on WhatsApp. No account needed.'],
  'form.name': ['Nome completo', 'Full name'], 'form.phone': ['Telefone', 'Phone'], 'form.email': ['E-mail', 'Email'], 'form.cep': ['CEP', 'Postcode'], 'form.street': ['Endereço', 'Street'], 'form.number': ['Número', 'Number'], 'form.comp': ['Complemento', 'Complement'], 'form.district': ['Bairro', 'District'], 'form.city': ['Cidade', 'City'], 'form.state': ['Estado', 'State'], 'form.notes': ['Observações', 'Notes'], 'form.save': ['Salvar meus dados neste dispositivo', 'Save my details on this device'],
  'form.back': ['Voltar', 'Back'], 'form.send': ['Enviar pedido pelo WhatsApp', 'Send order via WhatsApp'], 'form.required': ['Campo obrigatório', 'Required field'], 'form.invalidEmail': ['E-mail inválido', 'Invalid email'], 'form.invalidPhone': ['Telefone inválido', 'Invalid phone'],
  'wa.hello': ['Olá, São Paulo Aroma! Gostaria de fazer um pedido:', 'Hello, São Paulo Aroma! I would like to place an order:'], 'wa.data': ['Meus dados:', 'My details:'], 'wa.confirm': ['Por favor, confirmem a disponibilidade e a entrega.', 'Please confirm availability and delivery.'], 'wa.product': ['Olá! Tenho interesse no produto:', 'Hello! I am interested in:'],
  'about.t1': ['Sobre a', 'About'], 'about.t2': ['São Paulo Aroma', 'São Paulo Aroma'], 'about.sub': ['A arte de transformar espaços através dos aromas.', 'The art of transforming spaces through scent.'],
  'about.h1': ['Nossa História', 'Our Story'], 'about.b1': ['Nascemos em São Paulo, cidade onde a energia, a diversidade e o ritmo fazem parte do cotidiano. Foi daí que veio a vontade de levar essa sensação de lar para outros lares.', 'We were born in São Paulo, a city where energy, diversity and rhythm are part of daily life. That is where the wish to bring this feeling of home to other homes came from.'],
  'about.h2': ['Nossa Essência', 'Our Essence'], 'about.b2': ['Acreditamos que o lar é o lugar mais importante do mundo. Cada fragrância é escolhida para acolher, acalmar e criar memórias.', 'We believe home is the most important place in the world. Each fragrance is chosen to embrace, calm and create memories.'],
  'about.h3': ['O Poder dos Aromas', 'The Power of Scent'], 'about.b3': ['O olfato é a nossa máquina do tempo particular. Um aroma pode mudar completamente a atmosfera de um espaço — e nos levar de volta a um momento.', 'Smell is our personal time machine. A scent can completely change the atmosphere of a space — and take us back to a moment.'],
  'about.h4': ['Nossa Filosofia', 'Our Philosophy'], 'about.b4': ['Menos ruído, mais presença. Peças bonitas, aromas marcantes e cuidado em cada detalhe — do rótulo à entrega.', 'Less noise, more presence. Beautiful pieces, memorable scents and care in every detail — from label to delivery.'],
  'about.btn': ['Fale conosco', 'Get in touch'], 'about.cta': ['Vamos conversar?', "Let's talk?"], 'about.admin': ['Área administrativa', 'Admin area'],
  'reviews.t1': ['Experiências que', 'Experiences that'], 'reviews.t2': ['ficam na memória.', 'stay in memory.'], 'reviews.avg': ['Média de avaliações', 'Average rating'], 'reviews.total': ['avaliações', 'reviews'], 'reviews.empty': ['Ainda não há avaliações nesta categoria.', 'There are no reviews in this category yet.'], 'reviews.see': ['Ver produto', 'View product'],
  'contact.t1': ['Vamos', "Let's"], 'contact.t2': ['conversar?', 'talk?'], 'contact.sub': ['Dúvidas, presentes, pedidos especiais ou parcerias — estamos aqui.', 'Questions, gifts, special orders or partnerships — we are here.'],
  'contact.subject': ['Assunto', 'Subject'], 'contact.message': ['Mensagem', 'Message'], 'contact.send': ['Enviar mensagem', 'Send message'], 'contact.wa': ['Falar pelo WhatsApp', 'Chat on WhatsApp'], 'contact.sent': ['Mensagem enviada. Responderemos em breve.', 'Message sent. We will reply soon.'], 'contact.hours': ['Horário de atendimento', 'Business hours'], 'contact.address': ['Endereço', 'Address'],
  'footer.statement': ['Fragrâncias para casa que transformam pequenos momentos em experiências.', 'Home fragrances that turn small moments into experiences.'], 'footer.nav': ['Navegação', 'Navigation'], 'footer.service': ['Atendimento', 'Customer care'], 'footer.social': ['Social', 'Social'],
  'footer.news': ['Receba novidades e inspirações.', 'Receive news and inspiration.'], 'footer.newsBtn': ['Cadastrar', 'Subscribe'], 'footer.newsOk': ['Obrigado! Você receberá nossas novidades.', 'Thank you! You will receive our news.'], 'footer.privacy': ['Política de Privacidade', 'Privacy Policy'], 'footer.terms': ['Termos de Uso', 'Terms of Use'], 'footer.rights': ['Todos os direitos reservados.', 'All rights reserved.'],
  '404.title': ['Este aroma se perdeu.', 'This scent drifted away.'], '404.sub': ['A página que você procura não existe ou mudou de lugar.', 'The page you are looking for does not exist or has moved.'], '404.cta': ['Voltar ao início', 'Back home'],
  'seo.home': ['São Paulo Aroma — Fragrâncias para casa', 'São Paulo Aroma — Home fragrance'],
}

export type Store = {
  lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; tr: (l: L) => string
  dict: typeof T; setDict: (d: typeof T) => void
  products: Product[]; setProducts: (p: Product[]) => void
  reviews: Review[]; setReviews: (r: Review[]) => void
  posts: Post[]; setPosts: (p: Post[]) => void
  nav: NavItem[]; setNav: (n: NavItem[]) => void
  settings: typeof SETTINGS; setSettings: (s: typeof SETTINGS) => void
  sections: typeof SECTIONS; setSections: (s: typeof SECTIONS) => void
  fragrances: Fragrance[]; setFragrances: (f: Fragrance[]) => void
  categories: CategoryItem[]; setCategories: (c: CategoryItem[]) => void
  assets: typeof IMG; setAssets: (a: typeof IMG) => void
  leads: OrderLead[]; setLeads: (l: OrderLead[]) => void; addLead: (l: OrderLead) => void
}
const contextRegistry = globalThis as typeof globalThis & { __saoPauloAromaCMS?: Context<Store | null> }
const Ctx = contextRegistry.__saoPauloAromaCMS ??= createContext<Store | null>(null)
export const useCMS = () => {
  const store = useContext(Ctx)
  if (!store) throw new Error('useCMS must be used inside CMSProvider')
  return store
}

type PersistedCMS = {
  dict: typeof T; products: Product[]; reviews: Review[]; posts: Post[]; nav: NavItem[]
  settings: typeof SETTINGS; sections: typeof SECTIONS; fragrances: Fragrance[]
  categories: CategoryItem[]; assets: typeof IMG; leads: OrderLead[]
}
const STORAGE_KEY = 'sao-paulo-aroma-cms-v1'
const loadCMS = (): Partial<PersistedCMS> => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [saved] = useState(loadCMS)
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('ga-lang') as Lang) || saved.settings?.defaultLang || 'pt')
  const [dict, setDict] = useState(() => ({ ...T, ...saved.dict }))
  const [products, setProducts] = useState(() => saved.products || PRODUCTS)
  const [reviews, setReviews] = useState(() => saved.reviews || REVIEWS)
  const [posts, setPosts] = useState(() => saved.posts || POSTS)
  const [nav, setNav] = useState(() => saved.nav || NAV)
  const [settings, setSettings] = useState(() => ({ ...SETTINGS, ...saved.settings }))
  const [sections, setSections] = useState(() => saved.sections || SECTIONS)
  const [fragrances, setFragrances] = useState(() => saved.fragrances || FRAGRANCES)
  const [categories, setCategories] = useState(() => saved.categories || CATEGORIES)
  const [assets, setAssets] = useState(() => ({ ...IMG, ...saved.assets }))
  const [leads, setLeads] = useState<OrderLead[]>(() => saved.leads || [])
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = dict['seo.home'][lang === 'pt' ? 0 : 1]
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict['hero.sub'][lang === 'pt' ? 0 : 1])
  }, [lang, dict])
  useEffect(() => { localStorage.setItem('ga-lang', lang) }, [lang])
  useEffect(() => {
    const data: PersistedCMS = { dict, products, reviews, posts, nav, settings, sections, fragrances, categories, assets, leads }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [dict, products, reviews, posts, nav, settings, sections, fragrances, categories, assets, leads])
  const i = lang === 'pt' ? 0 : 1
  const t = (k: string) => dict[k]?.[i] ?? k
  const tr = (l: L) => l[lang]
  const addLead = (lead: OrderLead) => setLeads((current) => [lead, ...current])
  return <Ctx.Provider value={{ lang, setLang, t, tr, dict, setDict, products, setProducts, reviews, setReviews, posts, setPosts, nav, setNav, settings, setSettings, sections, setSections, fragrances, setFragrances, categories, setCategories, assets, setAssets, leads, setLeads, addLead }}>{children}</Ctx.Provider>
}

export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
