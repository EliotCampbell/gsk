import React from 'react'
import { publicationsS } from '@/serverServices/supabase/exports'
import PublicationCard from '@/modules/news/components/PublicationCard/PublicationCard'

export const revalidate = 60

const Publications: React.FC = async () => {
  const publications = await publicationsS.getPublications()

  return (
    <>
      {publications?.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </>
  )
}

export default Publications
