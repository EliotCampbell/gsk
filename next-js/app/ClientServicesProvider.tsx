'use client'
import React, { useEffect } from 'react'
import Notification from '@/modules/notification/Notification'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { checkLocalSession } from '@/clientServices/redux/features/auth/authSlice'
import {
  getPrivateUser,
  getPublicUser
} from '@/clientServices/redux/features/userProfile/userProfileSlice'

const ClientServicesProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(
    (state) => state.userProfile.userPrivateData?.id
  )

  useEffect(() => {
    dispatch(checkLocalSession())
    dispatch(getPrivateUser())
  }, [])

  useEffect(() => {
    userId && dispatch(getPublicUser(userId))
  }, [userId])

  return <Notification>{children}</Notification>
}

export default ClientServicesProvider
