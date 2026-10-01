'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar/Navbar'

export function PublicChrome({ whatsappHref }: Readonly<{ whatsappHref: string }>) {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  return (
    <>
      <Navbar />
      <Link
        className="floating-whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar cachorros por WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16.05 3a12.7 12.7 0 0 0-10.9 19.2L3.5 28.3l6.26-1.63A12.76 12.76 0 1 0 16.05 3Zm0 22.9c-2 0-3.94-.58-5.6-1.67l-.4-.24-3.71.97.99-3.62-.26-.42a10.2 10.2 0 1 1 8.98 4.98Zm5.6-7.63c-.31-.15-1.82-.9-2.1-1-.28-.1-.48-.15-.68.16-.2.3-.79 1-.97 1.2-.18.2-.36.23-.67.08-1.81-.91-3-1.62-4.2-3.68-.32-.55.32-.51.91-1.7.1-.21.05-.39-.03-.54-.08-.15-.69-1.65-.94-2.26-.25-.6-.5-.51-.68-.52h-.58c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.15 3.28 5.2 4.6.73.31 1.3.5 1.74.64.73.23 1.4.2 1.92.12.59-.09 1.82-.74 2.08-1.46.25-.71.25-1.32.18-1.45-.08-.13-.28-.2-.59-.36Z" />
        </svg>
        <span>WhatsApp</span>
      </Link>
    </>
  )
}
