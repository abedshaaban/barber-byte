'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { UserType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import type { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { Button } from '@repo/ui/button'

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

  useEffect(() => {
    if (user?.handle === handle) {
      setProfile(user)
    }
  }, [user])

  return (
    <>
      {!profile ? (
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
        <section className={'flex flex-col gap-9'}>
          {navigationText.barberLocation.location}
          <div className={'flex w-full flex-row items-center justify-start'}>
            <Link href={`/${lang}/@${handle}`}>
              <Button>{navigationText.back}</Button>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
