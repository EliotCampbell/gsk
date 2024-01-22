'use client'

import React, { useEffect } from 'react'
import classes from './SignInForm.module.css'
import { useFormState } from 'react-dom'
import { serverAction } from '@/modules/auth/actions'
import SubmitButton from '@/modules/auth/components/SubmitButton/SubmitButton'
import { useAppStore } from '@/lib/redux/hooks'
import { setError } from '@/lib/redux/features/error/errorSlice'

const SignInForm: React.FC = () => {
  const [state, action] = useFormState(serverAction, { error: '' })

  const store = useAppStore()
  useEffect(() => {
    state.error && store.dispatch(setError({ message: state.error }))
    console.log(state.error)
  }, [state])
  //todo: try to implement error handling from server actions
  return (
    <form action={action} className={classes.form}>
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
      <SubmitButton>{'Войти'}</SubmitButton>
    </form>
  )
}

export default SignInForm
