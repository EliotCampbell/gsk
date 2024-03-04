export type UserInfoType = {
  id: string
  username: string
  name: string
  surname: string
  email: string
  img: string
}

export type ObjectType = {
  id: string
  type: 'garage' | 'parking_space'
  individual_number: string
  ownerships: {
    owner_since: Date
    owner_until: Date | null
  }[]
}

export type AdType = {
  id: string
  created_at: Date
  title: string
  body: string
  is_hidden: boolean
  user_id: string
  ad_images: string[]
}
