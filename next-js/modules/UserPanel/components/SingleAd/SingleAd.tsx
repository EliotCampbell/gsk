'use client'
import React, { FC } from 'react'
import { AdType } from '@/modules/UserPanel/types'
import classes from './SingleAd.module.css'

const SingleAd: FC<{ ad: AdType }> = ({ ad }) => {
  return (
    <div className={classes.SingleAd}>
      <p>{ad.title}</p>
      <p>
        {new Intl.DateTimeFormat('ru-RU', {
          dateStyle: 'short',
          timeStyle: 'medium'
        }).format(ad.created_at)}
      </p>
    </div>
  )
}

export default SingleAd
