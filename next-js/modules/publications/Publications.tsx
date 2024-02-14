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
    username: publication.users_profiles?.username || 'User not found',
    user_name: publication.users_profiles?.name,
    user_surname: publication.users_profiles?.surname
  }))

  return <PublicationsList publications={publications} />
}

export default Publications
