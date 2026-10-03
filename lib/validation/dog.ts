import { z } from 'zod'

const photo = z.object({
  url: z.string().refine(
    (url) => url.startsWith('https://') || /^\/images\/[A-Za-z0-9/_-]+\.(?:jpe?g|png|webp)$/i.test(url),
    'La imagen debe usar HTTPS o una ruta válida dentro de /images/.',
  ),
  publicId: z.string().min(1).max(300),
})

export const dogInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  breed: z.string().trim().max(120).default('Boston Terrier'),
  gender: z.enum(['Macho', 'Hembra']),
  color: z.string().trim().min(1).max(120),
  daysOld: z.coerce.number().int().min(0).max(7300),
  hasPedigree: z.boolean().default(false),
  hasAwards: z.boolean().default(false),
  price: z.coerce.number().min(0).max(100_000_000),
  photos: z.array(photo).min(1).max(20),
  description: z.string().trim().max(1500).default(''),
  contactWhatsapp: z.string().transform((value) => value.replace(/[^0-9+]/g, '')).pipe(z.string().max(20)).default('50672006675'),
  available: z.boolean().default(true),
  sold: z.boolean().default(false),
})

export type DogInput = z.infer<typeof dogInputSchema>
