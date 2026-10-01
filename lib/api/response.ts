import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status })
}

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { ok: false, error: { code: 'VALIDATION_ERROR', message: 'Datos inválidos.', fields: error.flatten().fieldErrors } },
      { status: 400 },
    )
  }
  if (error instanceof Error && error.message === 'UNAUTHORIZED') {
    return NextResponse.json({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Sesión no válida.' } }, { status: 401 })
  }
  console.error(error)
  return NextResponse.json(
    { ok: false, error: { code: 'INTERNAL_ERROR', message: 'No fue posible completar la operación.' } },
    { status: 500 },
  )
}
