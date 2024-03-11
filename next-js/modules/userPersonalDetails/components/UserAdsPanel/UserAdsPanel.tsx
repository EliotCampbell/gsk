'use client'
import React, { FC } from 'react'
import SingleAd from '@/modules/userPersonalDetails/components/SingleAd/SingleAd'
import classes from './UserAdsPanel.module.css'
import { AdType } from '@/modules/userPersonalDetails/types'
import { useLayoutInit } from '@/hooks/useLayoutInit'
import Spinner from '@/modules/UI/Spinner/Spinner'

const UserAdsPanel: FC<{
  ads: AdType[]
  pending: boolean
  getData: () => {}
}> = ({ ads, pending, getData }) => {
  useLayoutInit(getData)
  return pending ? (
    <Spinner />
  ) : ads.length > 0 ? (
    ads.map((el) => <SingleAd ad={el} key={el.id} />)
  ) : (
    <div className={classes.fallbackContainer}>
      <p className={classes.fallbackText}> {'Объявления не найдены'}</p>
    </div>
  )
}

export default UserAdsPanel
