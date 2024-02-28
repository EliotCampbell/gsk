'use server'

import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/types/typesUtils'

export const getAdsByUser = async (userId: string) => {
  try {
    const { data, error } = await supabase()
      .from('ads')
      .select('*')
      .eq('user_id', userId)
    if (error) {
      throw error
    }
    if (data) {
      return { ads: data }
    } else throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface IGetAdsByUser {
  data: AsyncReturnType<typeof getAdsByUser>
}
