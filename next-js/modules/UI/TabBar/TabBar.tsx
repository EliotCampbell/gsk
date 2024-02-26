'use client'
import React, { FC } from 'react'
import classes from './TabBar.module.css'
import { TabBarOptionType } from '@/modules/UI/TabBar/types'

const TabBar: FC<{
  options: Array<TabBarOptionType>
  selected: string
  clickHandler: (url: string) => void
}> = ({ options, selected, clickHandler }) => {
  return (
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
  )
}

export default TabBar
