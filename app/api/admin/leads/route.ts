import { apiError, ok } from '@/lib/api/response'; import { requireAdminSession } from '@/lib/auth/session'; import { listLeads } from '@/lib/repositories/leads'
export async function GET(){try{await requireAdminSession();return ok(await listLeads())}catch(e){return apiError(e)}}
