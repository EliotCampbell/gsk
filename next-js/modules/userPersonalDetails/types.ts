import { STATUS } from '@/types/statusTypes'

export type UserInfoType = {
  userPrivateInfo: { data: { id: string; email: string }; status: STATUS }
  userPublicInfo: {
    data: { name: string; surname: string; img: string; username: string }
    status: STATUS
  }
}
