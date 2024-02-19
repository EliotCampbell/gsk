'use server'
import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/serverServices/supabase/serverActions/args'

export const getPrivateUser = async () => {
  try {
    const { data } = await supabase().auth.getUser()
    if (data.user) {
      return data
    }
    throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export const getPublicUser = async (userId: string) => {
  try {
    const { error, data } = await supabase()
      .from('users_profiles')
      .select('id,name,surname,profile_image')
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

export interface PublicUserType {
  data: AsyncReturnType<typeof getPublicUser>
}
