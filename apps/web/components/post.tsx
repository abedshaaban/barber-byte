'use client'

import { useState } from 'react'
import Link from 'next/link'
import { togglePostLike } from '@repo/helpers/account'
import type { PostType, UserType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import {
  ChatBubble,
  FilledHeart,
  Heart,
  HorizontalDots,
  ShareBubble
} from '@repo/ui/icons'

export default function Post({
  user,
  caption,
  created_at,
  creator_id,
  first_name,
  handle,
  img_url,
  last_name,
  likes_count,
  name,
  uuid,
  profile_url,
  lang
}: PostType & { lang: Locale; user: UserType | null }) {
  const [loading, setLoading] = useState(false)
  const [likes, setLikes] = useState<{
    count: number
    isLiked: boolean
  }>({
    count: likes_count,
    isLiked: false
  })

  async function handleLike() {
    setLoading(true)
    const res = await togglePostLike({ post_id: uuid })
    console.log(res)
    if (res.status === true) {
      setLikes((prev) => {
        return {
          count: res?.data?.is_liked ? prev.count + 1 : prev.count - 1,
          isLiked: res?.data?.is_liked
        }
      })
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-[400px]">
      {/* user info */}
      <CardHeader className="pb-2">
        <div className="flex w-full flex-row items-center gap-3">
          <Link href={`/${lang}/@${handle}`}>
            <Avatar>
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${profile_url}`}
                className={'object-cover object-center'}
              />
              <AvatarFallback>
                {name ? name[0] : first_name ? first_name[0] : ''}
              </AvatarFallback>
            </Avatar>
          </Link>

          <Link
            href={`/${lang}/@${handle}`}
            className="flex h-full w-full flex-col items-start text-start"
          >
            <span className="">
              {name ? (
                name
              ) : (
                <>
                  {first_name} {last_name}
                </>
              )}
            </span>

            <span className="text-xs text-gray-600">
              {new Date(created_at).toLocaleString()}
            </span>
          </Link>

          {user && user?.handle === handle ? (
            <Button variant={'ghost'} size={'icon'}>
              <HorizontalDots className={'h-7 w-7 dark:fill-white'} />
            </Button>
          ) : null}
        </div>
      </CardHeader>

      {/* img */}
      <CardContent className="pb-1">
        <div className="max-h-[400px] max-w-[400px]">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${img_url}`}
            alt={caption || 'post'}
            className={'h-[350px] w-full object-cover object-center'}
          />
        </div>
      </CardContent>

      {/* caption, likes, ... */}
      <CardFooter className="flex flex-col justify-start">
        <div className="flex w-full flex-row justify-evenly gap-2">
          <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>{likes.count}</span>
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={handleLike}
              disabled={loading}
            >
              {likes.isLiked ? (
                <FilledHeart className={'h-6 w-6'} />
              ) : (
                <Heart className={'h-6 w-6'} />
              )}
            </Button>
          </div>

          {/* <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>0</span>
            <Button variant={'ghost'} size={'icon'}>
              <ChatBubble className={'h-6 w-6'} />
            </Button>
          </div> */}

          <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>0</span>
            <Button variant={'ghost'} size={'icon'}>
              <ShareBubble className={'h-6 w-6'} />
            </Button>
          </div>
        </div>

        <p className="w-full px-1 text-start text-sm text-gray-600">{caption}</p>
      </CardFooter>
    </Card>
  )
}
