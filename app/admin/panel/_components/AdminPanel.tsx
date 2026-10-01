'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { DogView } from '@/lib/repositories/dogs'
import { DogsTab } from './DogsTab'
import { LeadsTab } from './LeadsTab'
import styles from '../../admin.module.css'

const sections = ['Cachorros', 'Vendidos', 'Leads'] as const

type ContentItem = Record<string, unknown> & { id: string }

export function AdminPanel({ initialDogs, initialLeads }: Readonly<{
  initialDogs: DogView[]
  initialLeads: ContentItem[]
}>) {
  const router = useRouter()
  const [active, setActive] = useState<(typeof sections)[number]>('Cachorros')

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/admin')
    router.refresh()
  }

  const dogs = active === 'Vendidos'
      ? initialDogs.filter((dog) => dog.sold)
      : initialDogs.filter((dog) => !dog.sold)

  return (
    <main className={styles.panelPage}>
      <header className={styles.panelHeader}>
        <div><p className={styles.eyebrow}>Boston Terrier CR</p><h1>Panel administrativo</h1></div>
        <button className={styles.outlineButton} onClick={logout}>Cerrar sesión</button>
      </header>
      <nav className={styles.tabs} aria-label="Secciones administrativas">
        {sections.map((section) => <button className={active === section ? styles.activeTab : ''} key={section} onClick={() => setActive(section)}>{section}</button>)}
      </nav>
      {active === 'Cachorros' || active === 'Vendidos' ? (
        <DogsTab dogs={dogs} mode={active} />
      ) : <LeadsTab initialItems={initialLeads} />}
    </main>
  )
}
