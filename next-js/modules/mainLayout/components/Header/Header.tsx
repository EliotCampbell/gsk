import React, { ReactNode } from 'react'
import classes from './Header.module.css'
import Link from 'next/link'
import UserSection from '@/modules/mainLayout/components/UserSection/UserSection'

type TMenuItem = {
  type: string
  title: string
  path: string
  ico: ReactNode
}

type THeaderProps = {
  menuItems: TMenuItem[]
  title: string
}

const renderMenu = (menuItems: TMenuItem[]): ReactNode =>
  menuItems.map((item) => (
    <Link href={item.path} className={classes.menuItem} key={item.path}>
      <div className={classes.ico}>{item.ico}</div>
      <p className={classes.menuItemText}>{item.title}</p>
    </Link>
  ))

const Header: React.FC<THeaderProps> = ({ menuItems, title }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.wrapper}>
        <Link href={'/'} className={classes.logo}>
          {title}
        </Link>
        <div className={classes.menu}>
          {renderMenu(menuItems)}
          <UserSection />
        </div>
      </div>
    </div>
  )
}

export default Header
