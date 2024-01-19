'use client'

import { useEffect, useState } from 'react'
import { getPosts } from '@repo/helpers/account'
import type { PostType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import Post from '@web/components/post'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

export default function Logic({ lang }: { lang: Locale }) {
  const user = useSelector((state: RootState) => state.user)
  const [pageNumber, setPageNumber] = useState<{ currentPage: number; lastPage: number }>(
    { currentPage: 1, lastPage: 1 }
  )
  const [posts, setPosts] = useState<PostType[] | []>([])

  async function getData() {
    if (pageNumber.currentPage <= pageNumber.lastPage) {
      const res = await getPosts({ page: pageNumber.currentPage })

      if (res?.data?.data !== '') {
        const newData = [...posts, ...(res?.data?.data || [])]

        setPosts(newData)

        setPageNumber({
          currentPage: res?.data?.current_page,
          lastPage: res?.data?.last_page
        })
      }

      console.log(res)
    }
  }

  useEffect(() => {
    const runFunc = async () => {
      await getData()
    }

    runFunc()
  }, [])

  return (
    <div className={'flex w-full flex-col items-center justify-center gap-9'}>
      {posts?.map((item, index) => {
        return (
          <Post
            user={user?.user}
            key={index}
            lang={lang}
            caption={item.caption}
            created_at={item.created_at}
            creator_id={item.creator_id}
            first_name={item.first_name}
            handle={item.handle}
            img_url={item.img_url}
            last_name={item.last_name}
            likes_count={item.likes_count}
            name={item.name}
            uuid={item.uuid}
          />
        )
      })}
    </div>
  )
}
