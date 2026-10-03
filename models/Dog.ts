import { Schema, model, models, type InferSchemaType } from 'mongoose'

const photoSchema = new Schema({ url: { type: String, required: true }, publicId: { type: String, required: true } }, { _id: false })

const dogSchema = new Schema({
  name: { type: String, required: true, trim: true },
  breed: { type: String, required: true },
  gender: { type: String, required: true },
  color: { type: String, required: true },
  daysOld: { type: Number, required: true, min: 0 },
  hasPedigree: { type: Boolean, default: false },
  hasAwards: { type: Boolean, default: false },
  price: { type: Number, required: true, min: 0 },
  photos: { type: [photoSchema], validate: [(value: unknown[]) => value.length > 0, 'Se requiere una fotografía.'] },
  description: { type: String, default: '' },
  contactWhatsapp: { type: String, default: '50672006675' },
  available: { type: Boolean, default: true, index: true },
  sold: { type: Boolean, default: false, index: true },
  updatedBy: { type: String, required: true },
}, { timestamps: true })

dogSchema.index({ available: 1, sold: 1, createdAt: -1 })
dogSchema.index({ breed: 1 })

export type DogDocument = InferSchemaType<typeof dogSchema>
export const Dog = models.Dog || model('Dog', dogSchema)
