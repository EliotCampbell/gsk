import React, { FC, Suspense } from 'react'
import LastNews from '@/modules/mainPage/components/LastNews/LastNews'
import Greeting from '@/modules/mainPage/components/Greeting/Greeting'
import { getPublications } from '@/serverServices/supabase/server/publications'
import Spinner from '@/modules/UI/Spinner/Spinner'

const MainPage: FC = async () => {
  const publications = await getPublications()
  return (
    <>
      <Greeting />
      <Suspense fallback={<Spinner />}>
        <LastNews news={publications} />
      </Suspense>
    </>
  )
}

export default MainPage
