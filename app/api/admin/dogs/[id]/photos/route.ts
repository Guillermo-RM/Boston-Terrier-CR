import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { apiError, ok } from '@/lib/api/response'
import { requireAdminSession } from '@/lib/auth/session'
import { getDog, updateDog } from '@/lib/repositories/dogs'
import { deleteImages } from '@/lib/services/cloudinary'
import { dogInputSchema } from '@/lib/validation/dog'

const deletePhotoSchema = z.object({ publicId: z.string().min(1).max(300) })

type PhotoRouteContext = { params: Promise<{ id: string }> }

export async function DELETE(request: Request, context: PhotoRouteContext) {
  try {
    const username = await requireAdminSession()
    const { id } = await context.params
    const { publicId } = deletePhotoSchema.parse(await request.json())
    const dog = await getDog(id)

    if (!dog) {
      return Response.json({ ok: false, error: { code: 'NOT_FOUND', message: 'Perro no encontrado.' } }, { status: 404 })
    }

    if (!dog.photos.some((photo) => photo.publicId === publicId)) {
      return Response.json({ ok: false, error: { code: 'PHOTO_NOT_FOUND', message: 'La fotografía no pertenece a este cachorro.' } }, { status: 404 })
    }

    if (dog.photos.length === 1) {
      return Response.json({ ok: false, error: { code: 'LAST_PHOTO', message: 'Cada cachorro debe conservar al menos una fotografía.' } }, { status: 409 })
    }

    const original = dogInputSchema.parse(dog)
    const nextInput = { ...original, photos: original.photos.filter((photo) => photo.publicId !== publicId) }
    const updated = await updateDog(id, nextInput, username)
    if (!updated) throw new Error('El cachorro cambió durante la eliminación de la fotografía.')

    try {
      await deleteImages([publicId])
    } catch (error) {
      await updateDog(id, original, username)
      throw error
    }

    revalidatePath('/')
    return ok(updated)
  } catch (error) {
    return apiError(error)
  }
}
