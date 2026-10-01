import bcrypt from 'bcryptjs'

export async function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USER
  const passwordHash = process.env.ADMIN_PASSWORD_HASH
  if (!expectedUser || !passwordHash || username !== expectedUser) return false
  return bcrypt.compare(password, passwordHash)
}
