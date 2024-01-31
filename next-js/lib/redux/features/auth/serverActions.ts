'use server'

import createSupabaseServerClient from '@/lib/supabase/server'

export const serverServerAction = async (formData: FormData) => {
  try {
    const supabase = await createSupabaseServerClient()
    const response = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })
    if (response.error) {
      throw response.error
    }
    if (response.data) {
      return response
    } else {
      throw new Error('Unexpected supabase Error')
    }
  } catch (error) {
    return { data: { error: { message: (error as Error).message } } }
  }
}

export const serverCheckLocalSession = async () => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.getSession()
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
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signOut()
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
