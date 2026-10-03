import Image from 'next/image'
import Link from 'next/link'
import type { DogView } from '@/lib/repositories/dogs'
import styles from './DogCatalog.module.css'

type DogCatalogProps = {
  dogs: DogView[]
  defaultWhatsappHref: string
  emptyLabel?: string
  emptyTitle?: string
  emptyDescription?: string
}

export function DogCatalog({
  dogs,
  defaultWhatsappHref,
  emptyLabel = 'Próxima camada',
  emptyTitle = 'Estamos preparando nuevas historias.',
  emptyDescription = 'Escríbenos para conocer la próxima disponibilidad de Boston Terrier en Costa Rica.',
}: DogCatalogProps) {
  if (!dogs.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.eyebrow}>{emptyLabel}</p>
        <h2>{emptyTitle}</h2>
        <p>{emptyDescription}</p>
        <Link className={styles.whatsappButton} href={defaultWhatsappHref} target={isExternal(defaultWhatsappHref) ? '_blank' : undefined}>
          Consultar disponibilidad <span aria-hidden="true">↗</span>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {dogs.map((dog) => {
        return (
          <article className={styles.card} key={dog.id}>
            <div className={styles.image}>
              <Image
                src={dog.photos[0].url}
                alt={`${dog.name}, Boston Terrier disponible`}
                fill
                sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span>Disponible</span>
            </div>

            <div className={styles.body}>
              <p className={styles.meta}>{formatAge(dog.daysOld)} · {dog.gender} · {dog.color}</p>
              <div className={styles.titleRow}>
                <h2>{dog.name}</h2>
                <strong>{formatPrice(dog.price)}</strong>
              </div>
              <div className={styles.features}>
                {dog.hasPedigree ? <span>Pedigree</span> : null}
                {dog.hasAwards ? <span>Premiado</span> : null}
              </div>
              <Link className={styles.whatsappButton} href={defaultWhatsappHref} target={isExternal(defaultWhatsappHref) ? '_blank' : undefined}>
                Consultar cachorro <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function isExternal(href: string) {
  return href.startsWith('http')
}

function formatAge(days: number) {
  if (days < 60) return `${days} ${days === 1 ? 'día' : 'días'}`
  const months = Math.floor(days / 30)
  if (months < 24) return `${months} ${months === 1 ? 'mes' : 'meses'}`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? 'año' : 'años'}`
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(price)
}
