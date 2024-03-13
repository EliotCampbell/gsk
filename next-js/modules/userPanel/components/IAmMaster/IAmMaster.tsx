'use client'
import React, { FC } from 'react'
import { ServiceType } from '@/modules/userPanel/types'
import BecomeMaster from '@/modules/userPanel/components/BecomeMaster/BecomeMaster'
import AlreadyMaster from '@/modules/userPanel/components/AlreadyMaster/AlreadyMaster'
import { useLayoutInit } from '@/hooks/useLayoutInit'
import Spinner from '@/modules/UI/Spinner/Spinner'

const IAmMaster: FC<{
  services: ServiceType[]
  pending: boolean
  getData: () => {}
  deleteService: (id: string) => {}
}> = ({ services, pending, getData, deleteService }) => {
  useLayoutInit(getData)

  return pending ? (
    <Spinner />
  ) : services.length > 0 ? (
    <AlreadyMaster services={services} deleteServiceHandler={deleteService} />
  ) : (
    <BecomeMaster />
  )
}

export default IAmMaster
