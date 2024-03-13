import { createSupabaseSAClient as supabase } from '@/serverServices/supabase/clientCreators'

export const getImageUrl = (bucketName: string, imageName: string) => {
  try {
    const { data } = supabase().storage.from(bucketName).getPublicUrl(imageName)
    if (data) {
      return { data: data }
    } else throw new Error('Unexpected supabase response')
  } catch (error) {
    return { error: { message: (error as Error).message } }
  }
}

export interface IGetImageUrl {
  data: typeof getImageUrl
}
