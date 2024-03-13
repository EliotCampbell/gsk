import React, { FC } from 'react'
import classes from './Footer.module.css'
import Logo from '@/app/layouts/MainLayout/components/Logo/Logo'
const Footer: FC<{ title: string }> = ({ title }) => {
  return (
    <div className={classes.footerWrapper}>
      <div className={classes.footer}>
        <Logo title={title} />
        <p className={classes.footerText}>2024</p>
      </div>
    </div>
  )
}

export default Footer
