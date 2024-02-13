import { createSupabaseSClient as supabase } from '@/serverServices/supabase/clientCreators'

export const getPublications = async () => {
  try {
    const { error, data } = await supabase().from('publications').select()
    if (error) {
      throw error
    }
    if (data) {
      return data
    } else {
      throw new Error('Unexpected supabase Error')
    }
  } catch (error) {
    console.log((error as Error).message)
  }
}
