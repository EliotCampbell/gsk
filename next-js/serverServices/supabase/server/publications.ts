import { createSupabaseSClient as supabase } from '@/serverServices/supabase/clientCreators'

export const getPublications = async () => {
  try {
    const { data, error } = await supabase()
      .from('publications')
      .select(
        `id, created_at, title, body, user_id, publication_images, users_profiles(name, surname, username, profile_image)` //todo: переписать получение профиля
      )
      .order('created_at', { ascending: true })
    if (error) {
      throw error
    }
    return data
  } catch (error) {
    console.log(
      `Supabase API error of getPublications: ${(error as Error).message}`
    )
    return []
  }
}
