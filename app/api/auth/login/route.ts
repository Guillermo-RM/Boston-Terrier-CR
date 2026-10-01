import { cookies, headers } from 'next/headers'
import { z } from 'zod'
import { ADMIN_COOKIE, createAdminToken, SESSION_SECONDS } from '@/lib/auth/session'
import { verifyAdminCredentials } from '@/lib/auth/password'
import { connectMongo } from '@/lib/db/mongoose'
import { apiError, ok } from '@/lib/api/response'

const schema = z.object({ username: z.string().trim().min(1).max(100), password: z.string().min(1).max(200) })

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json())
    const headerStore = await headers()
    const ip = (headerStore.get('x-forwarded-for')?.split(',')[0] || headerStore.get('x-real-ip') || 'unknown').trim()
    const db = (await connectMongo()).connection.db
    if (!db) throw new Error('MongoDB no está disponible.')
    const attempts = db.collection('login_attempts')
    const cutoff = new Date(Date.now() - 15 * 60 * 1000)
    const recentFailures = await attempts.countDocuments({ ip, success: false, createdAt: { $gte: cutoff } })
    if (recentFailures >= 5) {
      return Response.json({ ok: false, error: { code: 'RATE_LIMITED', message: 'Demasiados intentos. Intenta nuevamente en 15 minutos.' } }, { status: 429 })
    }

    const valid = await verifyAdminCredentials(input.username, input.password)
    await attempts.insertOne({ ip, success: valid, createdAt: new Date() })
    await attempts.createIndex({ createdAt: 1 }, { expireAfterSeconds: 900 })
    if (!valid) {
      return Response.json({ ok: false, error: { code: 'INVALID_CREDENTIALS', message: 'Usuario o contraseña incorrectos.' } }, { status: 401 })
    }

    const token = await createAdminToken(input.username)
    ;(await cookies()).set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_SECONDS,
    })
    return ok({ username: input.username })
  } catch (error) {
    return apiError(error)
  }
}
