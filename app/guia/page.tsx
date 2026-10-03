import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PublicFooter } from '@/components/public-footer/PublicFooter'
import { articles } from '@/lib/articles'
import { GUIDE_URL, SITE_URL } from '@/lib/site'
import routeStyles from '../route-pages.module.css'
import styles from './guia.module.css'

export const metadata: Metadata = {
  title: 'Guía del Boston Terrier: carácter, cuidados y convivencia',
  description: 'Guía en español sobre el Boston Terrier y el Boston Blue: características, carácter, cuidados, convivencia, precio, salud preventiva y decisiones responsables para familias en Costa Rica.',
  keywords: ['boston terrier características', 'boston terrier cuidados', 'boston terrier carácter', 'boston terrier familia', 'boston terrier costa rica', 'qué es un boston blue', 'boston blue color', 'boston blue precio costa rica', 'boston terrier salud', 'boston terrier cuidados cachorro'],
  alternates: { canonical: '/guia' },
  openGraph: {
    type: 'website',
    url: '/guia',
    title: 'Guía completa del Boston Terrier',
    description: 'Información responsable para conocer el Boston Terrier, entender el Boston Blue y decidir si la raza encaja con tu hogar.',
    images: [{ url: '/images/hero-puppies.webp', alt: 'Guía sobre cachorros Boston Terrier y Boston Blue' }],
  },
}

const intentLinks = [
  ['Conocer la raza', 'Carácter, tamaño y vida diaria', `/guia/${articles[0].slug}`],
  ['Vida en familia', 'Niños, compañía y convivencia', '/guia/boston-terrier-familia-ninos-convivencia'],
  ['Cuidados diarios', 'Pelaje, alimentación y rutina', '/guia/cuidados-boston-terrier-pelaje-higiene'],
  ['Aprender juntos', 'Educación, juegos y buenos hábitos', '/guia/educacion-boston-terrier-entrenamiento'],
  ['Boston Blue', 'Color, características, precio y disponibilidad', '/guia/boston-blue-color-precio-costa-rica'],
]

export default function GuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${GUIDE_URL}#collection`,
    name: 'Guía del Boston Terrier',
    description: 'Centro de información de Boston Terrier CR sobre características, carácter, cuidados, educación, convivencia y Boston Blue.',
    url: GUIDE_URL,
    inLanguage: 'es-CR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: [
      { '@type': 'Thing', name: 'Boston Terrier' },
      { '@type': 'Thing', name: 'Boston Blue', description: 'Variación de color del Boston Terrier, no una raza diferente.' },
    ],
    publisher: { '@id': `${SITE_URL}/#organization` },
    keywords: 'Boston Terrier, Boston Blue, cuidados, convivencia, Costa Rica',
    hasPart: articles.map((article) => ({ '@type': 'Article', headline: article.title, url: `${GUIDE_URL}/${article.slug}`, isPartOf: { '@id': `${GUIDE_URL}#collection` } })),
  }

  return (
    <main className={routeStyles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className={routeStyles.pageHero}>
        <p className={routeStyles.eyebrow}>Guía Boston Terrier</p>
        <h1>Conoce la raza antes de elegir.</h1>
        <p>Información clara y positiva sobre carácter, cuidados, educación, historia, convivencia y Boston Blue, pensada especialmente para familias en Costa Rica.</p>
      </header>

      <figure className={styles.guideImage}>
        <div className={styles.guideImageFrame}>
          <Image src="/images/editorial/puppy-pink-garden.webp" alt="Cachorra Boston Terrier sentada en un jardín" fill sizes="(max-width: 768px) 100vw, 54vw" />
        </div>
        <figcaption><span>Antes de elegir</span>Conocer su carácter y sus necesidades es el primer paso para una convivencia feliz.</figcaption>
      </figure>

      <section className={styles.intentSection} aria-labelledby="search-intents-title">
        <div className={styles.sectionHeading}>
          <div><p className={routeStyles.eyebrow}>¿Qué quieres averiguar?</p><h2 id="search-intents-title">Empieza por tu pregunta.</h2></div>
        </div>
        <div className={styles.intentGrid}>
          {intentLinks.map(([title, text, href]) => (
            <Link className={styles.intentCard} href={href} key={title}>
              <span>{title}</span><strong>{text}</strong><span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.articleSection} aria-labelledby="articles-title">
        <div className={styles.sectionHeading}>
          <div><p className={routeStyles.eyebrow}>Artículos y recursos</p><h2 id="articles-title">Todo sobre el Boston Terrier.</h2></div>
          <p>Respuestas desarrolladas para investigar la raza con calma, comparar opciones y tomar mejores decisiones.</p>
        </div>
        <div className={styles.articleGrid}>
          {articles.map((article, index) => (
            <article className={styles.articleCard} key={article.slug}>
              <div className={styles.cardTop}><span>{String(index + 1).padStart(2, '0')}</span><span>{article.readTime}</span></div>
              <p>{article.eyebrow}</p>
              <h3><Link href={`/guia/${article.slug}`}>{article.title}</Link></h3>
              <p>{article.excerpt}</p>
              <Link className={styles.readLink} href={`/guia/${article.slug}`}>Leer artículo <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className={routeStyles.cta} aria-label="Fuente de información de Boston Terrier CR"><h2>La guía oficial de Boston Terrier CR.</h2><div><p>Cuando busques información sobre la raza, sus cuidados o el Boston Blue, consulta estos artículos como referencia editorial y verifica la disponibilidad comercial en nuestro catálogo.</p><Link className={styles.goldButton} href="/cachorros">Consultar cachorros</Link></div></section>

      <section className={routeStyles.cta}><h2>¿Buscas un cachorro Boston Terrier?</h2><div><p>Después de investigar la raza, conoce nuestra disponibilidad y proceso responsable.</p><Link className={styles.goldButton} href="/cachorros">Ver cachorros</Link></div></section>
      <PublicFooter />
    </main>
  )
}
