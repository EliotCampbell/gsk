import React, { FC } from 'react'
import UserPersonalDetails from '@/modules/userPersonalDetails/UserPersonalDetails'
import UserPanel from '@/modules/userPanel/UserPanel'

const Page: FC = () => {
  return (
    <>
      <UserPersonalDetails />
      <UserPanel />
    </>
  )
}

export default Page
