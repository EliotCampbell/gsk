'use client'
import React, { FC } from 'react'
import SingleAd from '@/modules/userPersonalDetails/components/SingleAd/SingleAd'
import { AdType } from '@/modules/userPanel/types'
import classes from './UserAdsPanel.module.css'
import { STATUS } from '@/types/statusTypes'
import { usePromise } from '@/hooks/usePromise'

const UserAdsPanel: FC<{
  ads: AdType[]
  status: STATUS
  getData: () => {}
}> = ({ ads, status, getData }) => {
  usePromise(getData, status === STATUS.pending)
  return ads.length > 0 ? (
    ads.map((el) => <SingleAd ad={el} key={el.id} />)
  ) : (
    <div className={classes.fallbackContainer}>
      <p className={classes.fallbackText}> {'Объявления не найдены'}</p>
    </div>
  )
}

export default UserAdsPanel