import React, { FC } from 'react'
import Link from 'next/link'
import classes from './LoginButton.module.css'

const LoginButton: FC<{ href: string }> = ({ href }) => {
  return (
    <Link href={href}>
      <button className={classes.loginButton} type={'button'}>
        ВОЙТИ
      </button>
    </Link>
  )
}

export default LoginButton
