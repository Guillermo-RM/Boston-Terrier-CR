import type { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1 },
    { path: '/cachorros', priority: 0.95 },
    { path: '/nosotros', priority: 0.8 },
    { path: '/guia', priority: 0.85 },
    { path: '/contacto', priority: 0.75 },
  ]

  const staticRoutes: MetadataRoute.Sitemap = routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date('2026-10-03T00:00:00Z'),
    changeFrequency: 'weekly',
    priority,
    images: path === '' ? [`${SITE_URL}/images/hero-puppies.webp`] : undefined,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/guia/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.75,
    images: [`${SITE_URL}/images/hero-puppies.webp`],
  }))

  return [...staticRoutes, ...articleRoutes]
}
