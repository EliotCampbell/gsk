import React, { FC, InputHTMLAttributes } from 'react'
import classes from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
}

const Input: FC<InputProps> = ({ children, label, error, ...props }) => {
  return (
    <div className={classes.inputContainer}>
      {label && <label className={classes.label}>{label}</label>}
      <input
        className={`${classes.input} ${error && classes.input_error}`}
        {...props}
      />
    </div>
  )
}

export default Input
