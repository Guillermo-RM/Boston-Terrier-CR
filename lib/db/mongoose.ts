import mongoose from 'mongoose'

const globalMongo = globalThis as typeof globalThis & {
  mongooseConnection?: Promise<typeof mongoose>
}

export async function connectMongo() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI no está configurada.')

  globalMongo.mongooseConnection ??= mongoose.connect(uri, {
    dbName: process.env.MONGODB_DATABASE || 'boston_terrier_cr',
  })

  return globalMongo.mongooseConnection
}

export function isDatabaseConfigured() {
  return Boolean(process.env.MONGODB_URI)
}
