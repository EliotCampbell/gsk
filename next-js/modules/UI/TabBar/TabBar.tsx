'use client'
import React, { FC } from 'react'
import classes from './TabBar.module.css'
import { TabBarOptionType } from '@/modules/UI/TabBar/types'
import Link from 'next/link'

const TabBar: FC<{
  options: Array<TabBarOptionType>
  selectedTab: string
  linkCreator: (arg: string) => string
}> = ({ options, selectedTab, linkCreator }) => {
  return (
    <div className={classes.TabBar}>
      {options.map((el) => (
        <Link
          href={linkCreator(el.optionType)}
          className={
            selectedTab === el.optionType
              ? `${classes.singleTab_selected} ${classes.singleTab}`
              : classes.singleTab
          }
          key={el.title}
        >
          {el.title}
        </Link>
      ))}
    </div>
  )
}

export default TabBar
