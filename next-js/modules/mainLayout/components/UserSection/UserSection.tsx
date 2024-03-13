'use client'
import React, { useState } from 'react'
import classes from './UserSection.module.css'
import { FiUser } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { shallowEqual } from 'react-redux'
import Spinner from '@/modules/UI/Spinner/Spinner'
import { STATUS } from '@/types/statusTypes'
import { useRouter } from 'next/navigation'
import UserOptions from '@/modules/mainLayout/components/UserSection/UserOptions/UserOptions'
import { signOut } from '@/clientServices/redux/features/auth/authSlice'

const UserSection: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const signOutHandler = () => dispatch(signOut()).then(() => router.push('/'))
  const { exists, status } = useAppSelector(
    (state) => ({
      exists: !!state.auth.sessionData.session.access_token,
      status: state.auth.sessionData.status
    }),
    shallowEqual
  )

  const [showUserOptions, setShowUserOptions] = useState(false)

  return status === STATUS.pending ? (
    <Spinner />
  ) : (
    <div className={classes.section}>
      <div
        className={classes.smallItem}
        onClick={() => setShowUserOptions(!showUserOptions)}
      >
        <FiUser className={classes.ico} />
        {exists && <div className={classes.indicator}></div>}
      </div>
      {showUserOptions && (
        <UserOptions sigOutHandler={signOutHandler} exists={exists} />
      )}
    </div>
  )
}

export default UserSection
