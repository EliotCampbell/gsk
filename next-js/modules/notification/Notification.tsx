'use client'

import React, { ReactNode, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import {
  useAppDispatch,
  useAppSelector,
  useAppStore
} from '@/clientServices/redux/hooks'
import { clearError } from '@/clientServices/redux/features/notification/notificationSlice'
import 'react-toastify/dist/ReactToastify.css'
import { TNotification } from '@/types/types'
import { checkLocalSession } from '@/clientServices/redux/features/auth/authSlice'

const Notification: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const select = useAppSelector((state) => state.notification)

  const store = useAppStore()

  const createToast = (toastParams: TNotification) => {
    if (toastParams.type === 'error') {
      toast.error(select.message)
    }
    if (toastParams.type === 'success') {
      toast.success(select.message)
    }
    if (toastParams.type === 'info') {
      toast.info(select.message)
    } else {
      toast.error('Notification type is unknown')
    }
    store.dispatch(clearError())
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkLocalSession())
  }, [])

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
