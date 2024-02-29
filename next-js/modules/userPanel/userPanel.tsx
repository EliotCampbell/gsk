'use client'
import React, { FC, lazy, Suspense } from 'react'
import UserInfo from '@/modules/userPanel/components/UserInfo/UserInfo'
import { useAppDispatch, useAppSelector } from '@/clientServices/redux/hooks'
import { userPrivateDataSelector } from '@/modules/userPanel/selectors'
import { useParams, useRouter } from 'next/navigation'
import TabBar from '@/modules/UI/TabBar/TabBar'
import { getAdsByUser } from '@/clientServices/redux/features/ads/adsSlice'
import { getMyObjects } from '@/clientServices/redux/features/objects/objectsSlice'
import Spinner from '@/modules/UI/Spinner/Spinner'

const MyObjects = lazy(() => {
  return import('@/modules/userPanel/components/MyObjects/MyObjects')
})

const MyAds = lazy(() => {
  return import('@/modules/userPanel/components/MyAds/MyAds')
})

const UserPanel: FC = () => {
  const { userPrivateData, pending } = useAppSelector(userPrivateDataSelector)
  const params = useParams<{ selected: string }>()
  const dispatch = useAppDispatch()
  const ads = useAppSelector((state) => state.ads.ads)
  const objects = useAppSelector((state) => state.objects.myObjects)

  const userOptions = [
    {
      title: 'Мои объекты',
      url: 'my_objects',
      node: (
        <MyObjects
          objects={{}}
          dataUploadFunction={() => dispatch(getMyObjects())}
          pending={objects.pending}
        />
      )
    },
    {
      title: 'Мои объявления',
      url: 'my_ads',
      node: (
        <MyAds
          ads={{}}
          dataUploadFunction={() => dispatch(getAdsByUser(userPrivateData.id))}
          pending={ads.pending}
        />
      )
    }
  ]

  const router = useRouter()
  const handleOptionToUrl = (url: string) => {
    router.replace(url)
  }

  return (
    <>
      <UserInfo userInfo={userPrivateData} pending={pending} />(
      <TabBar
        options={userOptions}
        selected={params.selected}
        clickHandler={handleOptionToUrl}
      >
        {userPrivateData.id && (
          <Suspense fallback={<Spinner />}>
            {userOptions.find((el) => el.url === params.selected)?.node}
          </Suspense>
        )}
      </TabBar>
    </>
  )
}

export default UserPanel
