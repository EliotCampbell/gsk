'use client'
import React, { FC } from 'react'
import UserInfo from '@/modules/userPersonalDetails/components/UserInfo/UserInfo'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { userPrivateDataSelector } from '@/modules/userPersonalDetails/selectors'
import { useInit } from '@/hooks/useInit'
import { getPublicUser } from '@/clientServices/redux/features/userProfile/userProfileSlice'
import { STATUS } from '@/types/statusTypes'

const UserPersonalDetails: FC = () => {
  const dispatch = useAppDispatch()

  useInit(() => dispatch(getPublicUser()))

  const userData = useAppSelector(userPrivateDataSelector)

  return (
    <UserInfo
      userInfo={userData}
      pending={
        userData.userPrivateInfo.status === STATUS.pending ||
        userData.userPublicInfo.status === STATUS.pending
      }
    />
  )
}

export default UserPersonalDetails
