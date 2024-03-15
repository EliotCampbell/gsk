'use client'
import React, { ReactNode, useState } from 'react'
import classes from './UserLayoutMenu.module.css'
import { FiUser } from 'react-icons/fi'
import Spinner from '@/modules/UI/Spinner/Spinner'
import LoginButton from '@/modules/UI/LoginButton/LoginButton'

const UserLayoutMenu: React.FC<{
  sessionExists: boolean
  pending: boolean
  menuComponent: ReactNode
}> = ({ sessionExists, pending, menuComponent }) => {
  const [showMenu, setShowMenu] = useState(false)

  return pending ? (
    <Spinner />
  ) : (
    <div className={classes.section}>
      {sessionExists ? (
        <div
          className={classes.smallItem}
          onClick={() => setShowMenu(!showMenu)}
        >
          <FiUser className={classes.ico} />
          {sessionExists && <div className={classes.indicator}></div>}
        </div>
      ) : (
        <LoginButton redirectTo={'/auth'} />
      )}

      {showMenu && menuComponent}
    </div>
  )
}

export default UserLayoutMenu
