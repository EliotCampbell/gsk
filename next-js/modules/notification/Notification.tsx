'use client'

import React, { ReactNode, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppSelector, useAppStore } from '@/lib/redux/hooks'
import { clearError } from '@/lib/redux/features/notification/notificationSlice'
import 'react-toastify/dist/ReactToastify.css'
import { INotification } from '@/types'

const Notification: React.FC<{ children: ReactNode }> = ({ children }) => {
  const select = useAppSelector((state) => state.notification)

  const store = useAppStore()

  const createToast = (toastParams: INotification) => {
    if (toastParams.type === 'error') {
      toast.error(select.message)
    }
    if (select.type === 'success') {
      toast.success(select.message)
    }
    store.dispatch(clearError())
  }

  useEffect(() => {
    select.message && createToast(select)
  }, [select])
  return (
    <>
      <ToastContainer position={'top-right'} autoClose={5000} />
      {children}
    </>
  )
}

export default Notification