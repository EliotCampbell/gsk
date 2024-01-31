'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppStore } from '@/lib/redux/hooks'
import { getUser } from '@/lib/redux/features/userProfile/userProfileSlice'

const UserInfo: React.FC = () => {
  const store = useAppStore()
  const select = useAppSelector((state) => state.userProfile)
  useEffect(() => {
    store.dispatch(getUser())
  }, [])
  return <div>PANEL</div>
}

export default UserInfo
