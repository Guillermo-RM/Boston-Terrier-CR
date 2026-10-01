import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('MONGODB_URI no está configurada en .env.local.')
}

const client = new MongoClient(uri)

try {
  await client.connect()
  const database = client.db(process.env.MONGODB_DATABASE || 'boston_terrier_cr')
  const dogs = database.collection('dogs')
  await dogs.createIndex({ available: 1, sold: 1, createdAt: -1 })
  await dogs.createIndex({ breed: 1 })
  await database.collection('leads').createIndex({ read: 1, createdAt: -1 })
  await database.collection('login_attempts').createIndex({ createdAt: 1 }, { expireAfterSeconds: 900 })

  console.log('MongoDB configurada: colecciones e índices creados.')
} finally {
  await client.close()
}
