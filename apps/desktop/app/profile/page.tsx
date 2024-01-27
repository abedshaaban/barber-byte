'use client'

import Link from 'next/link'
import { NEXT_PUBLIC_PROFILE_IMAGES_URL } from '@desktop/helpers'
import type { RootState } from '@desktop/provider/store'
import { useSelector } from 'react-redux'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { buttonVariants } from '@repo/ui/button'
import Map from '@repo/ui/map'

export default function Page() {
  const { user: profile } = useSelector((state: RootState) => state.user)
  function emptyFunc(_: any) {}

  return (
    <section className={'flex flex-col gap-9 py-9'}>
      <div
        className={
          'flex flex-wrap items-center justify-evenly gap-9 border-b-2 pb-9 lg:flex-row'
        }
      >
        <Avatar className={'aspect-square h-48 w-48'}>
          <AvatarImage
            src={`${NEXT_PUBLIC_PROFILE_IMAGES_URL}/${profile?.img_url}`}
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

          <p>{profile?.description === null ? 'no description' : profile?.description}</p>

          {profile?.handle ? (
            <>
              <Link
                href={`/profile/edit`}
                className={buttonVariants({ variant: 'outline' })}
              >
                Edit profile
              </Link>
            </>
          ) : null}
        </div>

        {profile && profile.role === 'shop' && (
          <div className={'w-full max-w-sm'}>
            <Map updateState={emptyFunc} location={profile.location} defaultZoom={18} />
          </div>
        )}
      </div>
    </section>
  )
}
