'use client'
import React from 'react'
import Notification from '@/modules/notification/Notification'
import { useAppDispatch } from '@/clientServices/redux/hooks'
import { refreshSession } from '@/clientServices/redux/features/auth/authSlice'
import { useInit } from '@/hooks/useInit'

const ClientServicesProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const dispatch = useAppDispatch()

  useInit(() => {
    dispatch(refreshSession())
  })

  return <Notification>{children}</Notification>
}

export default ClientServicesProvider
