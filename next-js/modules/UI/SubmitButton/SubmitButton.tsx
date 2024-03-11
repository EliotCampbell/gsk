import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import classes from './SubmitButton.module.css'
import { useFormStatus } from 'react-dom'
import Spinner from '@/modules/UI/Spinner/Spinner'

interface ISubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SubmitButton: FC<ISubmitButtonProps> = ({ children, ...props }) => {
  const status = useFormStatus()
  return (
    <button className={classes.SubmitButton} {...props}>
      {status.pending ? <Spinner color={'white'} /> : children}
    </button>
  )
}

export default SubmitButton
