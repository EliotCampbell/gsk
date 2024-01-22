'use client'

import React from 'react'
import classes from './SubmitButton.module.css'
import { useFormStatus } from 'react-dom'
import { FiRotateCw } from 'react-icons/fi'

const SubmitButton: React.FC<{ children: string }> = ({ children }) => {
  const { pending } = useFormStatus()

  return (
    <button className={classes.button} type="submit" aria-disabled={pending}>
      {pending ? <FiRotateCw /> : children}
    </button>
  )
}

export default SubmitButton
