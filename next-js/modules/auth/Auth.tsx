'use client'
import React from 'react'
import SignInForm from '@/modules/auth/components/SignInForm/SignInForm'
import { useAppDispatch } from '@/clientServices/redux/hooks'
import { signInWithPassword } from '@/clientServices/redux/features/auth/authSlice'
import { useRouter } from 'next/navigation'

const Auth: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSignIn = (formData: FormData) => {
    dispatch(signInWithPassword(formData)).then(() => router.push('/user'))
  }

  return <SignInForm handleSignIn={handleSignIn} />
}

export default Auth
