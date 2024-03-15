import React, { ReactNode } from 'react'
import classes from './Header.module.css'
import Link from 'next/link'
import Logo from '@/layouts/mainLayout/components/Logo/Logo'

type MenuItemType = {
  type: string
  title: string
  path: string
  ico: ReactNode
}

const Header: React.FC<{
  menuItems: MenuItemType[]
  title: string
  children: ReactNode
}> = ({ menuItems, title, children }) => {
  const renderMenu = (menuItems: MenuItemType[]): ReactNode =>
    menuItems.map((item) => (
      <Link href={item.path} className={classes.menuItem} key={item.path}>
        <div className={classes.ico}>{item.ico}</div>
        <p className={classes.menuItemText}>{item.title}</p>
      </Link>
    ))

  const headerMenu = renderMenu(menuItems)

  return (
    <div className={classes.Header}>
      <div className={classes.wrapper}>
        <Logo title={title} />
        <div className={classes.menu}>
          {headerMenu}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Header
