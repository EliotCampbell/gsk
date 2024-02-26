'use client'

import React, { ReactNode, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppSelector, useAppStore } from '@/clientServices/redux/hooks'
import { clear } from '@/clientServices/redux/features/notification/notificationSlice'
import 'react-toastify/dist/ReactToastify.css'
import { TNotification } from '@/types/types'

const Notification: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const select = useAppSelector((state) => state.notification)

  const store = useAppStore()

  const createToast = (toastParams: TNotification) => {
    switch (toastParams.type) {
      case 'error':
        toast.error(select.message)
        break
      case 'success':
        toast.success(select.message)
        break
      case 'info':
        toast.info(select.message)
        break
      case '':
        store.dispatch(clear())
        break
      default:
        toast.error('Notification type is unknown')
    }
  }

  useEffect(() => {
    select.message && createToast(select)
  }, [select])
  return (
    <>
      <ToastContainer
        position={'bottom-right'}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
        autoClose={5000}
      />
      {children}
    </>
  )
}

export default Notification
