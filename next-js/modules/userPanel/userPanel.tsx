'use client'
import React from 'react'
import UserInfo from '@/modules/userPanel/components/UserInfo/UserInfo'
import { useAppSelector } from '@/clientServices/redux/hooks'
import { shallowEqual } from 'react-redux'
import { UserInfoType } from '@/modules/userPanel/types'

const UserPanel: React.FC = () => {
  const { userInfo } = useAppSelector(
    (state): { userInfo: UserInfoType } => ({
      userInfo: {
        id: state.userProfile.userPrivateData?.id || '',
        name: state.userProfile.userPublicData?.name || '',
        surname: state.userProfile.userPublicData?.surname || '',
        img: state.userProfile.userPublicData?.profile_image || '',
        username: state.userProfile.userPublicData?.username || '',
        email: state.userProfile.userPrivateData?.email || ''
      }
    }),
    shallowEqual
  )

  return <UserInfo userInfo={userInfo} />
}

export default UserPanel
