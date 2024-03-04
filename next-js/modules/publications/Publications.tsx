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
    user_id: publication.user_id || '', //todo: remove crutch
    publication_images: publication.publication_images,
    author: publication.users_profiles?.map((profile) => ({
      username: profile.username,
      name: profile.name,
      surname: profile.surname,
      profile_image: profile.profile_image || ''
    }))
  }))

  return <PublicationsList publications={publications} />
}

export default Publications
