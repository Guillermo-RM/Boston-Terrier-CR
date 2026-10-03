import Image from 'next/image'
import Link from 'next/link'
import { getWhatsappHref } from '@/lib/whatsapp'
import styles from './PublicFooter.module.css'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/cachorros', label: 'Cachorros' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/guia', label: 'Guía Boston Terrier' },
  { href: '/contacto', label: 'Contacto' },
]

const projects = [
  { href: 'https://bassethoundcr.com/', label: 'Basset Hound CR' },
  { href: 'https://cachorrosrazapura.com/es', label: 'Cachorros Raza Pura' },
]

const socials = [
  { href: 'https://www.instagram.com/cachorrospetchochos/', label: 'Instagram' },
  { href: 'https://www.facebook.com/petchochos.chinchilla', label: 'Facebook' },
  { href: 'https://www.tiktok.com/@cachorros_petchochos', label: 'TikTok' },
]

export function PublicFooter() {
  const whatsappHref = getWhatsappHref('Hola, quisiera información sobre los cachorros Boston Terrier disponibles en Costa Rica.')

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandColumn}>
          <Link className={styles.brand} href="/">
            <Image src="/images/boston-terrier-logo.jpeg" alt="" width={68} height={68} />
            <div><strong>Boston Terrier CR</strong><span>Maison Boston · Costa Rica</span></div>
          </Link>
          <p>Desde 2020 criamos en un entorno familiar, con cuidado responsable y acompañamiento para cada nueva familia.</p>
          <span className={styles.location}>Alajuela, Costa Rica</span>
        </div>

        <div className={styles.linkColumn}>
          <h2>Explorar</h2>
          <nav aria-label="Enlaces del pie de página">
            {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          </nav>
        </div>

        <div className={styles.linkColumn}>
          <h2>Experiencia</h2>
          <div className={styles.externalLinks}>
            {projects.map((project) => <a href={project.href} target="_blank" rel="noopener noreferrer" key={project.href}>{project.label}<span aria-hidden="true">↗</span></a>)}
          </div>
        </div>

        <div className={styles.contactColumn}>
          <span>Contacto rápido</span>
          <h2>¿Querés conocer a tu futuro compañero?</h2>
          <p>Consultanos disponibilidad, precio y próximos pasos.<br />+506 7200 6675</p>
          <Link href={whatsappHref} target={whatsappHref.startsWith('http') ? '_blank' : undefined} rel={whatsappHref.startsWith('http') ? 'noopener noreferrer' : undefined}>Escribir por WhatsApp <span aria-hidden="true">↗</span></Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Boston Terrier CR · Diseñado por <a href="https://guimiumtech.com/" target="_blank" rel="noopener noreferrer">Guimium Tech</a></p>
        <nav aria-label="Redes sociales oficiales">
          {socials.map((social) => <a href={social.href} target="_blank" rel="noopener noreferrer" key={social.href}>{social.label}</a>)}
        </nav>
      </div>
    </footer>
  )
}
