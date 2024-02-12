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

const UserSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const { exists, isLoading } = useAppSelector(
    (state) => ({
      exists: state.auth.exists,
      isLoading: state.auth.isLoading
    }),
    shallowEqual
  )

  return isLoading ? (
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
        <Link href={'/auth'}>
          <button className={classes.loginButton} type={'button'}>
            ВОЙТИ
          </button>
        </Link>
      )}
    </div>
  )
}

export default UserSection
