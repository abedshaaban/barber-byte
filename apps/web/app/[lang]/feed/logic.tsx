'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPosts } from '@repo/helpers/account'
import type { PostType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import Post from '@web/components/post'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { buttonVariants } from '@repo/ui/button'
import { cn } from '@repo/ui/util'

export default function Logic({ lang }: { lang: Locale }) {
  const user = useSelector((state: RootState) => state.user)
  const [pageNumber, setPageNumber] = useState<{ currentPage: number; lastPage: number }>(
    { currentPage: 1, lastPage: 1 }
  )
  const [posts, setPosts] = useState<PostType[] | []>([])
  const [loading, setLoading] = useState(true)

  async function getData() {
    setLoading(true)

    if (pageNumber.currentPage <= pageNumber.lastPage) {
      const res = await getPosts({ page: pageNumber.currentPage })

      if (res?.data?.data !== '') {
        const newData = [...posts, ...(res?.data?.data || [])]

        setPosts(newData)

        setPageNumber({
          lastPage: res?.data?.last_page,
          currentPage: pageNumber.currentPage + 1
        })
      }
    }

    setLoading(false)
  }

  async function runFunc() {
    await getData()
  }

  useEffect(() => {
    runFunc()
  }, [])

  useEffect(() => {
    function isInViewport(element: any) {
      const rect = element.getBoundingClientRect()

      return (
        rect.bottom - (window.innerHeight || document.documentElement.clientHeight) < 600
      )
    }

    const handleScroll = () => {
      const targetDiv = document?.getElementById('trigger-new-fetch')

      if (targetDiv) {
        if (isInViewport(targetDiv) && posts.length > 0) {
          if (!loading) {
            runFunc()
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [posts, loading])

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
            profile_url={item.profile_url}
          />
        )
      })}

      {loading ? (
        'loading ...'
      ) : !user?.user ? (
        <Link
          href={`/${lang}/auth/login`}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'w-full min-w-80 max-w-96'
          )}
        >
          Login to see more
        </Link>
      ) : (
        <div id={'trigger-new-fetch'} className={'h-1 w-full'}></div>
      )}
    </div>
  )
}
