import { createSupabaseSClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/types/typesUtils'

export const getServices = async () => {
  try {
    const { data, error } = await supabase()
      .from('services')
      .select('*, users_profiles(name, surname, username, profile_image)')
      .order('created_at', { ascending: true })
    if (error) {
      throw error
    }
    if (data) {
      return data
    }
    throw new Error('Unexpected supabase error')
  } catch (error) {
    console.log(
      `Supabase API error of getServices: ${(error as Error).message}`
    )
    return []
  }
}

export type IGetServices = AsyncReturnType<typeof getServices>
