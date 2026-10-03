import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { PublicChrome } from '@/components/public-chrome/PublicChrome'
import { getWhatsappHref } from '@/lib/whatsapp'
import { GUIDE_URL, RELATED_SITES, SITE_DESCRIPTION, SITE_LOGO, SITE_NAME, SITE_URL, SOCIAL_LINKS } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Cachorros Boston Terrier en Costa Rica | Boston Terrier CR',
    template: '%s | Boston Terrier CR',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'boston terrier costa rica',
    'cachorros boston terrier costa rica',
    'boston terrier en venta costa rica',
    'comprar boston terrier costa rica',
    'venta de boston terrier costa rica',
    'criadero boston terrier costa rica',
    'boston terrier precio costa rica',
    'cachorros boston terrier en venta',
    'boston terrier disponibles costa rica',
    'boston terrier con pedigree costa rica',
    'boston terrier raza pura costa rica',
    'cachorro boston terrier precio',
    'boston terrier macho precio',
    'boston terrier hembra precio',
    'reservar cachorro boston terrier',
    'criador responsable boston terrier',
    'boston terrier con garantía de salud',
    'boston terrier vacunado y desparasitado',
    'boston terrier entrega en Costa Rica',
    'camada boston terrier costa rica',
    'boston blue costa rica',
    'boston blue en venta costa rica',
    'comprar boston blue costa rica',
    'cachorro boston blue precio',
    'boston terrier blue precio costa rica',
    'guía boston terrier costa rica',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: '/',
    siteName: 'Boston Terrier CR',
    title: 'Cachorros Boston Terrier en Costa Rica',
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_LOGO, width: 1600, height: 1600, alt: 'Boston Terrier CR - cachorros Boston Terrier y Boston Blue en Costa Rica' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cachorros Boston Terrier en Costa Rica',
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO],
  },
  robots: { index: true, follow: true },
  category: 'Mascotas',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const whatsappHref = getWhatsappHref('Hola, quisiera información sobre los cachorros Boston Terrier disponibles en Costa Rica.')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: ['Boston Terrier CR', 'Maison Boston'],
        url: SITE_URL,
        logo: SITE_LOGO,
        description: SITE_DESCRIPTION,
        sameAs: [...SOCIAL_LINKS, ...RELATED_SITES],
        areaServed: { '@type': 'Country', name: 'Costa Rica' },
        knowsAbout: ['Boston Terrier', 'Boston Blue', 'cuidado de cachorros', 'crianza responsable'],
        contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+50672006675', availableLanguage: 'Spanish' },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'es-CR',
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#organization` },
        subjectOf: { '@id': `${GUIDE_URL}#collection` },
      },
    ],
  }

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <script id="site-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <PublicChrome whatsappHref={whatsappHref} />
        {children}
      </body>
    </html>
  )
}
