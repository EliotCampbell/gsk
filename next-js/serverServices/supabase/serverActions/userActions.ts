'use server'
import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/types/typesUtils'

export const getPrivateUser = async () => {
  try {
    const { data, error } = await supabase().auth.getUser()
    if (error) {
      throw error
    }
    if (data.user) {
      return { user: data.user }
    }
    throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface IPrivateUser {
  data: AsyncReturnType<typeof getPrivateUser>
}

export const getPublicUser = async (userId: string) => {
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
    } else throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface IPublicUser {
  data: AsyncReturnType<typeof getPublicUser>
}
