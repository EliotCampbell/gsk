import React from 'react'
import classes from './PublicationCard.module.css'
import Markdown from 'react-markdown'
import Link from 'next/link'
import Image from 'next/image'
import ImagePlaceholder from '@/modules/UI/ImagePlaceholder/ImagePlaceholder'

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
          >
            {publication.author.profile_image ? (
              <Image
                className={classes.profileImg}
                src={'https://' + publication.author.profile_image}
                alt={'User profile image'}
                fill
              />
            ) : (
              <ImagePlaceholder
                str={publication.author.name || publication.author.username}
              />
            )}
          </Link>
          <Link
            className={classes.author}
            href={`/user/${publication.user_id}`}
          >
            {`${publication.author.name} ${publication.author.surname}` ||
              publication.author.username}
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
