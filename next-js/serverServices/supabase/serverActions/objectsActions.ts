'use server'

import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/types/typesUtils'

export const getObjectsByUser = async (userId: string) => {
  try {
    const { data, error } = await supabase()
      .from('objects')
      .select(
        'id, type, individual_number, ownerships(owner_since, owner_until, owner)'
      )
      .in('ownerships.owner', [userId])
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

export interface IGetObjectsByUser {
  data: AsyncReturnType<typeof getObjectsByUser>
}
