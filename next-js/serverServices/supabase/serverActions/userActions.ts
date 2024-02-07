'use server'
import supabase from '@/serverServices/supabase/clientCreators'

export const serverGetUserProfileData = async () => {
  try {
    const { data } = await supabase().auth.getUser()
    if (data.user?.id) {
      const info = await supabase()
        .from('user_profiles')
        .select()
        .eq('id', data.user.id)
      console.log(info)
    }

    return data
  } catch (error) {
    return { data: { error: { message: (error as Error).message } } }
  }
}
