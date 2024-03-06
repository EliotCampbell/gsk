import { STATUS } from '@/types/statusTypes'

export type UserInfoType = {
  userPrivateInfo: { data: { id: string; email: string }; status: STATUS }
  userPublicInfo: {
    data: { name: string; surname: string; img: string; username: string }
    status: STATUS
  }
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
