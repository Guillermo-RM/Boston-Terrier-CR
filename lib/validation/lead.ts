import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().trim().max(30),
  breed: z.string().trim().min(1).max(120),
  message: z.string().trim().max(2000),
  website: z.string().max(0).optional(),
})
