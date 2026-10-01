import type { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1 },
    { path: '/cachorros', priority: 0.95 },
    { path: '/nosotros', priority: 0.8 },
    { path: '/guia', priority: 0.85 },
    { path: '/contacto', priority: 0.75 },
  ]

  const staticRoutes: MetadataRoute.Sitemap = routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority,
    images: path === '' ? [`${siteUrl}/images/hero-puppies.webp`] : undefined,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/guia/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.75,
    images: [`${siteUrl}/images/hero-puppies.webp`],
  }))

  return [...staticRoutes, ...articleRoutes]
}
