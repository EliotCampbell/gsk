import React, { FC } from 'react'
import classes from './Logo.module.css'
import Link from 'next/link'

const Logo: FC<{ title: string; redirectTo?: string }> = ({
  title,
  redirectTo = '/'
}) => {
  return (
    <Link href={redirectTo} className={classes.logo}>
      {title}
    </Link>
  )
}

export default Logo
