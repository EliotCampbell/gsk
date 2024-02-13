import React from 'react'
import classes from './PublicationCard.module.css'
import { Tables } from '@/types/supabase'
import Markdown from 'react-markdown'

const PublicationCard: React.FC<{ publication: Tables<'publications'> }> = ({
  publication
}) => {
  return (
    <div className={classes.NewsCard}>
      <div className={classes.cardWrapper}>
        <div className={classes.origin}>
          <div className={classes.originPicture} />
          <p className={classes.author}>{publication.user_id}</p>
          <p className={classes.timestamp}>
            {publication.created_at.toLocaleString()}
          </p>
        </div>
        <p className={classes.title}>{publication.title}</p>
        <div className={classes.body}>
          <Markdown>{publication.body}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default PublicationCard
