import React, { FC, Suspense } from 'react'
import UserPersonalDetails from '@/modules/userPanel/UserPersonalDetails'
import UserPanel from '@/modules/userPersonalDetails/UserPanel'

const Page: FC = () => {
  return (
    <>
      <UserPersonalDetails />
      <Suspense>
        <UserPanel />
      </Suspense>
    </>
  )
}

export default Page
