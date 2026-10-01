'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import type { DogView } from '@/lib/repositories/dogs'
import type { DogInput } from '@/lib/validation/dog'
import styles from '../../admin.module.css'

type Mode = 'Cachorros' | 'Vendidos'

export function DogsTab({ dogs, mode }: Readonly<{ dogs: DogView[]; mode: Mode }>) {
  const router = useRouter()
  const [editing, setEditing] = useState<DogView | null>(null)
  const [message, setMessage] = useState('')

  async function remove(dog: DogView) {
    if (!confirm(`¿Eliminar a ${dog.name} y sus imágenes?`)) return
    const response = await fetch(`/api/admin/dogs/${dog.id}`, { method: 'DELETE' })
    const result = await response.json()
    setMessage(response.ok ? 'Registro eliminado.' : result.error?.message)
    if (response.ok) router.refresh()
  }

  async function setSold(dog: DogView, sold: boolean) {
    const response = await fetch(`/api/admin/dogs/${dog.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...dog, sold, available: sold ? false : dog.available }),
    })
    if (response.ok) router.refresh()
  }

  return (
    <div className={styles.workspace}>
      {mode !== 'Vendidos' ? <DogForm key={editing?.id ?? 'new'} dog={editing} onDone={() => { setEditing(null); router.refresh() }} onPhotoDeleted={() => router.refresh()} /> : null}
      <section className={styles.listPanel}>
        <div className={styles.sectionTitle}><div><p className={styles.eyebrow}>Inventario</p><h2>{mode}</h2></div><span>{dogs.length}</span></div>
        <p className={styles.message} aria-live="polite">{message}</p>
        <div className={styles.cardGrid}>
          {dogs.map((dog) => (
            <article className={styles.dogCard} key={dog.id}>
              <div className={styles.dogImage}><Image src={dog.photos[0].url} alt={dog.name} fill sizes="(max-width: 700px) 100vw, 320px" /></div>
              <div className={styles.dogBody}>
                <h3>{dog.name}</h3><p>{dog.breed} · {dog.gender} · {dog.daysOld} días</p>
                <strong>{new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 }).format(dog.price)}</strong>
                <div className={styles.actions}>
                  {mode !== 'Vendidos' ? <button onClick={() => setEditing(dog)}>Editar</button> : null}
                  <button onClick={() => setSold(dog, !dog.sold)}>{dog.sold ? 'Quitar de vendidos' : 'Marcar vendido'}</button>
                  <button className={styles.danger} onClick={() => remove(dog)}>Eliminar</button>
                </div>
              </div>
            </article>
          ))}
          {!dogs.length ? <p className={styles.empty}>No hay registros en esta sección.</p> : null}
        </div>
      </section>
    </div>
  )
}

function DogForm({ dog, onDone, onPhotoDeleted }: Readonly<{ dog: DogView | null; onDone: () => void; onPhotoDeleted: () => void }>) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [photos, setPhotos] = useState(dog?.photos ?? [])

  async function removePhoto(publicId: string) {
    if (!dog || !confirm('¿Eliminar esta fotografía de MongoDB y Cloudinary?')) return
    setLoading(true); setMessage('')
    try {
      const response = await fetch(`/api/admin/dogs/${dog.id}/photos`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error?.message || 'No fue posible eliminar la fotografía.')
      setPhotos(result.data.photos)
      setMessage('Fotografía eliminada de Cloudinary.')
      onPhotoDeleted()
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : 'No fue posible eliminar la fotografía.')
    } finally {
      setLoading(false)
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage('')
    const form = new FormData(event.currentTarget)
    try {
      const savedPhotos = [...photos]
      for (const entry of form.getAll('photos')) {
        if (!(entry instanceof File) || !entry.size) continue
        const uploadData = new FormData(); uploadData.set('file', entry)
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: uploadData })
        const uploadResult = await uploadResponse.json()
        if (!uploadResponse.ok) throw new Error(uploadResult.error?.message || 'Falló la carga de imagen.')
        savedPhotos.push(uploadResult.data)
      }
      if (!savedPhotos.length) throw new Error('Agrega al menos una fotografía.')
      const input: DogInput = {
        name: String(form.get('name') || ''),
        breed: String(form.get('breed') || 'Boston Terrier'),
        gender: String(form.get('gender') || 'Macho') as DogInput['gender'],
        color: String(form.get('color') || ''),
        daysOld: Number(form.get('daysOld')), hasPedigree: form.get('hasPedigree') === 'on', hasAwards: form.get('hasAwards') === 'on',
        price: Number(form.get('price')), photos: savedPhotos,
        description: String(form.get('description') || ''),
        contactWhatsapp: String(form.get('contactWhatsapp') || ''), available: form.get('available') === 'on', sold: dog?.sold ?? false,
      }
      const response = await fetch(dog ? `/api/admin/dogs/${dog.id}` : '/api/admin/dogs', {
        method: dog ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error?.message || 'No fue posible guardar.')
      setMessage('Guardado correctamente.'); onDone()
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : 'No fue posible guardar.') }
    finally { setLoading(false) }
  }

  return (
    <section className={styles.formPanel}>
      <p className={styles.eyebrow}>{dog ? 'Editar' : 'Nuevo registro'}</p><h2>{dog ? dog.name : 'Agregar cachorro'}</h2>
      <form className={styles.dogForm} onSubmit={submit}>
        <label>Nombre<input name="name" defaultValue={dog?.name} required maxLength={120} /></label>
        <label>Raza<input name="breed" defaultValue={dog?.breed || 'Boston Terrier'} required /></label>
        <div className={styles.twoCols}><label>Género<select name="gender" defaultValue={dog?.gender || 'Macho'}><option>Macho</option><option>Hembra</option></select></label><label>Color<input name="color" defaultValue={dog?.color} required /></label></div>
        <div className={styles.twoCols}><label>Edad en días<input name="daysOld" type="number" min="0" defaultValue={dog?.daysOld} required /></label><label>Precio CRC<input name="price" type="number" min="0" defaultValue={dog?.price} required /></label></div>
        <label>Descripción<textarea name="description" defaultValue={dog?.description} required rows={3} /></label>
        <label>WhatsApp<input name="contactWhatsapp" defaultValue={dog?.contactWhatsapp || process.env.NEXT_PUBLIC_WHATSAPP_CACHORROSRAZAPURA} /></label>
        <label>Fotografías<input name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple required={!dog} /></label>
        {dog && photos.length ? (
          <div className={styles.photoList} aria-label="Fotografías actuales">
            {photos.map((photo, index) => (
              <div className={styles.photoPreview} key={photo.publicId}>
                <Image src={photo.url} alt={`${dog.name}, fotografía ${index + 1}`} fill sizes="120px" />
                <button type="button" disabled={loading} onClick={() => removePhoto(photo.publicId)}>Eliminar foto</button>
              </div>
            ))}
          </div>
        ) : null}
        <div className={styles.checks}><label><input name="hasPedigree" type="checkbox" defaultChecked={dog?.hasPedigree} /> Pedigree</label><label><input name="hasAwards" type="checkbox" defaultChecked={dog?.hasAwards} /> Premios</label><label><input name="available" type="checkbox" defaultChecked={dog?.available ?? true} /> Publicado</label></div>
        <button className={styles.primaryButton} disabled={loading}>{loading ? 'Guardando…' : 'Guardar'}</button>
        <p className={styles.message} aria-live="polite">{message}</p>
      </form>
    </section>
  )
}
