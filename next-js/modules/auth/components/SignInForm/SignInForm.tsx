'use client'
import React, { useState } from 'react'
import classes from './SignInForm.module.css'
import AuthSubmitButton from '@/modules/auth/components/AuthSubmitButton/AuthSubmitButton'
import Input from '@/modules/UI/Input/Input'

const SignInForm: React.FC<{ handleSignIn: (formData: FormData) => void }> = ({
  handleSignIn
}) => {
  const [formState, setFormState] = useState({ email: '', password: '' })

  return (
    <form action={handleSignIn} className={classes.form}>
      <p className={classes.title}>ГСК</p>
      <Input
        value={formState.email}
        onChange={(event) =>
          setFormState({ ...formState, email: event.target.value })
        }
        name={'email'}
        type={'email'}
        placeholder={'E-mail...'}
      />
      <Input
        value={formState.password}
        onChange={(event) =>
          setFormState({ ...formState, password: event.target.value })
        }
        name={'password'}
        type={'password'}
        placeholder={'Password...'}
      />
      <AuthSubmitButton>{'ВОЙТИ'}</AuthSubmitButton>
    </form>
  )
}

export default SignInForm
