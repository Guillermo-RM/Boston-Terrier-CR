import Image from 'next/image'
import Link from 'next/link'
import { PublicFooter } from '@/components/public-footer/PublicFooter'
import { articles } from '@/lib/articles'
import { isDatabaseConfigured } from '@/lib/db/mongoose'
import { listDogs, type DogView } from '@/lib/repositories/dogs'
import { getWhatsappHref } from '@/lib/whatsapp'
import { SITE_DESCRIPTION, SITE_LOGO, SITE_URL } from '@/lib/site'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

const benefits = [
  ['01', 'Crianza familiar', 'Cachorros acompañados y socializados desde sus primeras etapas.'],
  ['02', 'Bienestar primero', 'Atención responsable, higiene y seguimiento durante su crecimiento.'],
  ['03', 'Información clara', 'Conoce los datos importantes de cada cachorro antes de decidir.'],
  ['04', 'Acompañamiento', 'Orientación cercana para preparar su llegada a casa.'],
]

const steps = [
  ['01', 'Conoce el catálogo', 'Revisa los cachorros disponibles y encuentra el que conecte con tu familia.'],
  ['02', 'Conversemos', 'Escríbenos por WhatsApp para resolver dudas y conocer todos los detalles.'],
  ['03', 'Confirma tu elección', 'Coordinamos contigo la reserva y los preparativos de forma transparente.'],
  ['04', 'Recíbelo en casa', 'Te acompañamos en la entrega y en el inicio de esta nueva etapa.'],
]

const articleCoverImages = [
  '/images/editorial/puppy-bowtie-garden.webp',
  '/images/editorial/puppy-basket-blue.webp',
  '/images/editorial/puppy-pink-standing.webp',
]

const faqItems = [
  ['¿Cuál es el precio de un cachorro Boston Terrier en Costa Rica?', 'El precio aparece en el perfil de cada cachorro disponible y puede variar según sus características. Allí podrás comparar el precio de un Boston Terrier macho o hembra sin información confusa.'],
  ['¿Cómo puedo reservar un cachorro Boston Terrier?', 'Elige un cachorro del catálogo y contáctanos por WhatsApp. Confirmaremos disponibilidad y te explicaremos personalmente el proceso de reserva antes de cualquier decisión.'],
  ['¿Los cachorros se entregan con pedigree, garantía de salud, vacunados y desparasitados?', 'Cada perfil indica si el cachorro cuenta con pedigree. Antes de la reserva te informaremos claramente su condición de salud, controles veterinarios, vacunas, desparasitación y documentación disponible.'],
  ['¿Realizan entrega de Boston Terrier en Costa Rica?', 'Coordinamos cada entrega directamente con la familia. Consulta por WhatsApp la cobertura, condiciones y alternativas disponibles para tu ubicación en Costa Rica.'],
  ['¿Cuándo habrá una nueva camada Boston Terrier en Costa Rica?', 'Cuando no existan cachorros publicados, puedes consultarnos por WhatsApp sobre próximas camadas y solicitar información de disponibilidad.'],
  ['¿Cómo identifico un Boston Terrier de raza pura?', 'Compartimos la información disponible sobre raza, padres y pedigree de cada cachorro. Nuestro objetivo es que recibas datos verificables antes de comprar o reservar.'],
]

