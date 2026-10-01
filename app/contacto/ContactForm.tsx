'use client'

import { useState, type FormEvent } from 'react'
import styles from './contacto.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setFeedback('')

    try {
      const response = await fetch('/api/public/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'), email: data.get('email'), phone: data.get('phone'),
          breed: 'Boston Terrier', message: data.get('message'), website: data.get('website'),
        }),
      })
      if (!response.ok) throw new Error('No fue posible enviar la consulta.')
      form.reset()
      setStatus('success')
      setFeedback('Recibimos tu consulta. Te contactaremos lo antes posible.')
    } catch {
      setStatus('error')
      setFeedback('No pudimos enviar el mensaje. Intentá nuevamente o escribinos por WhatsApp.')
    }
  }

  return (
    <div className={styles.formPanel}>
      <div className={styles.formHeading}>
        <span>Formulario de contacto</span>
        <h2>Contanos qué estás buscando.</h2>
        <p>Los campos marcados con * son obligatorios.</p>
      </div>
      <form className={styles.form} onSubmit={submit} aria-busy={status === 'sending'}>
        <div className={styles.fieldRow}>
          <label>Nombre completo *<input name="name" type="text" autoComplete="name" minLength={2} maxLength={120} required /></label>
          <label>Teléfono<input name="phone" type="tel" autoComplete="tel" maxLength={30} inputMode="tel" /></label>
        </div>
        <label>Correo electrónico *<input name="email" type="email" autoComplete="email" maxLength={200} required /></label>
        <label>¿Cómo podemos ayudarte?<textarea name="message" rows={6} maxLength={2000} placeholder="Por ejemplo: busco una hembra, vivo en Heredia y quisiera conocer disponibilidad y precio." /></label>
        <label className={styles.honeypot} aria-hidden="true">Sitio web<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
        <div className={styles.submitRow}>
          <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar consulta'}<span aria-hidden="true">→</span></button>
          <p className={status === 'error' ? styles.errorMessage : styles.statusMessage} aria-live="polite">{feedback}</p>
        </div>
      </form>
    </div>
  )
}
