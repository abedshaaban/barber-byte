'use client'

import { useEffect, useState } from 'react'
import Post from '@desktop/components/post'
import { GetShopPosts } from '@desktop/helpers'

export default function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getReservations() {
      const res = await GetShopPosts()

      console.log(res)
      setPosts(res.data)
    }

    getReservations()
  }, [])

  return (
    <section className={'flex w-full flex-col justify-start pt-6'}>
      <h1 className={'text-2xl font-semibold'}>Posts</h1>

      <div className={'flex flex-wrap justify-evenly gap-3 py-9'}>
        {posts?.map((item: any, index) => {
          return (
            <Post
              uuid={item.uuid}
              caption={item.caption}
              img_url={item.img_url}
              likes_count={item.likes_count}
              creator_id={item.creator_id}
              created_at={item.created_at}
              handle={item.creator.handle}
              first_name={item.creator.first_name}
              last_name={item.creator.last_name}
              name={item.creator.name}
              profile_url={item.creator.img_url}
            />
          )
        })}
      </div>
    </section>
  )
}
