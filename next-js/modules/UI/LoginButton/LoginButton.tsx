import React, { FC } from 'react'
import Link from 'next/link'
import classes from './LoginButton.module.css'

const LoginButton: FC<{ redirectTo: string }> = ({ redirectTo }) => {
  return (
    <Link href={redirectTo}>
      <button className={classes.loginButton} type={'button'}>
        ВОЙТИ
      </button>
    </Link>
  )
}

export default LoginButton
