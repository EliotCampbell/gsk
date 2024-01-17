import React from 'react'
import NewsCard from '@/modules/news/components/NewsCard/NewsCard'

const News: React.FC = async () => {
  const publications = await fetch(
    process.env.NEXT_PUBLIC_SUPABASE_URL + 'rest/v1/publications',
    {
      headers: { apikey: '' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
      cache: 'no-cache'
    }
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error.message))

  console.log(publications)

  return (
    <>
      {publications.map((el) => (
        <NewsCard
          news={{
            title: el.title,
            body: el.body,
            date: new Date(el.created_at),
            author: el.user_id
          }}
          key={el.id}
        />
      ))}
    </>
  )
}

export default News
