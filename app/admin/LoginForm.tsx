'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import styles from './admin.module.css'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const data = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: data.get('username'), password: data.get('password') }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error?.message || 'No fue posible iniciar sesión.')
      router.replace('/admin/panel')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No fue posible iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.loginCard} onSubmit={submit}>
      <p className={styles.eyebrow}>Acceso privado</p>
      <h1>Administración</h1>
      <label><span>Usuario</span><input name="username" autoComplete="username" required /></label>
      <label>
        <span>Contraseña</span>
        <div className={styles.passwordField}>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
          />
          <button
            className={styles.passwordToggle}
            type="button"
            aria-pressed={showPassword}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
      <p className={styles.message} role="alert">{error}</p>
    </form>
  )
}
