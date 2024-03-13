'use client'
import React, { FC } from 'react'
import TabBar from '@/modules/UI/TabBar/TabBar'
import { TabBarOptionType } from '@/modules/UI/TabBar/types'
import { getMyObjects } from '@/clientServices/redux/features/objects/objectsSlice'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { useSearchParams } from 'next/navigation'
import TabBarBody from '@/modules/UI/TabBarBody/TabBarBody'
import UserAdsPanel from '@/modules/userPersonalDetails/components/UserAdsPanel/UserAdsPanel'
import UserObjectsPanel from '@/modules/userPersonalDetails/components/UserObjectsPanel/UserObjectsPanel'
import { getAdsByUser } from '@/clientServices/redux/features/ads/adsSlice'
import { useQueryCreator } from '@/hooks/useQueryCreator'
import {
  deleteServiceById,
  getServicesByUser
} from '@/clientServices/redux/features/services/servicesSlice'
import {
  myAdsSelector,
  myObjectsSelector,
  myServicesSelector
} from '@/modules/UserPanel/selectors'
import IAmMaster from '@/modules/userPersonalDetails/components/IAmMaster/IAmMaster'
import { STATUS } from '@/types/statusTypes'

const UserPanel: FC = () => {
  const dispatch = useAppDispatch()

  const adsData = useAppSelector(myAdsSelector)
  const objectsData = useAppSelector(myObjectsSelector)
  const servicesData = useAppSelector(myServicesSelector)

  const userOptions: TabBarOptionType[] = [
    {
      title: 'Мои объекты',
      optionType: 'my_objects',
      node: (
        <UserObjectsPanel
          objects={objectsData.myObjects}
          pending={objectsData.status === STATUS.pending}
          getData={() => dispatch(getMyObjects())}
        />
      )
    },
    {
      title: 'Мои объявления',
      optionType: 'my_ads',
      node: (
        <UserAdsPanel
          ads={adsData.myAds}
          pending={adsData.status === STATUS.pending}
          getData={() => dispatch(getAdsByUser())}
        />
      )
    },
    {
      title: 'Я - Мастер',
      optionType: 'im_master',
      node: (
        <IAmMaster
          services={servicesData.myServices}
          pending={servicesData.myServicesStatus === STATUS.pending}
          getData={() => dispatch(getServicesByUser())}
          deleteService={(id: string) =>
            dispatch(deleteServiceById(id)).then((data) => {
              console.log(data)
            })
          }
        />
      )
    }
  ]

  const selectedTab = useSearchParams().get('selected_tab') || ''

  return (
    <>
      <TabBar
        options={userOptions}
        selectedTab={selectedTab}
        linkCreator={useQueryCreator('selected_tab')}
      />
      <TabBarBody>
        {userOptions.find((option) => selectedTab === option.optionType)?.node}
      </TabBarBody>
    </>
  )
}
export default UserPanel
