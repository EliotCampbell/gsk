'use server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export default async function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    }
  )
}

export const serverSignInWithPassword = async (formData: FormData) => {
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

export const serverGetUserProfileData = async () => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (data.user?.id) {
      const info = await supabase
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
