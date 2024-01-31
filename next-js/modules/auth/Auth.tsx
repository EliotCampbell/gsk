'use client'
import React, { useLayoutEffect } from 'react'
import SignInForm from '@/modules/auth/components/SignInForm/SignInForm'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { authWithCredentials } from '@/lib/redux/features/auth/authSlice'
import { useRouter } from 'next/navigation'
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

  const router = useRouter()

  useLayoutEffect(() => {
    if (select.exists) router.push('/user')
  }, [])

  return <SignInForm handleSignIn={handleSignIn} />
}

export default Auth
