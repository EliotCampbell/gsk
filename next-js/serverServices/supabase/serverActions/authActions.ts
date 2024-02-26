'use server'
import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'
import { AsyncReturnType } from '@/types/typesUtils'

export const signInWithPassword = async (formData: FormData) => {
  try {
    const { error, data } = await supabase().auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })
    if (error) {
      throw error
    }
    if (data) {
      return { user: data.user }
    } else {
      throw new Error('Unexpected supabase response')
    }
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface ISignInWithPassword {
  data: AsyncReturnType<typeof signInWithPassword>
}

export const checkLocalSession = async () => {
  try {
    const { data, error } = await supabase().auth.getSession()
    if (error) {
      throw error
    }
    if (data) {
      return { session: data.session }
    } else {
      throw new Error('Unexpected supabase response')
    }
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface ICheckLocalSession {
  data: AsyncReturnType<typeof checkLocalSession>
}

export const signOut = async () => {
  try {
    const { error } = await supabase().auth.signOut()
    if (error) {
      throw error.message
    }
    if (!error) {
      return
    } else {
      throw new Error('Unexpected supabase response')
    }
  } catch (error) {
    return { data: { error: { message: (error as Error).message } } }
  }
}

export interface ISignOut {
  data: AsyncReturnType<typeof signOut>
}
