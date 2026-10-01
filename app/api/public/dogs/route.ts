import { ok } from '@/lib/api/response'
import { listDogs } from '@/lib/repositories/dogs'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  return ok(await listDogs({
    available: true,
    sold: params.get('sold') === 'true' ? true : false,
  }))
}
