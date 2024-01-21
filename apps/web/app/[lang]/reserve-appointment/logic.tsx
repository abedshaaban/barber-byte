'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

export default function Logic({
  reservationTextTranslation
}: {
  reservationTextTranslation: any
}) {
  const user = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <section className={'flex w-full justify-center py-9'}>
      {!user ? (
        <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
          <h1 className={'text-2xl md:text-5xl'}>( • ᴖ • ｡) Page Not Found</h1>

          <p>
            Page is not found. Go{' '}
            <Link href={`/`} className={'underline'}>
              to home
            </Link>
          </p>
        </div>
      ) : loading ? (
        <div className={'pb-3 text-center'}>{reservationTextTranslation.loading}</div>
      ) : (
        <form></form>
      )}
    </section>
  )
}
