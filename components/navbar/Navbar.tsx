'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Navbar.module.css'

const navigation = [
  { href: '/', label: 'Inicio' },
  { href: '/cachorros', label: 'Cachorros' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/guia', label: 'Guía' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Navegación principal">
        <Link className={styles.brand} href="/" onClick={() => setIsOpen(false)}>
          <span className={styles.logoFrame}>
            <Image
              src="/images/boston-terrier-logo.jpeg"
              alt="Logotipo de Boston Terrier CR"
              fill
              sizes="(max-width: 640px) 48px, 58px"
              preload
              className={styles.logo}
            />
          </span>
          <span className={styles.brandName}>Boston Terrier CR</span>
        </Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.links} ${isOpen ? styles.open : ''}`} id="main-navigation">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
