'use server'

import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/types/typesUtils'

export const getMyObjects = async () => {
  try {
    const { data, error } = await supabase()
      .from('objects')
      .select('*,ownerships(owner_since, owner_until)')
    if (error) {
      throw error
    }
    if (data) {
      return { objects: data }
    } else throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface IGetMyObjects {
  data: AsyncReturnType<typeof getMyObjects>
}
