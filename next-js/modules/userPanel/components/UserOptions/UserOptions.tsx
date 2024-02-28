'use client'
import React, { FC } from 'react'
import TabBar from '@/modules/UI/TabBar/TabBar'
import { useParams, useRouter } from 'next/navigation'
import MyObjects from '@/modules/userPanel/components/MyObjects/MyObjects'
import MyAds from '@/modules/userPanel/components/MyAds/MyAds'
import TabBarBody from '@/modules/UI/TabBarBody/TabBarBody'

const UserOptions: FC = () => {
  const params = useParams<{ selected: string }>()
  const router = useRouter()
  const handleOptionToUrl = (url: string) => {
    router.replace(url)
  }
  const userOptions = [
    {
      title: 'Мои объекты',
      url: 'my_objects',
      node: <MyObjects objects={{}} />
    },
    { title: 'Мои объявления', url: 'my_ads', node: <MyAds /> }
  ]
  return (
    <>
      <TabBar
        options={userOptions}
        selected={params.selected}
        clickHandler={handleOptionToUrl}
      />
      <TabBarBody>
        {userOptions.find((el) => el.url === params.selected)?.node}
      </TabBarBody>
    </>
  )
}

export default UserOptions
