'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { UserType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import type { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { buttonVariants } from '@repo/ui/button'
import Map from '@repo/ui/map'
import { cn } from '@repo/ui/util'

export default function Logic({
  handle,
  lang,
  navigationText,
  profile: initial_profile
}: {
  handle: string
  lang: Locale
  navigationText: any
  profile: UserType | null
}) {
  const user = useSelector((state: RootState) => state.user.user)
  const [profile, setProfile] = useState<UserType | null>(initial_profile)
  function emptyFunc(_: any) {}

  useEffect(() => {
    if (user?.handle === handle) {
      setProfile(user)
    }
  }, [user])

  return (
    <>
      {!profile || profile?.role !== 'shop' ? (
        <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
          <h1 className={'text-2xl md:text-5xl'}>( • ᴖ • ｡) Location Not Found</h1>

          <p>
            Location page is not found. Go{' '}
            <Link href={`/`} className={'underline'}>
              to home
            </Link>
          </p>
        </div>
      ) : (
        <section
          className={'flex min-h-[80vh] flex-col items-center justify-center gap-9'}
        >
          <h1 className={'w-full text-center'}>
            {navigationText.barberLocation.location}
          </h1>

          <Map
            updateState={emptyFunc}
            location={JSON.parse(profile?.location as unknown as string)}
          />

          <Link
            href={`/${lang}/@${handle}`}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full min-w-80 max-w-96'
            )}
          >
            {navigationText.back}
          </Link>
        </section>
      )}
    </>
  )
}
