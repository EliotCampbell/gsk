'use client'

import React from 'react'
import classes from './SignInForm.module.css'
import { useFormState } from 'react-dom'
import { serverAction } from '@/modules/auth/actions'
import SubmitButton from '@/modules/auth/components/SubmitButton/SubmitButton'

const SignInForm: React.FC = () => {
  const [state, action] = useFormState(serverAction, { error: '' })

  return (
    <form action={action} className={classes.form}>
      <input name={'email'} />
      <input name={'password'} type={'password'} />
      <SubmitButton>{'auth'}</SubmitButton>
      {state?.error}
    </form>
  )
}

export default SignInForm
