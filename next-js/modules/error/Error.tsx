'use client'

import React, { ReactNode, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppSelector, useAppStore } from '@/lib/redux/hooks'
import { clearError } from '@/lib/redux/features/error/errorSlice'

const Error: React.FC<{ children: ReactNode }> = ({ children }) => {
  const select = useAppSelector((state) => state.error)

  const store = useAppStore()

  useEffect(() => {
    select.message && toast.error(select.message)
    console.log(select)
    store.dispatch(clearError())
  }, [select])
  return (
    <>
      <ToastContainer position={'top-right'} autoClose={5000} />
      {children}
    </>
  )
}

export default Error
