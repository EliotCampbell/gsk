import React from 'react'
import classes from './NewsCard.module.css'
import ReactMarkdown from 'react-markdown'

const NewsCard: React.FC<{ news: ISingleNews }> = ({ news }) => {
  return (
    <div className={classes.NewsCard}>
      <div className={classes.cardWrapper}>
        <div className={classes.origin}>
          <div className={classes.originPicture} />
          <p className={classes.author}>{news.user_id}</p>
          <p className={classes.timestamp}>
            {news.created_at.toLocaleString()}
          </p>
        </div>
        <p className={classes.title}>{news.title}</p>
        <div className={classes.body}>
          <ReactMarkdown>{news.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
