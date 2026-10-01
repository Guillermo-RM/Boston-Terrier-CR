import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { v2 as cloudinary } from 'cloudinary'
import { MongoClient } from 'mongodb'

const requiredEnvironment = [
  'MONGODB_URI',
]

for (const key of requiredEnvironment) {
  if (!process.env[key]) throw new Error(`${key} no está configurada en .env.local.`)
}

const usingCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME
  && process.env.CLOUDINARY_API_KEY
  && process.env.CLOUDINARY_API_SECRET,
)

if (usingCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectDirectory = path.resolve(scriptDirectory, '..')
const imageDirectory = path.join(projectDirectory, 'public', 'images', 'editorial')
const seedOwner = 'seed:test-dogs'
const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_CACHORROSRAZAPURA || '50672006675').replace(/[^0-9+]/g, '')

const dogs = [
  {
    name: 'Luna',
    breed: 'Boston Terrier',
    gender: 'Hembra',
    color: 'Negro y blanco',
    daysOld: 75,
    price: 850000,
    description: 'Cachorra de prueba para validar el catálogo y las funciones del panel administrativo.',
    images: ['puppy-pink-standing.webp', 'puppy-pink-portrait.webp'],
  },
  {
    name: 'Bruno',
    breed: 'Boston Terrier',
    gender: 'Macho',
    color: 'Negro y blanco',
    daysOld: 70,
    price: 825000,
    description: 'Cachorro de prueba para revisar fotografías, precio, disponibilidad y edición desde el panel.',
    images: ['puppy-blue-standing.webp', 'puppy-blue-closeup.webp'],
  },
  {
    name: 'Milo',
    breed: 'Boston Terrier',
    gender: 'Macho',
    color: 'Negro y blanco',
    daysOld: 82,
    price: 875000,
    description: 'Cachorro de prueba para comprobar el flujo completo de publicación, venta y eliminación.',
    images: ['puppy-bowtie-garden.webp', 'puppy-red-bandana.webp'],
  },
]

async function uploadPhoto(dogName, fileName, position) {
  if (!usingCloudinary) {
    return {
      publicId: `local:editorial/${fileName}`,
      url: `/images/editorial/${fileName}`,
    }
  }

  const publicId = `boston-terrier-cr/test-dogs/${dogName.toLowerCase()}-${position + 1}`
  const result = await cloudinary.uploader.upload(path.join(imageDirectory, fileName), {
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
    tags: ['boston-terrier-cr', 'test-dog'],
  })

  return {
    publicId: result.public_id,
    url: cloudinary.url(result.public_id, {
      secure: true,
      fetch_format: 'auto',
      quality: 'auto',
      width: 1200,
      crop: 'limit',
    }),
  }
}

const client = new MongoClient(process.env.MONGODB_URI)

try {
  const preparedDogs = await Promise.all(dogs.map(async (dog) => ({
    ...dog,
    photos: await Promise.all(dog.images.map((fileName, index) => uploadPhoto(dog.name, fileName, index))),
  })))

  await client.connect()
  const database = client.db(process.env.MONGODB_DATABASE || 'boston_terrier_cr')
  const collection = database.collection('dogs')

  for (const dog of preparedDogs) {
    const record = Object.fromEntries(Object.entries(dog).filter(([key]) => key !== 'images'))
    const now = new Date()
    await collection.updateOne(
      { name: dog.name, updatedBy: seedOwner },
      {
        $set: {
          ...record,
          hasPedigree: false,
          hasAwards: false,
          contactWhatsapp: whatsapp,
          available: true,
          sold: false,
          updatedBy: seedOwner,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    )
  }

  const insertedDogs = await collection
    .find({ updatedBy: seedOwner }, { projection: { name: 1, photos: 1, available: 1, sold: 1 } })
    .sort({ name: 1 })
    .toArray()

  console.log(JSON.stringify({ storage: usingCloudinary ? 'cloudinary' : 'local-optimized', count: insertedDogs.length, dogs: insertedDogs.map((dog) => ({
    id: String(dog._id),
    name: dog.name,
    photos: dog.photos.length,
    available: dog.available,
    sold: dog.sold,
  })) }, null, 2))
} finally {
  await client.close()
}
