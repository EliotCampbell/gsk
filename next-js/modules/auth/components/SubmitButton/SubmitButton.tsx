'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton: React.FC<{ children: string }> = ({ children }) => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      {children + (pending ? ' ...' : '')}
    </button>
  )
}

export default SubmitButton
