import type { Metadata } from 'next'
import { DogCatalog } from '@/components/catalog/DogCatalog'
import { PublicFooter } from '@/components/public-footer/PublicFooter'
import { isDatabaseConfigured } from '@/lib/db/mongoose'
import { listDogs } from '@/lib/repositories/dogs'
import { getWhatsappHref } from '@/lib/whatsapp'
import styles from '../route-pages.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cachorros Boston Terrier disponibles en Costa Rica',
  description: 'Catálogo de cachorros Boston Terrier en venta en Costa Rica. Consulta edad, género, documentación, precio y disponibilidad.',
  keywords: ['cachorros boston terrier disponibles', 'cachorros boston terrier en venta', 'boston terrier precio costa rica'],
  alternates: { canonical: '/cachorros' },
  openGraph: {
    title: 'Cachorros Boston Terrier disponibles en Costa Rica',
    description: 'Conoce nuestro catálogo actualizado de cachorros Boston Terrier en venta.',
    url: '/cachorros',
  },
}

export default async function PuppiesPage() {
  const puppies = isDatabaseConfigured()
    ? await listDogs({ available: true, sold: false })
    : []
  const whatsappHref = getWhatsappHref('Hola, quisiera información sobre los cachorros Boston Terrier disponibles.')

  return (
    <main className={styles.main}>
      <header className={styles.pageHero}>
        <p className={styles.eyebrow}>Catálogo actualizado</p>
        <h1>Cachorros Boston Terrier disponibles.</h1>
        <p>Consulta fotografías, edad, género, características y precio de cada cachorro publicado.</p>
      </header>

      <section className={`${styles.content} ${styles.catalogContent}`} aria-label="Catálogo de cachorros en venta">
        <DogCatalog dogs={puppies} defaultWhatsappHref={whatsappHref} />
      </section>

      <PublicFooter />
    </main>
  )
}
