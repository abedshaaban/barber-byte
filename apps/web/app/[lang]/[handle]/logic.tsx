'use client'

import { useEffect, useState } from 'react'
import { getProfileByHandle } from '@repo/helpers/account'
import type { UserType } from '@repo/helpers/types'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'

export default function Logic({ handle }: { handle: string }) {
  const [profile, setProfile] = useState<UserType | null>()

  async function getUserData() {
    const data = await getProfileByHandle({ handle: handle })

    if (data?.status === true) {
      setProfile(await data?.data)
      console.log(data?.data)
    }
  }

  useEffect(() => {
    async function getData() {
      await getUserData()
    }

    getData()
  }, [])

  return (
    <section className={'flex flex-col pb-3'}>
      <div
        className={
          'flex flex-col items-center justify-start gap-9 border-b-2 sm:flex-row'
        }
      >
        <Avatar className={'aspect-square h-48 w-48'}>
          <AvatarImage
            src={profile?.img_url}
            alt={'user profile picture'}
            className={'object-cover object-center'}
          />

          <AvatarFallback>
            {profile?.role === 'user'
              ? profile?.first_name[0]
              : profile?.role === 'shop'
                ? profile?.shop_name[0]
                : null}
          </AvatarFallback>
        </Avatar>

        <div className={'flex w-full max-w-96 flex-col gap-3'}>
          <div>
            <h1 className={'text-xl font-bold md:text-3xl'}>
              {profile?.role === 'user' ? (
                <>
                  {profile?.first_name} {profile?.last_name}
                </>
              ) : profile?.role === 'shop' ? (
                <>{profile?.shop_name}</>
              ) : null}
            </h1>

            <h2 className={'text-base text-neutral-500 md:text-2xl'}>
              @{profile?.handle}
            </h2>

            {profile?.role === 'shop' ? (
              <p className={'text-neutral-500'}>
                {profile.country}, {profile.city}, {profile.street}
              </p>
            ) : null}
          </div>

          <p>{profile?.description === null ? 'No description' : profile?.description}</p>

          <Button variant={'secondary'} size={'sm'}>
            Edit profile
          </Button>
        </div>
      </div>
    </section>
  )
}
