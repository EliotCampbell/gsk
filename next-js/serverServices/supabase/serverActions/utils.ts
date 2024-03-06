import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'

export const getUserId = async () =>
  await supabase()
    .auth.getSession()
    .then((res) => res.data.session?.user.id)
