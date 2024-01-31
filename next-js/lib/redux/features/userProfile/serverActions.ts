'use server'

import createSupabaseServerClient from '@/lib/supabase/server'

export const serverAction = async () => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    return data
  } catch (error) {
    return { data: { error: { message: (error as Error).message } } }
  }
}
