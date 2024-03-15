'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { signOut } from '@/clientServices/redux/features/auth/authSlice'
import { shallowEqual } from 'react-redux'
import UserLayoutMenu from '@/layouts/mainLayout/components/UserLayoutMenu/UserLayoutMenu'
import { STATUS } from '@/types/statusTypes'
import UserMenu from '@/layouts/mainLayout/components/UserOptions/UserMenu'

const UserSection = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const signOutHandler = () => dispatch(signOut()).then(() => router.push('/'))
  const { sessionExists, status } = useAppSelector(
    (state) => ({
      sessionExists: !!state.auth.sessionData.session.access_token,
      status: state.auth.sessionData.status
    }),
    shallowEqual
  )

  const menu = <UserMenu sigOutHandler={signOutHandler} />

  return (
    <UserLayoutMenu
      pending={status === STATUS.pending}
      sessionExists={sessionExists}
      menuComponent={menu}
    />
  )
}

export default UserSection
