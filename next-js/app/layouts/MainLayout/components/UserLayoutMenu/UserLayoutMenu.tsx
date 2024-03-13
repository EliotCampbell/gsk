'use client'
import React, { ReactNode, useState } from 'react'
import classes from './UserLayoutMenu.module.css'
import { FiUser } from 'react-icons/fi'
import Spinner from '@/modules/UI/Spinner/Spinner'

const UserLayoutMenu: React.FC<{
  signOut: () => {}
  sessionExists: boolean
  pending: boolean
  menuComponent: ReactNode
}> = ({ signOut, sessionExists, pending, menuComponent }) => {
  const [showMenu, setShowMenu] = useState(false)

  return pending ? (
    <Spinner />
  ) : (
    <div className={classes.section}>
      <div className={classes.smallItem} onClick={() => setShowMenu(!showMenu)}>
        <FiUser className={classes.ico} />
        {sessionExists && <div className={classes.indicator}></div>}
      </div>
      {showMenu && menuComponent}
    </div>
  )
}

export default UserLayoutMenu
