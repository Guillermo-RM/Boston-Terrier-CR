import { Types } from 'mongoose'
import { connectMongo } from '@/lib/db/mongoose'
import { dogInputSchema, type DogInput } from '@/lib/validation/dog'
import { Dog } from '@/models/Dog'

export type DogView = DogInput & { id: string; createdAt: string; updatedAt: string }

function serialize(dog: Record<string, unknown>): DogView {
  const input = dogInputSchema.parse(dog)

  return {
    ...input,
    id: String(dog._id),
    createdAt: new Date(dog.createdAt as string).toISOString(),
    updatedAt: new Date(dog.updatedAt as string).toISOString(),
  }
}

export async function listDogs(filters: { sold?: boolean; available?: boolean } = {}) {
  await connectMongo()
  const dogs = await Dog.find(filters).sort({ createdAt: -1 }).lean()
  return dogs.map((dog: Record<string, unknown>) => serialize(dog))
}

export async function createDog(input: DogInput, username: string) {
  await connectMongo()
  const dog = await Dog.create({ ...input, updatedBy: username })
  return serialize(dog.toObject())
}

export async function getDog(id: string) {
  if (!Types.ObjectId.isValid(id)) return null
  await connectMongo()
  const dog = await Dog.findById(id).lean()
  return dog ? serialize(dog as Record<string, unknown>) : null
}

export async function updateDog(id: string, input: DogInput, username: string) {
  if (!Types.ObjectId.isValid(id)) return null
  await connectMongo()
  const dog = await Dog.findByIdAndUpdate(id, { ...input, updatedBy: username }, { returnDocument: 'after', runValidators: true }).lean()
  return dog ? serialize(dog as Record<string, unknown>) : null
}

export async function deleteDog(id: string) {
  if (!Types.ObjectId.isValid(id)) return null
  await connectMongo()
  const dog = await Dog.findByIdAndDelete(id).lean()
  return dog ? serialize(dog as Record<string, unknown>) : null
}
