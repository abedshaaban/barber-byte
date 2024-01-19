'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import { FilledHeart, Heart, HorizontalDots } from '@repo/ui/icons'

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
        <div className="flex w-full flex-row gap-2">
          <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>{0}</span>
            <Button
              variant={'ghost'}
              size={'icon'}
              // onClick={handleLike}
            >
              {'likesCount'.length > 0 ? (
                <FilledHeart className={'h-6 w-6'} />
              ) : (
                <Heart className={'h-6 w-6'} />
              )}
            </Button>
          </div>

          <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>0</span>
            <Button variant={'ghost'} size={'icon'}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>

          <div className="flex w-[95px] flex-row items-center justify-center gap-[6px]">
            <span>0</span>
            <Button variant={'ghost'} size={'icon'}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.50003C5 8.32845 4.32843 9.00003 3.5 9.00003C2.67157 9.00003 2 8.32845 2 7.50003C2 6.6716 2.67157 6.00003 3.5 6.00003C4.32843 6.00003 5 6.6716 5 7.50003ZM5.71313 8.66388C5.29445 9.45838 4.46048 10 3.5 10C2.11929 10 1 8.88074 1 7.50003C1 6.11931 2.11929 5.00003 3.5 5.00003C4.46048 5.00003 5.29445 5.54167 5.71313 6.33616L9.10424 4.21671C9.03643 3.98968 9 3.74911 9 3.50003C9 2.11932 10.1193 1.00003 11.5 1.00003C12.8807 1.00003 14 2.11932 14 3.50003C14 4.88074 12.8807 6.00003 11.5 6.00003C10.6915 6.00003 9.97264 5.61624 9.51566 5.0209L5.9853 7.22738C5.99502 7.31692 6 7.40789 6 7.50003C6 7.59216 5.99502 7.68312 5.9853 7.77267L9.51567 9.97915C9.97265 9.38382 10.6915 9.00003 11.5 9.00003C12.8807 9.00003 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5C9 11.2509 9.03643 11.0104 9.10425 10.7833L5.71313 8.66388ZM11.5 5.00003C12.3284 5.00003 13 4.32846 13 3.50003C13 2.6716 12.3284 2.00003 11.5 2.00003C10.6716 2.00003 10 2.6716 10 3.50003C10 4.32846 10.6716 5.00003 11.5 5.00003ZM13 11.5C13 12.3285 12.3284 13 11.5 13C10.6716 13 10 12.3285 10 11.5C10 10.6716 10.6716 10 11.5 10C12.3284 10 13 10.6716 13 11.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
        </div>

        <p className="w-full px-1 text-start text-sm text-gray-600">{'caption'}</p>
      </CardFooter>
    </Card>
  )
}
