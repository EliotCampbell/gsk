import React, { FC } from 'react'
import UserPersonalDetails from '@/modules/userPanel/UserPersonalDetails'
import UserPanel from '@/modules/userPersonalDetails/UserPanel'

const Page: FC = () => {
  return (
    <>
      <UserPersonalDetails />
      <UserPanel />
    </>
  )
}

export default Page
