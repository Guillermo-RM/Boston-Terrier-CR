'use client'

import { useCallback, useState } from 'react'
import styles from '../../admin.module.css'

type LeadItem = Record<string, unknown> & { id: string }

export function LeadsTab({ initialItems }: Readonly<{ initialItems: LeadItem[] }>) {
  const [items, setItems] = useState(initialItems)
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    const response = await fetch('/api/admin/leads')
    const result = await response.json()
    if (response.ok) setItems(result.data)
    else setMessage(result.error?.message || 'No fue posible cargar los contactos.')
  }, [])

  async function remove(id: string) {
    if (!confirm('¿Eliminar este contacto?')) return
    const response = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
    if (response.ok) await load()
    else setMessage('No fue posible eliminar el contacto.')
  }

  async function toggleRead(item: LeadItem) {
    const response = await fetch(`/api/admin/leads/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !item.read }),
    })
    if (response.ok) await load()
    else setMessage('No fue posible actualizar el contacto.')
  }

  return (
    <section className={styles.listPanel}>
      <div className={styles.sectionTitle}><div><p className={styles.eyebrow}>Consultas recibidas</p><h2>Leads</h2></div><span>{items.length}</span></div>
      <p className={styles.message} aria-live="polite">{message}</p>
      <div className={styles.contentList}>
        {items.map((item) => (
          <article className={styles.contentCard} key={item.id}>
            <h3>{String(item.name || item.email || 'Contacto')}</h3>
            <p>{String(item.email || '')} · {String(item.phone || 'Sin teléfono')} · {item.read ? 'Leído' : 'Pendiente'}</p>
            {item.message ? <p>{String(item.message)}</p> : null}
            <div className={styles.actions}>
              <button onClick={() => toggleRead(item)}>{item.read ? 'Marcar pendiente' : 'Marcar leído'}</button>
              <button className={styles.danger} onClick={() => remove(item.id)}>Eliminar</button>
            </div>
          </article>
        ))}
        {!items.length ? <p className={styles.empty}>No hay contactos registrados.</p> : null}
      </div>
    </section>
  )
}
