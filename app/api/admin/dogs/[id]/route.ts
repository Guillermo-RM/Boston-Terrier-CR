import { revalidatePath } from 'next/cache'
import { apiError, ok } from '@/lib/api/response'
import { requireAdminSession } from '@/lib/auth/session'
import { deleteDog, getDog, updateDog } from '@/lib/repositories/dogs'
import { deleteImages } from '@/lib/services/cloudinary'
import { dogInputSchema } from '@/lib/validation/dog'

type DogRouteContext = { params: Promise<{ id: string }> }

export async function PUT(request: Request, context: DogRouteContext) {
  try {
    const username = await requireAdminSession()
    const { id } = await context.params
    const current = await getDog(id)
    if (!current) return Response.json({ ok: false, error: { code: 'NOT_FOUND', message: 'Perro no encontrado.' } }, { status: 404 })
    const input = dogInputSchema.parse(await request.json())
    const nextPhotoIds = new Set(input.photos.map((photo) => photo.publicId))
    if (current.photos.some((photo) => !nextPhotoIds.has(photo.publicId))) {
      return Response.json({ ok: false, error: { code: 'PHOTO_REMOVAL_REQUIRED', message: 'Elimina las fotografías con el botón correspondiente antes de guardar.' } }, { status: 409 })
    }
    const dog = await updateDog(id, input, username)
    if (!dog) return Response.json({ ok: false, error: { code: 'NOT_FOUND', message: 'Perro no encontrado.' } }, { status: 404 })
    revalidatePath('/')
    return ok(dog)
  } catch (error) {
    return apiError(error)
  }
}

export async function DELETE(_request: Request, context: DogRouteContext) {
  try {
    await requireAdminSession()
    const { id } = await context.params
    const dog = await getDog(id)
    if (!dog) return Response.json({ ok: false, error: { code: 'NOT_FOUND', message: 'Perro no encontrado.' } }, { status: 404 })
    await deleteImages(dog.photos.map((photo) => photo.publicId))
    const deleted = await deleteDog(id)
    if (!deleted) throw new Error('El cachorro cambió durante la eliminación.')
    revalidatePath('/')
    return ok({ id })
  } catch (error) {
    return apiError(error)
  }
}
