import React from 'react'
import PublicationCard from '@/modules/publications/components/PublicationCard/PublicationCard'
import classes from './PublicationsList.module.css'

const PublicationsList: React.FC<{
  publications: TSinglePublication[] | []
}> = ({ publications }) => {
  return (
    <>
      <h1 className={classes.title}>НОВОСТИ</h1>
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </>
  )
}

export default PublicationsList
