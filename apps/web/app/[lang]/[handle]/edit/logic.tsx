'use client'

import Link from 'next/link'
import type { UserType } from '@repo/helpers/types'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

export default function Logic({ handle }: { handle: string; editText: any }) {
  const user = useSelector((state: RootState) => state.user.user)

  if (user?.handle !== handle) {
    return (
      <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
        <h1 className={'text-3xl md:text-5xl'}>( • ᴖ • ｡) Page Not Found</h1>

        <p>
          Page is not found. Go{' '}
          <Link href={`/`} className={'underline'}>
            to home
          </Link>
        </p>
      </div>
    )
  }

  return <div>user {user?.handle}</div>
}
