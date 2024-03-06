'use client'
import React from 'react'
import Link from 'next/link'
import classes from './UserSection.module.css'
import { FiUser } from 'react-icons/fi'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { signOut } from '@/clientServices/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { shallowEqual } from 'react-redux'
import Spinner from '@/modules/UI/Spinner/Spinner'
import { STATUS } from '@/types/statusTypes'

const UserSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const { exists, status } = useAppSelector(
    (state) => ({
      exists: !!state.auth.sessionData.session.access_token,
      status: state.auth.sessionData.status
    }),
    shallowEqual
  )

  return status === STATUS.pending ? (
    <Spinner />
  ) : (
    <div className={classes.section}>
      {exists ? (
        <>
          <Link href={'/user'} className={classes.smallItem}>
            <FiUser className={classes.ico} />
          </Link>
          <button
            onClick={() => {
              dispatch(signOut())
            }}
            className={classes.smallItem}
          >
            <BsFillDoorOpenFill className={classes.ico} />
          </button>
        </>
      ) : (
        <Link href={'/getUser'}>
          <button className={classes.loginButton} type={'button'}>
            ВОЙТИ
          </button>
        </Link>
      )}
    </div>
  )
}

export default UserSection
