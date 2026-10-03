import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PublicFooter } from '@/components/public-footer/PublicFooter'
import { getWhatsappHref } from '@/lib/whatsapp'
import { RELATED_SITES, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from '@/lib/site'
import styles from '../route-pages.module.css'

export const metadata: Metadata = {
  title: 'Sobre nosotros | Crianza responsable de Boston Terrier',
  description: 'Desde 2020 criamos Boston Terrier en un entorno familiar en Costa Rica, con socialización, controles de salud y acompañamiento cercano.',
  alternates: { canonical: '/nosotros' },
}

const commitments = [
  ['En casa', 'Entorno familiar', 'Crecen dentro de casa, con cariño, contacto humano, libertad para jugar y socialización diaria.'],
  ['Bienestar', 'Salud y control', 'Reciben seguimiento, vacunas, desparasitación y chip para comenzar bien su nueva etapa.'],
  ['Adaptación', 'Higiene en casa', 'Iniciamos su entrenamiento higiénico para facilitar la integración con su nueva familia.'],
  ['Siempre cerca', 'Acompañamiento', 'Orientamos a cada familia antes y después de la entrega para que todo salga bien.'],
]

const relatedProjects = [
  {
    label: 'Crianza especializada',
    title: 'Basset Hound CR',
    description: 'Nuestro proyecto dedicado a la crianza responsable de Basset Hound en Costa Rica desde 2020.',
    href: 'https://bassethoundcr.com/',
  },
  {
    label: 'Marketplace nacional',
    title: 'Cachorros Raza Pura',
    description: 'Plataforma costarricense de cachorros de raza que conecta familias con criadores responsables.',
    href: 'https://cachorrosrazapura.com/es',
  },
]

const socialLinks = [
  { label: 'Instagram', handle: '@cachorrospetchochos', href: 'https://www.instagram.com/cachorrospetchochos/' },
  { label: 'Facebook', handle: 'Cachorros Petchochos', href: 'https://www.facebook.com/petchochos.chinchilla' },
  { label: 'TikTok', handle: '@cachorros_petchochos', href: 'https://www.tiktok.com/@cachorros_petchochos' },
]

export default function AboutPage() {
  const whatsappHref = getWhatsappHref('Hola, quisiera conocer más sobre su proceso de crianza de Boston Terrier.')
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/nosotros`,
    areaServed: { '@type': 'Country', name: 'Costa Rica' },
    knowsAbout: ['Boston Terrier', 'Boston Blue', 'crianza responsable'],
    sameAs: [
      ...RELATED_SITES,
      ...SOCIAL_LINKS,
    ],
  }

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <header className={styles.pageHero}>
        <p className={styles.eyebrow}>Nuestra familia</p>
        <h1>Sobre Boston Terrier CR.</h1>
        <p>Desde 2020 nos dedicamos con amor y compromiso a la crianza responsable de cachorros Boston Terrier en Costa Rica.</p>
      </header>
      <section className={styles.content}>
        <div className={styles.introGrid}>
          <h2>Una familia que ama profundamente a los perros.</h2>
          <p>Nos esforzamos por entregar cachorros sanos y bien cuidados a hogares que los llenen de amor. Nuestros Boston Terrier no crecen en jaulas: viven dentro de casa, donde pueden jugar, socializar y recibir cariño todos los días. Creemos que este entorno familiar hace una gran diferencia en su comportamiento y bienestar.</p>
        </div>
        <div className={styles.storyGallery} aria-label="Boston Terrier en diferentes etapas de crecimiento">
          <figure className={styles.storyWide}><Image src="/images/editorial/puppy-bowtie-garden.webp" alt="Boston Terrier con lazo rojo disfrutando del jardín" fill sizes="(max-width: 768px) 100vw, 48vw" /></figure>
          <figure><Image src="/images/editorial/puppy-red-bandana.webp" alt="Cachorro Boston Terrier con pañuelo rojo en el césped" fill sizes="(max-width: 768px) 50vw, 24vw" /></figure>
          <figure><Image src="/images/editorial/puppy-basket-blue.webp" alt="Cachorro Boston Terrier descansando en una canasta" fill sizes="(max-width: 768px) 50vw, 24vw" /></figure>
        </div>
        <div className={styles.commitmentGrid}>
          {commitments.map(([label, title, text]) => <article className={styles.card} key={title}><span>{label}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className={styles.trustSection} aria-labelledby="trust-title">
        <div className={styles.trustIntro}>
          <div>
            <p className={styles.eyebrow}>Trayectoria verificable</p>
            <h2 id="trust-title">Conoce nuestro trabajo en el sector.</h2>
          </div>
          <p>La confianza se construye con presencia, experiencia y canales públicos. Puedes conocer otros proyectos de nuestro equipo y seguir nuestra comunidad en sus perfiles oficiales.</p>
        </div>

        <div className={styles.projectGrid}>
          {relatedProjects.map((project) => (
            <a className={styles.projectCard} href={project.href} target="_blank" rel="noopener noreferrer" key={project.href}>
              <span>{project.label}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <strong>Visitar sitio <span aria-hidden="true">↗</span></strong>
            </a>
          ))}
        </div>

        <div className={styles.socialLinks}>
          <p>Redes oficiales</p>
          <nav aria-label="Redes sociales oficiales">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noopener noreferrer" key={social.href}>
                <span>{social.label}</span>
                <strong>{social.handle}</strong>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
      </section>
      <section className={styles.cta}><h2>¿Querés conocer a tu futuro compañero?</h2><div><p>Escribinos para coordinar una visita o videollamada y resolver todas tus dudas sobre nuestros cachorros.</p><Link className={styles.whatsappButton} href={whatsappHref} target={whatsappHref.startsWith('http') ? '_blank' : undefined}>Escribir por WhatsApp ↗</Link></div></section>
      <PublicFooter />
    </main>
  )
}
