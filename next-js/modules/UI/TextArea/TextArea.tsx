import React, { FC, TextareaHTMLAttributes } from 'react'
import classes from './TextArea.module.css'

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  counter?: { min?: number; max?: number }
  value: string
  error?: boolean
}

const TextArea: FC<ITextAreaProps> = ({
  label,
  children,
  counter,
  error,
  value,
  ...props
}) => {
  return (
    <div className={classes.textAreaContainer}>
      {label && <label className={classes.label}>{label}</label>}
      <textarea
        className={`${classes.textArea} ${error && classes.textArea_error}`}
        value={value}
        {...props}
      >
        {children}
      </textarea>
      {counter && (
        <div className={classes.counter}>{` ${value.length} / ${
          counter.min && `минимум: ${counter.min}`
        }`}</div>
      )}
    </div>
  )
}

export default TextArea
