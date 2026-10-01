import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth/session'
import { LoginForm } from './LoginForm'
import styles from './admin.module.css'

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect('/admin/panel')
  return <main className={styles.loginPage}><LoginForm /></main>
}
