'use client'
import React, { FC } from 'react'
import classes from './UserOptions.module.css'
import LoginButton from '@/modules/UI/LoginButton/LoginButton'
import Link from 'next/link'

const UserOptions: FC<{ sigOutHandler: () => {}; exists: boolean }> = ({
  sigOutHandler,
  exists
}) => {
  return (
    <div className={classes.userOptions}>
      {exists ? (
        <>
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
        </>
      ) : (
        <LoginButton href={'/auth'} />
      )}
    </div>
  )
}

export default UserOptions
