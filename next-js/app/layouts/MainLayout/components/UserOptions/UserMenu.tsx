'use client'
import React, { FC } from 'react'
import classes from './UserOptions.module.css'
import LoginButton from '@/modules/UI/LoginButton/LoginButton'
import Link from 'next/link'

const UserMenu: FC<{ sigOutHandler: () => {} }> = ({ sigOutHandler }) => {
  return (
    <div className={classes.userOptions}>
      <Link className={classes.option} href={'/user'}>
        {'ПРОФИЛЬ'}
      </Link>
      <Link
        href={'/auth'}
        onClick={() => sigOutHandler()}
        className={classes.option}
      >
        {'ВЫХОД'}
      </Link>
    </div>
  )
}

export default UserMenu