export default async function Home() {
  const [puppies, soldPuppies] = isDatabaseConfigured()
    ? await Promise.all([
        listDogs({ available: true, sold: false }),
        listDogs({ sold: true }),
      ])
    : [[], []]

  const whatsappHref = getWhatsappHref()
  const siteUrl = getSiteUrl()
  const jsonLd = buildStructuredData(siteUrl, puppies)

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/hero-puppies.webp"
          alt="Dos cachorros Boston Terrier en un hogar luminoso"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Crianza responsable en Costa Rica</p>
          <h1>Cachorros Boston Terrier en Costa Rica.</h1>
          <p className={styles.heroLead}>
            Consulta Boston Terrier en venta en Costa Rica, conoce su precio y recibe orientación responsable para elegir y reservar tu próximo compañero.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/cachorros">Ver cachorros</Link>
            <Link className={`${styles.secondaryButton} ${styles.whatsappButton}`} href={whatsappHref} target={isExternal(whatsappHref) ? '_blank' : undefined}>
              Hablar por WhatsApp <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.catalogSection}`} id="disponibles">
        <SectionHeading eyebrow="Cachorros Boston Terrier en venta" title="Boston Terrier disponibles en Costa Rica." text="Cada perfil reúne género, edad, pedigree y precio para ayudarte a comprar un Boston Terrier en Costa Rica con calma y confianza." />
        {puppies.length ? (
          <div className={styles.catalogGrid}>{puppies.map((puppy) => <PuppyCard key={puppy.id} puppy={puppy} />)}</div>
        ) : (
          <EmptyState label="Próxima camada" title="Estamos preparando nuevas historias." text="En este momento no hay cachorros publicados. Escríbenos para consultar la próxima camada Boston Terrier en Costa Rica." href={whatsappHref} action="Consultar disponibilidad" />
        )}
      </section>

      <section className={styles.blueNote} aria-labelledby="boston-blue-title">
        <div>
          <p className={styles.blueNoteEyebrow}>Una tonalidad especial</p>
          <h2 id="boston-blue-title">¿Qué es un Boston Blue?</h2>
        </div>
        <div className={styles.blueNoteCopy}>
          <p>Boston Blue es el nombre utilizado para describir un Boston Terrier cuyo pigmento oscuro se aprecia en un tono gris azulado. No es una raza diferente, sino una variación de color menos habitual.</p>
          <Link href="/guia/boston-blue-color-precio-costa-rica">Conocer color, características y disponibilidad <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className={styles.intro} id="nosotros">
        <div className={styles.introHeading}>
          <p className={styles.eyebrow}>Nuestra esencia</p>
          <h2>Kennel de Boston Terrier de raza pura en Costa Rica.</h2>
        </div>
        <div className={styles.introCopy}>
          <p>
            En Boston Terrier CR creemos que cada cachorro merece crecer rodeado de atención y que cada familia merece
            tomar una decisión informada. Nuestro compromiso como criadores responsables comienza antes de la entrega y continúa con orientación en cada paso.
          </p>
          <Link className={styles.textLink} href="/nosotros">Conoce nuestro proceso <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className={styles.editorialGallery} aria-label="Cachorros Boston Terrier criados en un entorno familiar">
        <figure className={styles.editorialTall}>
          <Image src="/images/editorial/puppy-pink-standing.webp" alt="Cachorra Boston Terrier con collar rosa en un entorno familiar" fill sizes="(max-width: 768px) 100vw, 42vw" />
        </figure>
        <div className={styles.editorialStack}>
          <figure><Image src="/images/editorial/puppy-blue-closeup.webp" alt="Cachorro Boston Terrier con collar azul descansando" fill sizes="(max-width: 768px) 100vw, 29vw" /></figure>
          <figure><Image src="/images/editorial/puppy-blue-standing.webp" alt="Cachorro Boston Terrier de pie sobre una alfombra" fill sizes="(max-width: 768px) 100vw, 29vw" /></figure>
        </div>
        <div className={styles.editorialCaption}><span>Maison Boston</span><p>Crecen cerca de las personas, con espacio para explorar, jugar y desarrollar confianza.</p></div>
      </section>

      <section className={styles.benefitSection} aria-labelledby="commitments-title">
        <div className={styles.benefitIntro}>
          <p className={styles.eyebrow}>Lo que nos define</p>
          <h2 id="commitments-title">Cuatro compromisos en cada etapa.</h2>
        </div>
        <ol className={styles.benefitList}>
          {benefits.map(([number, title, description]) => (
            <li className={styles.benefitItem} key={number}>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${styles.section} ${styles.familySection}`} id="familias">
        <SectionHeading eyebrow="Familias Maison Boston" title="Pequeñas huellas, grandes historias." text="Algunos de los Boston Terrier que ya encontraron un hogar y hoy forman parte de una familia." />
        {soldPuppies.length ? (
          <div className={styles.familyGrid}>
            {soldPuppies.slice(0, 6).map((puppy) => (
              <article className={styles.familyCard} key={puppy.id}>
                <div className={styles.familyImage}><Image src={puppy.photos[0].url} alt={`${puppy.name} con su nueva familia`} fill sizes="(max-width: 680px) 85vw, 30vw" /></div>
                <div><span>Ya encontró hogar</span><h3>{puppy.name}</h3></div>
              </article>
            ))}
          </div>
        ) : <div className={styles.quietState}>Pronto compartiremos aquí las historias de nuestros cachorros y sus familias.</div>}
      </section>

      <section className={styles.process} id="proceso">
        <div className={styles.processIntro}>
          <p className={styles.eyebrow}>Cómo funciona</p><h2>Cómo reservar y comprar tu cachorro Boston Terrier.</h2>
          <p>Un proceso cercano y fácil de entender, desde la primera consulta hasta la bienvenida en casa.</p>
          <Link className={`${styles.primaryButton} ${styles.whatsappButton}`} href={whatsappHref} target={isExternal(whatsappHref) ? '_blank' : undefined}>Empezar ahora</Link>
        </div>
        <ol className={styles.steps}>
          {steps.map(([number, title, description]) => <li key={number}><h3>{title}</h3><p>{description}</p></li>)}
        </ol>
      </section>

      <section className={styles.section} id="guia">
        <SectionHeading eyebrow="Guía Boston" title="Conoce y disfruta la raza." text="Artículos sobre carácter, educación, convivencia, juegos, historia y cuidados cotidianos." />
        <div className={styles.postGrid}>
          {articles.slice(0, 3).map((article, index) => (
            <article className={styles.postCard} key={article.slug}>
              <div className={styles.postImage}><Image src={articleCoverImages[index]} alt={`Cachorro Boston Terrier: ${article.title}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" /></div>
              <div className={styles.postContent}><span>{article.readTime}</span><h3>{article.title}</h3><p>{article.excerpt}</p><Link className={styles.textLink} href={`/guia/${article.slug}`}>Leer artículo <span aria-hidden="true">→</span></Link></div>
            </article>
          ))}
        </div>
        <Link className={styles.guideIndexLink} href="/guia">Explorar toda la guía <span aria-hidden="true">→</span></Link>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`} id="preguntas-frecuentes">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Todo sobre la venta de Boston Terrier en Costa Rica." text="Respuestas claras sobre precios, pedigree, salud, reserva y entrega de nuestros cachorros." />
        <div className={styles.faqList}>
          {faqItems.map(([question, answer], index) => (
            <article className={styles.faqItem} key={question}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{question}</h3><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="contacto">
        <div><p className={styles.eyebrow}>Hablemos</p><h2>¿Listo para conocer a tu próximo compañero?</h2></div>
        <div className={styles.contactCopy}><p>Cuéntanos qué buscas y con gusto te orientaremos sobre disponibilidad y próximos pasos.</p><Link className={`${styles.lightButton} ${styles.whatsappButton}`} href={whatsappHref} target={isExternal(whatsappHref) ? '_blank' : undefined}>Escribir por WhatsApp <span aria-hidden="true">↗</span></Link></div>
      </section>

      <PublicFooter />
    </main>
  )
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2></div><p>{text}</p></div>
}

function PuppyCard({ puppy }: { puppy: DogView }) {
  const dogWhatsappHref = getWhatsappHref(`Hola, me interesa el cachorro ${puppy.name}.

Edad: ${formatAge(puppy.daysOld)}
Género: ${puppy.gender}
Color: ${puppy.color}
Precio: ${formatPrice(puppy.price)}

¿Podrían brindarme más información?`)
  return (
    <Link className={styles.puppyCard} href={dogWhatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por WhatsApp sobre ${puppy.name}`}>
      <div className={styles.puppyImage}><Image src={puppy.photos[0].url} alt={`${puppy.name}, Boston Terrier disponible`} fill sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>Disponible</span></div>
      <div className={styles.puppyInfo}><p>{formatAge(puppy.daysOld)} · {puppy.gender} · {puppy.color}</p><div><h3>{puppy.name}</h3><strong>{formatPrice(puppy.price)}</strong></div><span className={styles.whatsappTextLink}>Quiero conocerlo <span aria-hidden="true">→</span></span></div>
    </Link>
  )
}

function EmptyState({ label, title, text, href, action }: { label: string; title: string; text: string; href: string; action: string }) {
  return <div className={styles.emptyState}><span>{label}</span><h3>{title}</h3><p>{text}</p><Link className={`${styles.secondaryButton} ${styles.whatsappButton}`} href={href} target={isExternal(href) ? '_blank' : undefined}>{action} <span aria-hidden="true">→</span></Link></div>
}

function getSiteUrl() {
  return SITE_URL
}

function buildStructuredData(siteUrl: string, puppies: DogView[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Boston Terrier CR',
        alternateName: 'Maison Boston',
        url: siteUrl,
        logo: SITE_LOGO,
        description: SITE_DESCRIPTION,
        sameAs: ['https://www.instagram.com/cachorrospetchochos/', 'https://www.facebook.com/petchochos.chinchilla', 'https://www.tiktok.com/@cachorros_petchochos'],
        areaServed: { '@type': 'Country', name: 'Costa Rica' },
        knowsAbout: ['Boston Terrier', 'Boston Blue', 'cachorros Boston Terrier en venta', 'cuidados de cachorros'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Boston Terrier CR',
        inLanguage: 'es-CR',
        publisher: { '@id': `${siteUrl}/#organization` },
        about: [{ '@type': 'Thing', name: 'Boston Terrier' }, { '@type': 'Thing', name: 'Boston Blue' }],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'Cachorros Boston Terrier disponibles en Costa Rica',
        numberOfItems: puppies.length,
        itemListElement: puppies.map((puppy, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: `${puppy.name}, cachorro Boston Terrier`,
            image: puppy.photos.map((photo) => photo.url),
            description: puppy.description || `Cachorro Boston Terrier ${puppy.gender} disponible en Costa Rica.`,
            category: 'Cachorro Boston Terrier',
            ...(puppy.price > 0 ? {
              offers: {
                '@type': 'Offer',
                priceCurrency: 'CRC',
                price: puppy.price,
                availability: 'https://schema.org/InStock',
                url: `${siteUrl}/#disponibles`,
              },
            } : {}),
          },
        })),
      },
    ],
  }
}

function isExternal(href: string) { return href.startsWith('http') }
function formatAge(days: number) { if (days < 60) return `${days} ${days === 1 ? 'día' : 'días'}`; const months = Math.floor(days / 30); return `${months} ${months === 1 ? 'mes' : 'meses'}` }
function formatPrice(price: number) { return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 }).format(price) }
