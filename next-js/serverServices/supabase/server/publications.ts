import { createSupabaseSClient as supabase } from '@/serverServices/supabase/clientCreators'

export const getPublications = async () => {
  try {
    const { data, error } = await supabase()
      .from('publications')
      .select(
        `id, created_at, title, body, user_id, publication_images, users_profiles(name, surname, username, profile_image)`
      )
      .order('created_at', { ascending: true })
      .eq('is_hidden', 'false')
    if (error) {
      throw error
    }
    return data
  } catch (error) {
    console.log(
      `Supabase API error in getPublications: ${(error as Error).message}`
    )
    return []
  }
}
