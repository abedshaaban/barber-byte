'use client'

import { useEffect, useState } from 'react'
import { getPostById } from '@repo/helpers/account'
import type { PostType, UserType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import Post from '@web/components/post'

export default function Logic({ lang, post_id }: { lang: Locale; post_id: string }) {
  const [post, setPost] = useState<PostType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    async function getPost() {
      setErrorMessage('')
      const res = await getPostById({ uuid: post_id })

      if (res.status === true) {
        setPost(res?.data)
      } else {
        setErrorMessage('Error occurred while fetching for post')
      }

      setLoading(false)
    }

    getPost()
  }, [])

  return (
    <div className={'flex w-full justify-center'}>
      {!loading &&
        (errorMessage ? (
          <h1 className={'w-full text-center text-red-500'}>{errorMessage}</h1>
        ) : (
          post && (
            <Post
              user={null}
              lang={lang}
              caption={post.caption}
              created_at={post.created_at}
              creator_id={post.creator_id}
              first_name={post.first_name}
              handle={post.handle}
              img_url={post.img_url}
              last_name={post.last_name}
              likes_count={post.likes_count}
              name={post.name}
              profile_url={post.profile_url}
              uuid={post.uuid}
              shares_count={post.shares_count}
            />
          )
        ))}
    </div>
  )
}
