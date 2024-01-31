'use client'
import React, { useState } from 'react'
import classes from './SignInForm.module.css'
import SubmitButton from '@/modules/auth/components/SubmitButton/SubmitButton'

const SignInForm: React.FC<{ handleSignIn: (formData: FormData) => void }> = ({
  handleSignIn
}) => {
  const [formState, setFormState] = useState({ email: '', password: '' })

  return (
    <form action={handleSignIn} className={classes.form}>
      <p className={classes.title}>ГСК</p>
      <input
        value={formState.email}
        onChange={(event) =>
          setFormState({ ...formState, email: event.target.value })
        }
        name={'email'}
        type={'email'}
        className={classes.input}
        placeholder={'E-mail...'}
      />
      <input
        value={formState.password}
        onChange={(event) =>
          setFormState({ ...formState, password: event.target.value })
        }
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
