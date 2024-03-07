type TSinglePublication = {
  id: string
  body: string
  created_at: string
  title: string
  user_id: string
  publication_images: string[] | null
  author: {
    username: string
    name: string | null | undefined
    surname: string | null | undefined
    profile_image: string | undefined | null
  }
}
