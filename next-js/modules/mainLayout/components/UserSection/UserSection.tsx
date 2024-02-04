'use client'
import React from 'react'
import Link from 'next/link'
import classes from './UserSection.module.css'
import { FiUser } from 'react-icons/fi'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { signOut } from '@/lib/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'

const UserSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const select = useAppSelector((state) => state.auth)

  return select.isLoading ? (
    <></>
  ) : (
    <div className={classes.section}>
      {select.exists ? (
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
        <button>ВОЙТИ</button>
      )}
    </div>
  )
}

export default UserSection
