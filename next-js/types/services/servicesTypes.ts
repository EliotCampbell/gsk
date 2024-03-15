export type SingleServiceType = {
  id: string
  created_at: Date
  user_id: string
  title: string
  body: string
  phone: string
  phone_country_code: string
  telegram: string | null
  whatsapp: boolean
  custom_contact: string | null
  service_images: string[]
  author: {
    name: string | null
    surname: string | null
    username: string
    profile_image: string | null
  }
}
