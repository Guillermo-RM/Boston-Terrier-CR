import { Schema, model, models } from 'mongoose'

const leadSchema = new Schema({
  name: { type: String, required: true }, email: { type: String, required: true, index: true }, phone: String,
  breed: { type: String, required: true }, breedAvailable: { type: Boolean, required: true }, message: String,
  read: { type: Boolean, default: false, index: true },
}, { timestamps: true })

export const Lead = models.Lead || model('Lead', leadSchema)
