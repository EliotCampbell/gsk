import React, { ReactNode } from 'react'
import classes from './Header.module.css'
import Link from 'next/link'
import { FiUser } from 'react-icons/fi'

interface IMenuItem {
  type: string
  title: string
  path: string
  ico?: ReactNode
}

interface IHeaderProps {
  menuItems: IMenuItem[]
  title: string
}

const renderMenu = (menuItems: IMenuItem[]): ReactNode =>
  menuItems.map((item) => (
    <Link href={item.path} className={classes.menuItem} key={item.path}>
      <div>{item.ico}</div>
      <p className={classes.menuItemText}>{item.title}</p>
    </Link>
  ))

const user: IMenuItem = {
  title: 'ПОЛЬЗОВАТЕЛЬ',
  ico: <FiUser className={classes.ico} />,
  path: '/auth',
  type: 'user'
}

const Header: React.FC<IHeaderProps> = ({ menuItems, title }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.wrapper}>
        <Link href={'/'} className={classes.logo}>
          {title}
        </Link>
        <div className={classes.menu}>
          {renderMenu(menuItems)}
          <Link href={user.path} className={classes.userItem} key={user.path}>
            <div>{user.ico}</div>
            <p className={classes.menuItemText}>{user.title}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
