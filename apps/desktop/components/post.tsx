'use client'

import {
  NEXT_PUBLIC_POST_IMAGES_URL,
  NEXT_PUBLIC_PROFILE_IMAGES_URL
} from '@desktop/helpers'
import type { PostType, UserType } from '@repo/helpers/types'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import { FilledHeart, Heart, HorizontalDots, ShareBubble } from '@repo/ui/icons'

export default function Post({
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
  shares_count
}: PostType) {
  return (
    <Card className="w-full max-w-[400px]">
      {/* user info */}
      <CardHeader className="pb-2">
        <div className="flex w-full flex-row items-center gap-3">
          <div>
            <Avatar>
              {profile_url !== null && (
                <AvatarImage
                  src={`${NEXT_PUBLIC_PROFILE_IMAGES_URL}/${profile_url}`}
                  className={'object-cover object-center'}
                  loading={'lazy'}
                />
              )}
              <AvatarFallback>
                {name ? name[0] : first_name ? first_name[0] : ''}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex h-full w-full flex-col items-start text-start">
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
          </div>
        </div>
      </CardHeader>

      {/* img */}
      <CardContent className="pb-1">
        <div className="max-h-[400px] max-w-[400px]">
          {img_url && (
            <img
              src={`${NEXT_PUBLIC_POST_IMAGES_URL}/${img_url}`}
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
            <span>{likes_count}</span>
            <Button variant={'ghost'} size={'icon'}>
              <Heart className={'h-6 w-6'} />
            </Button>
          </div>

          <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>{shares_count || 0}</span>
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
