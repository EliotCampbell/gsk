import React from 'react'

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
      {/*      {publications.map((el: ISingleNews) => (
        <NewsCard
          news={{
            title: el.title,
            body: el.body,
            created_at: new Date(el.created_at),
            user_id: el.user_id
          }}
          key={el.id}
        />
      ))}*/}
    </>
  )
}

export default News
