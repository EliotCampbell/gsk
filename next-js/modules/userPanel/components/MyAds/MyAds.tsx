'use client'
import React, { FC, useEffect } from 'react'
import { AdType } from '@/modules/userPanel/types'
import Spinner from '@/modules/UI/Spinner/Spinner'

const MyAds: FC<{
  ads: AdType | null
  dataUploadFunction: () => void
  pending: boolean
}> = ({ dataUploadFunction, ads, pending }) => {
  useEffect(() => {
    dataUploadFunction()
  }, [])

  return pending ? <Spinner /> : <p>MY ADS</p>
}

export default MyAds
