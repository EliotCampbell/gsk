import React from 'react'

const Home = async () => {
  /*  const check = async () => {
    'use server'
    const supabase = createSupabaseServerClient()
    console.log(
      await supabase.auth.getSession().then((data) => data.data.session?.user)
    )
  }*/

  return (
    <>
      <form action={''}>
        <button>check</button>
      </form>
    </>
  )
}

export default Home
