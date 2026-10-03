import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PublicFooter } from '@/components/public-footer/PublicFooter'
import { getWhatsappHref } from '@/lib/whatsapp'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import { ContactForm } from './ContactForm'
import styles from './contacto.module.css'

export const metadata: Metadata = {
  title: 'Contacto | Cachorros Boston Terrier en Costa Rica',
  description: 'Contacta a Boston Terrier CR para consultar cachorros disponibles, precios, reservas y entrega responsable en Costa Rica.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto | Boston Terrier CR',
    description: 'Conversemos sobre disponibilidad, precios y el proceso para reservar un cachorro Boston Terrier en Costa Rica.',
    url: '/contacto',
    images: [{ url: '/images/editorial/puppy-pink-portrait.webp', alt: 'Contacto Boston Terrier CR en Costa Rica' }],
  },
}

const contactSteps = [
  ['01', 'Cuéntanos sobre vos', 'Indícanos dónde vivís, cómo es tu hogar y qué esperás de tu futuro compañero.'],
  ['02', 'Resolvemos tus dudas', 'Te compartimos disponibilidad, precio, cuidados y detalles del proceso de reserva.'],
  ['03', 'Seguimos en contacto', 'Si encontrás al cachorro indicado, coordinamos los próximos pasos de forma clara y cercana.'],
]

export default function ContactPage() {
  const whatsappHref = getWhatsappHref('Hola, quisiera información sobre los cachorros Boston Terrier disponibles en Costa Rica.')

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'ContactPage', '@id': `${SITE_URL}/contacto#page`, name: 'Contacto Boston Terrier CR', url: `${SITE_URL}/contacto`, inLanguage: 'es-CR', isPartOf: { '@id': `${SITE_URL}/#website` }, mainEntity: { '@id': `${SITE_URL}/#organization` } },
          { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL, areaServed: { '@type': 'Country', name: 'Costa Rica' }, contactPoint: { '@type': 'ContactPoint', telephone: '+50672006675', contactType: 'sales', availableLanguage: 'Spanish' } },
        ],
      }).replace(/</g, '\\u003c') }} />
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Contacto</p>
          <h1>Conversemos sobre tu próximo Boston Terrier.</h1>
        </div>
        <p>Estamos para orientarte con transparencia sobre cachorros disponibles, precios, reservas y entrega en Costa Rica.</p>
      </header>

      <div className={styles.contactVisual}>
        <div className={styles.contactVisualFrame}>
          <Image src="/images/editorial/puppy-pink-portrait.webp" alt="Cachorra Boston Terrier con collar rosa" fill sizes="(max-width: 768px) 100vw, 54vw" />
        </div>
        <div className={styles.contactVisualCopy}><span>Atención cercana</span><p>Una conversación puede ser el inicio de una gran historia.</p></div>
      </div>

      <section className={styles.contactSection} aria-labelledby="contact-title">
        <div className={styles.contactIntro}>
          <p className={styles.eyebrow}>Atención personalizada</p>
          <h2 id="contact-title">Elegí cómo querés contactarnos.</h2>
          <p>Podés escribirnos directamente por WhatsApp o completar el formulario. Respondemos cada consulta de manera personal.</p>

          <Link className={styles.whatsappButton} href={whatsappHref} target={whatsappHref.startsWith('http') ? '_blank' : undefined} rel={whatsappHref.startsWith('http') ? 'noopener noreferrer' : undefined}>
            <span aria-hidden="true">●</span>
            Escribir por WhatsApp
            <span aria-hidden="true">↗</span>
          </Link>

          <dl className={styles.details}>
            <div><dt>Ubicación</dt><dd>Alajuela, Costa Rica</dd></div>
            <div><dt>WhatsApp</dt><dd>+506 7200 6675</dd></div>
            <div><dt>Consultas</dt><dd>Disponibilidad, precio y reserva</dd></div>
            <div><dt>Atención</dt><dd>Visitas y videollamadas con cita previa</dd></div>
          </dl>
        </div>

        <ContactForm />
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={styles.processHeading}>
          <p className={styles.eyebrow}>Qué sucede después</p>
          <h2 id="process-title">Un proceso sencillo y transparente.</h2>
        </div>
        <div className={styles.steps}>
          {contactSteps.map(([number, title, description]) => (
            <article key={title}>
              <span aria-hidden="true">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <PublicFooter />
    </main>
  )
}
