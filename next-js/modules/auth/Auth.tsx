'use client'
import React from 'react'
import SignInForm from '@/modules/auth/components/SignInForm/SignInForm'
import { useAppDispatch } from '@/clientServices/redux/hooks'
import { signInWithPassword } from '@/clientServices/redux/features/auth/authSlice'

const Auth: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleSignIn = (formData: FormData) => {
    dispatch(signInWithPassword(formData))
  }

  return <SignInForm handleSignIn={handleSignIn} />
}

export default Auth
