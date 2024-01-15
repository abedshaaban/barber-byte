'use client'

import { useEffect } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'

export default function page({ params }: { params: { handle: string } }) {
  const handle = params.handle.substring(3)

  useEffect(() => {
    console.log(handle)
  }, [])

  return (
    <section className={''}>
      <div>
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

        <div>
          <h1>First Name</h1>
          <p>Last Name</p>
        </div>
      </div>
    </section>
  )
}
