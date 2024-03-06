'use server'
import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/types/typesUtils'

export const getPublicUserInfo = async (userId: string) => {
  try {
    const { data, error } = await supabase()
      .from('users_profiles')
      .select('id,username,name,surname,profile_image')
      .eq('id', userId)
      .single()

    if (error) {
      throw error
    }
    if (data) {
      return { user: data }
    }
    throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface IPublicUser {
  data: AsyncReturnType<typeof getPublicUserInfo>
}
