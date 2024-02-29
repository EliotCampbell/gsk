'use client'
import React, { FC, ReactNode } from 'react'
import classes from './TabBar.module.css'
import { TabBarOptionType } from '@/modules/UI/TabBar/types'

const TabBar: FC<{
  options: Array<TabBarOptionType>
  selected: string
  clickHandler: (url: string) => void
  children: ReactNode
}> = ({ options, selected, clickHandler, children }) => {
  return (
    <>
      <div className={classes.TabBar}>
        {options.map((el) => (
          <div
            onClick={() => clickHandler(el.url)}
            className={
              selected === el.url
                ? `${classes.singleTab_selected} ${classes.singleTab}`
                : classes.singleTab
            }
            key={el.title}
          >
            {el.title}
          </div>
        ))}
      </div>
      {children && <div className={classes.TabBarBody}>{children}</div>}
    </>
  )
}

export default TabBar
