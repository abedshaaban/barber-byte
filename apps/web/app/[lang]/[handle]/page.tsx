'use client'

import { useEffect } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'

export default function page({ params }: { params: { handle: string } }) {
  const handle = params.handle.substring(3)

  useEffect(() => {
    console.log(handle)
  }, [])

  return (
    <section className={'flex flex-col'}>
      <div className="flex flex-col items-center justify-start gap-9 sm:flex-row">
        <Avatar className={'aspect-square h-48 w-48'}>
          <AvatarImage
            src={
              'https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ftemplate-special-file.png&w=3840&q=75&dpl=dpl_BunKY4WHVEhRe8Fha3GzkLUmjxMN'
            }
            alt={'user profile picture'}
            className={'object-cover object-center'}
          />

          <AvatarFallback>User</AvatarFallback>
        </Avatar>

        <div className={'flex flex-col gap-3'}>
          <div>
            <h1 className={'text-xl font-bold md:text-3xl'}>Full Name</h1>
            <h2 className={'text-base text-neutral-500 md:text-2xl'}>@{handle}</h2>
          </div>
          <p>bio</p>

          <Button variant={'secondary'} size={'sm'}>
            Edit profile
          </Button>
        </div>
      </div>
    </section>
  )
}
