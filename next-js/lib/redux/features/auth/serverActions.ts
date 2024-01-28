'use server'

import createSupabaseServerClient from '@/lib/supabase/server'

export const serverAction = async (formData: FormData) => {
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
