import React, { FC, ReactNode } from 'react'
import classes from './TabBarBody.module.css'

const TabBarBody: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={classes.TabBarBody}>{children}</div>
}

export default TabBarBody
