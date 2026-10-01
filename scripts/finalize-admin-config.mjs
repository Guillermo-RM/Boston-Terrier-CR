import { randomBytes } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import bcrypt from 'bcryptjs'

const envPath = new URL('../.env.local', import.meta.url)
let source = await readFile(envPath, 'utf8')

function readValue(key) {
  const match = source.match(new RegExp(`^${key}=(.*)$`, 'm'))
  return match?.[1].trim() ?? ''
}

function replaceValue(key, value) {
  const pattern = new RegExp(`^${key}=.*$`, 'm')
  if (!pattern.test(source)) throw new Error(`Falta ${key} en .env.local.`)
  source = source.replace(pattern, `${key}=${value}`)
}

const currentPasswordValue = readValue('ADMIN_PASSWORD_HASH')
if (!currentPasswordValue) throw new Error('Escribe primero tu contraseña en ADMIN_PASSWORD_HASH.')

const normalizedPasswordValue = currentPasswordValue.replace(/\\\$/g, '$')
const isBcryptHash = /^\$2[aby]\$\d{2}\$/.test(normalizedPasswordValue)
let passwordHash = normalizedPasswordValue

if (!isBcryptHash) {
  if (currentPasswordValue.length < 12) throw new Error('La contraseña administrativa debe tener al menos 12 caracteres.')
  passwordHash = await bcrypt.hash(currentPasswordValue, 12)
}

// @next/env expande referencias con $, por lo que los hashes bcrypt deben escaparlas.
replaceValue('ADMIN_PASSWORD_HASH', passwordHash.replace(/\$/g, '\\$'))

if (!readValue('JWT_SECRET')) {
  replaceValue('JWT_SECRET', randomBytes(48).toString('hex'))
}

await writeFile(envPath, source, 'utf8')
console.log(`Contraseña: ${isBcryptHash ? 'ya estaba protegida' : 'hash bcrypt generado'}.`)
console.log('JWT_SECRET: configurado.')
