import { createSupabaseClient as supabase } from '@/clientServices/supabase/clientCreator'
import { AsyncReturnType } from '@/types/typesUtils'

export const getUserId = async () => {
  const { data, error } = await supabase().auth.getSession()
  return data.session?.user.id
}

export interface GetUserIdI {
  data: AsyncReturnType<typeof getUserId>
}
