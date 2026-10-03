import type { Metadata } from 'next'
import { DogCatalog } from '@/components/catalog/DogCatalog'
import { PublicFooter } from '@/components/public-footer/PublicFooter'
import { isDatabaseConfigured } from '@/lib/db/mongoose'
import { listDogs, type DogView } from '@/lib/repositories/dogs'
import { getWhatsappHref } from '@/lib/whatsapp'
import { SITE_URL } from '@/lib/site'
import styles from '../route-pages.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cachorros Boston Terrier disponibles en Costa Rica',
  description: 'Catálogo de cachorros Boston Terrier en venta en Costa Rica. Consulta edad, género, color, documentación, precio y disponibilidad de Boston Terrier y Boston Blue cuando haya ejemplares publicados.',
  keywords: ['cachorros boston terrier disponibles', 'cachorros boston terrier en venta', 'boston terrier precio costa rica', 'boston blue costa rica', 'boston blue en venta costa rica', 'comprar boston blue costa rica', 'cachorro boston blue precio', 'boston terrier macho precio', 'boston terrier hembra precio'],
  alternates: { canonical: '/cachorros' },
  openGraph: {
    title: 'Cachorros Boston Terrier disponibles en Costa Rica',
    description: 'Conoce nuestro catálogo actualizado de cachorros Boston Terrier en venta.',
    url: '/cachorros',
    images: [{ url: '/images/hero-puppies.webp', alt: 'Cachorros Boston Terrier disponibles en Costa Rica' }],
  },
}

export default async function PuppiesPage() {
  const puppies = isDatabaseConfigured()
    ? await listDogs({ available: true, sold: false })
    : []
  const whatsappHref = getWhatsappHref('Hola, quisiera información sobre los cachorros Boston Terrier disponibles.')
  const jsonLd = buildCatalogStructuredData(puppies)

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className={styles.pageHero}>
        <p className={styles.eyebrow}>Catálogo actualizado</p>
        <h1>Cachorros Boston Terrier disponibles.</h1>
        <p>Consulta fotografías, edad, género, color y precio de cada cachorro publicado. Boston Terrier CR también informa sobre ejemplares Boston Blue cuando hay disponibilidad.</p>
      </header>

      <section className={`${styles.content} ${styles.catalogContent}`} aria-label="Catálogo de cachorros en venta">
        <DogCatalog dogs={puppies} defaultWhatsappHref={whatsappHref} />
      </section>

      <PublicFooter />
    </main>
  )
}

function buildCatalogStructuredData(puppies: DogView[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/cachorros#collection`,
    name: 'Cachorros Boston Terrier disponibles en Costa Rica',
    description: 'Catálogo vigente de cachorros Boston Terrier y Boston Blue disponibles en Costa Rica.',
    url: `${SITE_URL}/cachorros`,
    inLanguage: 'es-CR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@type': 'Thing', name: 'Boston Terrier' },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Cachorros Boston Terrier disponibles',
      numberOfItems: puppies.length,
      itemListElement: puppies.map((puppy, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: `${puppy.name}, cachorro Boston Terrier`,
          image: puppy.photos.map((photo) => photo.url),
          description: `Cachorro Boston Terrier ${puppy.gender}, color ${puppy.color}, disponible en Costa Rica.`,
          category: 'Cachorro Boston Terrier',
          offers: puppy.price > 0 ? {
            '@type': 'Offer',
            price: puppy.price,
            priceCurrency: 'CRC',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/cachorros`,
          } : undefined,
        },
      })),
    },
  }
}
