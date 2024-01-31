'use client'
import React from 'react'
import Link from 'next/link'
import classes from '@/modules/mainLayout/components/Header/Header.module.css'
import { FiUser } from 'react-icons/fi'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { signOut } from '@/lib/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'

const SmallMenuItems: React.FC = () => {
  const dispatch = useAppDispatch()
  const select = useAppSelector((state) => state.auth)
  return (
    <>
      <Link
        href={select.exists ? '/user' : '/auth'}
        className={classes.smallItem}
      >
        <FiUser className={classes.ico} />
      </Link>
      {select.exists && (
        <button
          onClick={() => {
            dispatch(signOut())
          }}
          className={classes.smallItem}
        >
          <BsFillDoorOpenFill className={classes.ico} />
        </button>
      )}
    </>
  )
}

export default SmallMenuItems
