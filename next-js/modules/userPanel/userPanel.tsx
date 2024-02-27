'use client'
import React, { FC } from 'react'
import UserInfo from '@/modules/userPanel/components/UserInfo/UserInfo'
import { useAppSelector } from '@/clientServices/redux/hooks'
import UserOptions from '@/modules/userPanel/components/UserOptions/UserOptions'
import { userPrivateDataSelector } from '@/modules/userPanel/selectors'

const UserPanel: FC = () => {
  const { userPrivateData, pending } = useAppSelector(userPrivateDataSelector)

  return (
    <>
      <UserInfo userInfo={userPrivateData} pending={pending} />
      <UserOptions />
    </>
  )
}

export default UserPanel
