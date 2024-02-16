'use server'
import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'

export const serverGetPrivateUser = async () => {
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

export const serverGetPublicUser = async (userId: string) => {
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
      return data
    }
    throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}
