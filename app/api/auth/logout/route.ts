import { cookies } from 'next/headers'
import { ADMIN_COOKIE } from '@/lib/auth/session'
import { ok } from '@/lib/api/response'

export async function POST() {
  ;(await cookies()).set(ADMIN_COOKIE, '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 })
  return ok({ loggedOut: true })
}
