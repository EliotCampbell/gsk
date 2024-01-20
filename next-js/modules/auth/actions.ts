'use server'

import createSupabaseServerClient from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const serverAction = async (_: any, formData: FormData) => {
  try {
    const supabase = await createSupabaseServerClient()
    const result = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })
    if (result.data.user) {
      //Successful auth
    } else if (result.error) {
      return { error: result.error.message }
    } else return { error: 'Unexpected server error' }
  } catch (error) {
    return { error: (error as Error).message }
  }
  redirect('/')
}
