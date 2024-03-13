import React, { FC } from 'react'
import classes from './LastNews.module.css'
import { IPublications } from '@/serverServices/supabase/server/publications'

const LastNews: FC<{ news: IPublications }> = ({ news }) => {
  return (
    <div className={classes.lastNews}>
      <p>Последние новости:</p>
      {news.map((news) => (
        <div className={classes.newsPreview} key={news.id}>
          <p className={classes.title}>{news.title}</p>
        </div>
      ))}
    </div>
  )
}

export default LastNews
