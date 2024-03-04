'use client'
import React, { FC } from 'react'
import UserInfo from '@/modules/userPanel/components/UserInfo/UserInfo'
import { useAppSelector } from '@/clientServices/redux/hooks'
import { userPrivateDataSelector } from '@/modules/userPanel/selectors'

const UserPersonalDetails: FC = () => {
  const { userPrivateData, pending } = useAppSelector(userPrivateDataSelector)

  return <UserInfo userInfo={userPrivateData} pending={pending} />
}

export default UserPersonalDetails
