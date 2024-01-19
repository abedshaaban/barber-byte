'use client'

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

export default function Post() {
  return (
    <Card className="w-full max-w-[400px]">
      {/* user info */}
      <CardHeader className="pb-2">
        <div className="flex w-full flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src={''} />
            <AvatarFallback>{'u'}</AvatarFallback>
          </Avatar>

          <div className="flex h-full w-full flex-col items-start text-start">
            <span className="">
              {'first_name'} {'last_name'}
            </span>

            <span className="text-xs text-gray-600">{'created_at'}</span>
          </div>

          <Button variant={'ghost'} size={'icon'}>
            <HorizontalDots className={'h-7 w-7 dark:fill-white'} />
          </Button>
        </div>
      </CardHeader>

      {/* img */}
      <CardContent className="pb-1">
        <div className="max-h-[400px] max-w-[400px]">
          <img src={'PostImage'} alt="" className="h-full w-full" />
        </div>
      </CardContent>

      {/* caption, likes, ... */}
      <CardFooter className="flex flex-col justify-start">
        <div className="flex w-full flex-row justify-evenly gap-2">
          <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>{0}</span>
            <Button
              variant={'ghost'}
              size={'icon'}
              // onClick={handleLike}
            >
              {false ? (
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

        <p className="w-full px-1 text-start text-sm text-gray-600">{'caption'}</p>
      </CardFooter>
    </Card>
  )
}
