'use server'

import createSupabaseServerClient from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const serverAction = async (_: any, formData: FormData) => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })
    if (data.user) {
      //Successful auth
    } else if (error) {
      return { error: error.message }
    } else return { error: 'Unexpected server error' }
  } catch (error) {
    return { error: (error as Error).message }
  }
  redirect('/user')
}
