'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SharePost, togglePostLike } from '@repo/helpers/account'
import type { PostType, UserType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@repo/ui/drawer'
import { FilledHeart, Heart, HorizontalDots, ShareBubble } from '@repo/ui/icons'

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
  shares_count,
  name,
  uuid,
  profile_url,
  lang
}: PostType & { lang: Locale; user: UserType | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [sharesCount, setSharesCount] = useState<number>(shares_count || 0)
  const [likes, setLikes] = useState<{
    count: number
    isLiked: boolean
  }>({
    count: likes_count,
    isLiked: false
  })

  async function handleLike() {
    if (!user) {
      router.push(`/${lang}/auth/login`)
      return
    }

    setLoading(true)
    const res = await togglePostLike({ post_id: uuid })

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

  async function handleShare(platform: string) {
    if (!user) {
      router.push(`/${lang}/auth/login`)
      return
    }

    setLoading(true)
    const res = await SharePost({ post_id: uuid, platform })

    console.log(res)
    if (res.status === true) {
      setSharesCount(sharesCount + 1)
    }
    setLoading(false)
  }

  const sharePost = [
    {
      name: 'whatsapp',
      link: `https://wa.me/?text=${process.env.NEXT_PUBLIC_DOMAIN_NAME}/post/${uuid}`,
      // link: `whatsapp://send?text=${process.env.NEXT_PUBLIC_DOMAIN_NAME}/post/${uuid}`,
      dataAction: 'share/whatsapp/share',
      img_url: '/images/assets/wa.png'
    },
    {
      name: 'facebook',
      link: `https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_DOMAIN_NAME}/post/${uuid}`,
      dataAction: 'share/whatsapp/share',
      img_url: '/images/assets/fb.png'
    }
  ]

  return (
    <Card className="w-full max-w-[400px]">
      {/* user info */}
      <CardHeader className="pb-2">
        <div className="flex w-full flex-row items-center gap-3">
          <Link href={`/${lang}/@${handle}`}>
            <Avatar>
              {profile_url !== null && (
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_PROFILE_IMAGES_URL}/${profile_url}`}
                  className={'object-cover object-center'}
                  loading={'lazy'}
                />
              )}
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
          {img_url && (
            <img
              src={`${process.env.NEXT_PUBLIC_POST_IMAGES_URL}/${img_url}`}
              alt={caption || 'post'}
              className={'h-[350px] w-full object-cover object-center'}
              loading={'lazy'}
            />
          )}
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

          <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>{sharesCount}</span>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant={'ghost'} size={'icon'}>
                  <ShareBubble className={'h-6 w-6'} />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Share post to:</DrawerTitle>
                  </DrawerHeader>

                  <div className="mx-auto flex w-full max-w-[300px] flex-row gap-3">
                    {sharePost?.map((item, index) => {
                      return (
                        <a
                          href={item.link}
                          data-action={item.dataAction}
                          key={index}
                          target="_blank"
                          onClick={() => {
                            handleShare(item.name)
                          }}
                        >
                          <div className={'h-14 w-14'}>
                            <img
                              src={item.img_url}
                              alt={item.name}
                              className={'h-full w-full'}
                            />
                          </div>
                        </a>
                      )
                    })}
                  </div>

                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <p className="w-full px-1 text-start text-sm text-gray-600">{caption}</p>
      </CardFooter>
    </Card>
  )
}
