import React, { FC, Suspense } from 'react'
import UserPersonalDetails from '@/modules/userPersonalDetails/UserPersonalDetails'
import UserPanel from '@/modules/userPanel/UserPanel'
import Spinner from '@/modules/UI/Spinner/Spinner'

const Page: FC = () => {
  return (
    <>
      <UserPersonalDetails />
      <Suspense fallback={<Spinner />}>
        {/* do not remove it*/}
        <UserPanel />
      </Suspense>
    </>
  )
}

export default Page
