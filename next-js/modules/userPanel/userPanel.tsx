'use client'
import React, { FC, useEffect } from 'react'
import UserInfo from '@/modules/userPanel/components/UserInfo/UserInfo'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import UserOptions from '@/modules/userPanel/components/UserOptions/UserOptions'
import { userPrivateDataSelector } from '@/modules/userPanel/selectors'
import { getMyObjects } from '@/clientServices/redux/features/objects/objectsSlice'
import { getAdsByUser } from '@/clientServices/redux/features/ads/adsSlice'

const UserPanel: FC = () => {
  const { userPrivateData, pending } = useAppSelector(userPrivateDataSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMyObjects())
  }, [])

  useEffect(() => {
    userPrivateData.id && dispatch(getAdsByUser(userPrivateData.id))
  }, [userPrivateData.id])

  return (
    <>
      <UserInfo userInfo={userPrivateData} pending={pending} />
      <UserOptions></UserOptions>
    </>
  )
}

export default UserPanel
