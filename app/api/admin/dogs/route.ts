import { revalidatePath } from 'next/cache'
import { apiError, ok } from '@/lib/api/response'
import { requireAdminSession } from '@/lib/auth/session'
import { createDog, listDogs } from '@/lib/repositories/dogs'
import { dogInputSchema } from '@/lib/validation/dog'

export async function GET() {
  try {
    await requireAdminSession()
    return ok(await listDogs())
  } catch (error) {
    return apiError(error)
  }
}

export async function POST(request: Request) {
  try {
    const username = await requireAdminSession()
    const dog = await createDog(dogInputSchema.parse(await request.json()), username)
    revalidatePath('/')
    return ok(dog, 201)
  } catch (error) {
    return apiError(error)
  }
}
