import { v2 as cloudinary } from 'cloudinary'

const ASSET_FOLDER = 'Boston Terrier CR'

function configure() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary no está configurado. Completa sus tres variables en .env.local.')
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  })
}

export async function uploadImage(file: File) {
  configure()
  const bytes = Buffer.from(await file.arrayBuffer())
  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        asset_folder: ASSET_FOLDER,
        resource_type: 'image',
        transformation: [{ width: 1200, crop: 'limit' }],
        quality: 'auto',
        fetch_format: 'auto',
      },
      (error, result) => error || !result ? reject(error ?? new Error('Cloudinary no respondió.')) : resolve({ url: result.secure_url, publicId: result.public_id }),
    )
    stream.end(bytes)
  })
}

export async function deleteImages(publicIds: string[]) {
  const cloudinaryIds = publicIds.filter((publicId) => !publicId.startsWith('local:'))
  if (!cloudinaryIds.length) return
  configure()
  const results = await Promise.all(cloudinaryIds.map((publicId) => cloudinary.uploader.destroy(publicId)))
  const failed = results.find(({ result }) => result !== 'ok' && result !== 'not found')
  if (failed) throw new Error(`Cloudinary no pudo eliminar una imagen: ${failed.result}`)
}
