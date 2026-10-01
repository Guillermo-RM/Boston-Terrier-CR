import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'admin_token'
export const SESSION_SECONDS = 60 * 60 * 8

function secret() {
  const value = process.env.JWT_SECRET
  if (!value || value.length < 32) throw new Error('JWT_SECRET debe tener al menos 32 caracteres.')
  return new TextEncoder().encode(value)
}

export async function createAdminToken(username: string) {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(secret())
}

export async function verifyAdminToken(token?: string) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload.role === 'admin' && payload.sub ? payload.sub : null
  } catch {
    return null
  }
}

export async function getAdminSession() {
  return verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value)
}

export async function requireAdminSession() {
  const username = await getAdminSession()
  if (!username) throw new Error('UNAUTHORIZED')
  return username
}
