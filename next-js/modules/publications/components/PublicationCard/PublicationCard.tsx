import React from 'react'
import classes from './PublicationCard.module.css'
import Markdown from 'react-markdown'
import Link from 'next/link'

const PublicationCard: React.FC<{ publication: TSinglePublication }> = ({
  publication
}) => {
  return (
    <div className={classes.NewsCard}>
      <div className={classes.cardWrapper}>
        <div className={classes.origin}>
          <Link
            href={`/user/${publication.user_id}`}
            className={classes.originPicture}
          />
          <Link
            className={classes.author}
            href={`/user/${publication.user_id}`}
          >
            {`${publication.user_name} ${publication.user_surname}` ||
              publication.username}
          </Link>
          <p className={classes.timestamp}>
            {new Intl.DateTimeFormat('ru-RU', {
              dateStyle: 'short',
              timeStyle: 'medium'
            }).format(new Date(publication.created_at))}
          </p>
        </div>
        <Link href={`/publication/${publication.id}`} className={classes.title}>
          {publication.title}
        </Link>
        <div className={classes.body}>
          <Markdown>{publication.body}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default PublicationCard
