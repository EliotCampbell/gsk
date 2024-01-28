'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import classes from './SignInForm.module.css'
import SubmitButton from '@/modules/auth/components/SubmitButton/SubmitButton'
import { useAppStore } from '@/lib/redux/hooks'
import { authWithCredentials } from '@/lib/redux/features/auth/authSlice'

const SignInForm: React.FC = () => {
  const store = useAppStore()

  const handleSignIn = (state: object, formData: FormData) => {
    store.dispatch(authWithCredentials(formData))
    return state
  }

  const [_, formAction] = useFormState(handleSignIn, {})

  //todo: try to implement error handling from server actions
  return (
    <form action={formAction} className={classes.form}>
      <p className={classes.title}>ГСК</p>
      <input
        name={'email'}
        className={classes.input}
        placeholder={'E-mail...'}
      />
      <input
        name={'password'}
        type={'password'}
        className={classes.input}
        placeholder={'Password...'}
      />
      <SubmitButton>{'ВОЙТИ'}</SubmitButton>
    </form>
  )
}

export default SignInForm
