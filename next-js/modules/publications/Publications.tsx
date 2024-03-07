import React from 'react'
import { publicationsS } from '@/serverServices/supabase/exports'
import PublicationsList from '@/modules/publications/components/PublicationsList/PublicationsList'

const Publications: React.FC = async () => {
  const data = await publicationsS.getPublications()

  const publications = data.map((publication) => ({
    id: publication.id,
    body: publication.body,
    created_at: publication.created_at,
    title: publication.title,
    user_id: publication.user_id,
    publication_images: publication.publication_images,
    author: {
      username: publication.users_profiles?.username || '',
      name: publication.users_profiles?.name,
      surname: publication.users_profiles?.surname,
      profile_image: publication.users_profiles?.profile_image
    }
  }))

  return <PublicationsList publications={publications} />
}

export default Publications
