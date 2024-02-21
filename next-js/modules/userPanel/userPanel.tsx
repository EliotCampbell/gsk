'use client'
import React, { useEffect } from 'react'
import UserInfo from '@/modules/userPanel/components/UserInfo/UserInfo'
import { useAppSelector, useAppStore } from '@/clientServices/redux/hooks'
import { getPrivateUser } from '@/clientServices/redux/features/userProfile/userProfileSlice'

const UserPanel: React.FC = () => {
  const store = useAppStore()
  const select = useAppSelector((state) => state.userProfile)
  useEffect(() => {
    store.dispatch(getPrivateUser())
  }, [])
  return <UserInfo userInfo={select} />
}

export default UserPanel
