import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { PublicChrome } from '@/components/public-chrome/PublicChrome'
import { getWhatsappHref } from '@/lib/whatsapp'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cachorros Boston Terrier en Costa Rica | Boston Terrier CR',
    template: '%s | Boston Terrier CR',
  },
  description: 'Cachorros Boston Terrier en venta en Costa Rica. Conoce disponibilidad, precio, documentación y nuestro proceso de reserva y entrega responsable.',
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
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: '/',
    siteName: 'Boston Terrier CR',
    title: 'Cachorros Boston Terrier en Costa Rica',
    description: 'Conoce cachorros Boston Terrier disponibles, precios y el proceso de reserva y entrega en Costa Rica.',
    images: [{ url: '/images/boston-terrier-logo.jpeg', width: 1600, height: 1600, alt: 'Boston Terrier CR - cachorros en Costa Rica' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cachorros Boston Terrier en Costa Rica',
    description: 'Disponibilidad, precios y proceso responsable para reservar tu cachorro Boston Terrier.',
    images: ['/images/boston-terrier-logo.jpeg'],
  },
  robots: { index: true, follow: true },
  category: 'Mascotas',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const whatsappHref = getWhatsappHref('Hola, quisiera información sobre los cachorros Boston Terrier disponibles en Costa Rica.')

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <PublicChrome whatsappHref={whatsappHref} />
        {children}
      </body>
    </html>
  )
}
