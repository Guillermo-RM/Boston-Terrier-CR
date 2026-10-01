import { listDogs } from '@/lib/repositories/dogs'
import { listLeads } from '@/lib/repositories/leads'
import { AdminPanel } from './_components/AdminPanel'

export const dynamic = 'force-dynamic'

export default async function AdminPanelPage() {
  const [dogs, leads] = await Promise.all([
    listDogs(),
    listLeads(),
  ])
  return <AdminPanel initialDogs={dogs} initialLeads={leads} />
}
