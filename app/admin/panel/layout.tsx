import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { getAdminSession } from '@/lib/auth/session'

export default async function AdminPanelLayout({ children }: Readonly<{ children: ReactNode }>) {
  if (!(await getAdminSession())) redirect('/admin')
  return children
}
