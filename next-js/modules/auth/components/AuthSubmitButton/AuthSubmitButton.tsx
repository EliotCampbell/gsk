'use client'

import React from 'react'
import classes from './AuthSubmitButton.module.css'
import { useFormStatus } from 'react-dom'
import Spinner from '@/modules/UI/Spinner/Spinner'

const AuthSubmitButton: React.FC<{ children: string }> = ({ children }) => {
  const { pending } = useFormStatus()
  return (
    <button className={classes.button} type="submit" aria-disabled={pending}>
      {pending ? <Spinner /> : children}
    </button>
  )
}

export default AuthSubmitButton
