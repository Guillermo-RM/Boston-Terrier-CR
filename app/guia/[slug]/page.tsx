import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PublicFooter } from '@/components/public-footer/PublicFooter'
import { articles, getArticle, getRelatedArticles } from '@/lib/articles'
import styles from './article.module.css'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return {
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/guia/${article.slug}` },
    openGraph: {
      type: 'article',
      url: `/guia/${article.slug}`,
      title: article.title,
      description: article.description,
      locale: 'es_CR',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: '/images/hero-puppies.webp', alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: ['/images/hero-puppies.webp'],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = getRelatedArticles(article)
  const siteUrl = getSiteUrl()
  const articleUrl = `${siteUrl}/guia/${article.slug}`
  const isBostonBlueGuide = article.slug === 'boston-blue-color-precio-costa-rica'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'es-CR',
        image: `${siteUrl}/images/hero-puppies.webp`,
        mainEntityOfPage: articleUrl,
        author: { '@type': 'Organization', name: 'Boston Terrier CR', url: siteUrl },
        publisher: { '@type': 'Organization', name: 'Boston Terrier CR', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/images/boston-terrier-logo.jpeg` } },
      },
      {
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Guía', item: `${siteUrl}/guia` },
          { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
        ],
      },
    ],
  }

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <article>
        <header className={styles.hero}>
          <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/">Inicio</Link><span>/</span><Link href="/guia">Guía</Link></nav>
          <p className={styles.eyebrow}>{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className={styles.lead}>{article.excerpt}</p>
          <div className={styles.meta}><span>{article.readTime}</span><span>Actualizado el <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></span></div>
        </header>

        <div className={styles.articleLayout}>
          <aside className={styles.toc} aria-label="Contenido del artículo">
            <strong>En este artículo</strong>
            <ol>{article.sections.map((section, index) => <li key={section.heading}><a href={`#seccion-${index + 1}`}>{section.heading}</a></li>)}</ol>
          </aside>

          <div className={styles.articleBody}>
            <section className={styles.quickAnswer} aria-labelledby="respuesta-rapida"><span>Respuesta rápida</span><h2 id="respuesta-rapida">Lo esencial</h2><p>{article.quickAnswer}</p></section>

            {article.sections.map((section, index) => (
              <section className={styles.contentSection} id={`seccion-${index + 1}`} key={section.heading}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              </section>
            ))}

            <section className={styles.faq} aria-labelledby="faq-title">
              <p className={styles.eyebrow}>Preguntas frecuentes</p><h2 id="faq-title">Dudas sobre este tema.</h2>
              {article.faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
            </section>

            <section className={styles.sources} aria-labelledby="sources-title">
              <h2 id="sources-title">Fuentes consultadas</h2>
              <ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul>
            </section>
          </div>
        </div>
      </article>

      <section className={styles.related} aria-labelledby="related-title">
        <div><p className={styles.eyebrow}>Sigue investigando</p><h2 id="related-title">Artículos relacionados.</h2></div>
        <div className={styles.relatedGrid}>{related.map((item) => <article key={item.slug}><span>{item.eyebrow}</span><h3><Link href={`/guia/${item.slug}`}>{item.title}</Link></h3><Link href={`/guia/${item.slug}`}>Leer más →</Link></article>)}</div>
      </section>

      <section className={styles.cta}><div><p className={styles.eyebrow}>Próximo paso</p><h2>{isBostonBlueGuide ? '¿Buscas un Boston Blue?' : '¿La raza encaja contigo?'}</h2></div><div><p>{isBostonBlueGuide ? 'Consulta el catálogo general y pregúntanos por color, disponibilidad y precio.' : 'Conoce los cachorros disponibles y nuestro proceso de acompañamiento.'}</p><Link href="/cachorros">Ver cachorros</Link></div></section>
      <PublicFooter />
    </main>
  )
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-CR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}
