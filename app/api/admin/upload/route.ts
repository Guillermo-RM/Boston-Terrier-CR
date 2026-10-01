import { apiError, ok } from '@/lib/api/response'
import { requireAdminSession } from '@/lib/auth/session'
import { uploadImage } from '@/lib/services/cloudinary'

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const ALLOWED_EXTENSIONS = /\.(jpe?g|png|webp)$/i
const MAX_SIZE = 10 * 1024 * 1024

export async function POST(request: Request) {
  try {
    await requireAdminSession()
    const file = (await request.formData()).get('file')
    if (!(file instanceof File) || !file.size) return Response.json({ ok: false, error: { code: 'NO_FILE', message: 'Selecciona una imagen.' } }, { status: 400 })
    if (!ALLOWED_TYPES.has(file.type) || !ALLOWED_EXTENSIONS.test(file.name)) return Response.json({ ok: false, error: { code: 'INVALID_FILE', message: 'Solo se aceptan JPG, PNG o WebP.' } }, { status: 400 })
    if (file.size > MAX_SIZE) return Response.json({ ok: false, error: { code: 'FILE_TOO_LARGE', message: 'La imagen supera 10 MB.' } }, { status: 400 })
    return ok(await uploadImage(file), 201)
  } catch (error) {
    return apiError(error)
  }
}
