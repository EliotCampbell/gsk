'use client'
import React, { FC, Suspense } from 'react'
import TabBar from '@/modules/UI/TabBar/TabBar'
import { TabBarOptionType } from '@/modules/UI/TabBar/types'
import { getMyObjects } from '@/clientServices/redux/features/objects/objectsSlice'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { myAdsSelector, myObjectsSelector } from '@/modules/userPanel/selectors'
import { useSearchParams } from 'next/navigation'
import TabBarBody from '@/modules/UI/TabBarBody/TabBarBody'
import Spinner from '@/modules/UI/Spinner/Spinner'
import UserAdsPanel from '@/modules/userPersonalDetails/components/UserAdsPanel/UserAdsPanel'
import UserObjectsPanel from '@/modules/userPersonalDetails/components/UserObjectsPanel/UserObjectsPanel'
import { getAdsByUser } from '@/clientServices/redux/features/ads/adsSlice'
import { useQueryCreator } from '@/hooks/useQueryCreator'

const UserPanel: FC = () => {
  const dispatch = useAppDispatch()

  const adsData = useAppSelector(myAdsSelector)
  const objectsData = useAppSelector(myObjectsSelector)

  const userOptions: TabBarOptionType[] = [
    {
      title: 'Мои объекты',
      optionType: 'my_objects',
      node: (
        <UserObjectsPanel
          objects={objectsData.myObjects}
          status={objectsData.status}
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
          status={adsData.status}
          getData={() => dispatch(getAdsByUser())}
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
        <Suspense fallback={<Spinner />}>
          {
            userOptions.find((option) => selectedTab === option.optionType)
              ?.node
          }
        </Suspense>
      </TabBarBody>
    </>
  )
}
export default UserPanel
