'use client'
import React from 'react'
import SignInForm from '@/modules/auth/components/SignInForm/SignInForm'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { authWithCredentials } from '@/clientServices/redux/features/auth/authSlice'
import { shallowEqual } from 'react-redux'

const Auth: React.FC = () => {
  const dispatch = useAppDispatch()

  const select = useAppSelector(
    (state) => ({ exists: state.auth.exists }),
    shallowEqual
  )
  const handleSignIn = (formData: FormData) => {
    dispatch(authWithCredentials(formData))
  }

  return <SignInForm handleSignIn={handleSignIn} />
}

export default Auth
