import { Types } from 'mongoose'
import { connectMongo } from '@/lib/db/mongoose'
import { Dog } from '@/models/Dog'
import { Lead } from '@/models/Lead'

function plain(value: Record<string, unknown>) {
  const { _id, createdAt, updatedAt, ...data } = value
  return {
    ...data,
    id: String(_id),
    createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
    updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
  }
}

export async function listLeads() {
  await connectMongo()
  return (await Lead.find().sort({ createdAt: -1 }).lean()).map((lead: Record<string, unknown>) => plain(lead))
}

export async function breedIsAvailable(breed: string) {
  await connectMongo()
  const normalized = breed.trim().toLocaleLowerCase('es')
  const dogs = await Dog.find({ available: true, sold: false }, { breed: 1 }).lean()
  return dogs.some((dog: { breed?: string }) => dog.breed?.trim().toLocaleLowerCase('es') === normalized)
}

export function validId(id: string) {
  return Types.ObjectId.isValid(id)
}
