'use server'
import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/types/typesUtils'
import { TablesInsert } from '@/types/supabase'

export const createService = async (fields: TablesInsert<'services'>) => {
  return supabase()
    .from('services')
    .insert({ ...fields })
    .select()
}

export interface ICreateService {
  data: AsyncReturnType<typeof createService>
}

export const getServicesByUser = async (userId: string) => {
  try {
    const { data, error } = await supabase()
      .from('services')
      .select('*')
      .eq('user_id', userId)
    if (error) return { error }
    if (data) return { services: data }
    else throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface IGetServicesByUser {
  data: AsyncReturnType<typeof getServicesByUser>
}

export const deleteServiceById = async (serviceId: string) => {
  return supabase().from('services').delete().eq('id', serviceId)
}

export interface IDeleteServiceById {
  data: AsyncReturnType<typeof deleteServiceById>
}
