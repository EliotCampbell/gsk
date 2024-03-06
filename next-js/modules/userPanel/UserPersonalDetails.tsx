'use client'
import React, { FC, Suspense } from 'react'
import UserInfo from '@/modules/userPanel/components/UserInfo/UserInfo'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { userPrivateDataSelector } from '@/modules/userPanel/selectors'
import Spinner from '@/modules/UI/Spinner/Spinner'
import { useInit } from '@/hooks/useInit'
import { getPublicUser } from '@/clientServices/redux/features/userProfile/userProfileSlice'

const UserPersonalDetails: FC = () => {
  const dispatch = useAppDispatch()

  useInit(() => dispatch(getPublicUser()))

  const userData = useAppSelector(userPrivateDataSelector)

  return (
    <Suspense fallback={<Spinner />}>
      <UserInfo userInfo={userData} />
    </Suspense>
  )
}

export default UserPersonalDetails
