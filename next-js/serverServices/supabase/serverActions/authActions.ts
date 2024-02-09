'use server'
import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'

export const SignInWithPassword = async (formData: FormData) => {
  try {
    const { error, data } = await supabase().auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })
    if (error) {
      throw error
    }
    if (data) {
      return data
    } else {
      throw new Error('Unexpected supabase Error')
    }
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export const serverCheckLocalSession = async () => {
  try {
    const { data, error } = await supabase().auth.getSession()
    if (error) {
      throw error
    }
    if (data) {
      return data
    } else {
      throw new Error('Unexpected supabase Error')
    }
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export const serverSignOut = async () => {
  try {
    const { error } = await supabase().auth.signOut()
    if (error) {
      throw error.message
    }
    if (!error) {
      return
    } else {
      throw new Error('Unexpected supabase Error')
    }
  } catch (error) {
    return { data: { error: { message: (error as Error).message } } }
  }
}
