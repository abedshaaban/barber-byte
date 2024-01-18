import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProfileByHandle } from '@repo/helpers/account'
import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Logic from './logic'

export async function generateMetadata({
  params
}: {
  params: { handle: string }
}): Promise<Metadata> {
  const handle = params.handle.substring(3)

  const data = await getProfileByHandle({
    handle: handle
  })

  let meta = {}

  if (data?.status === true) {
    if (data?.data?.role === 'shop') {
      meta = {
        title: `${data?.data?.shop_name} Location`
      }
    }
  }

  return meta
}

export default async function Page({
  params
}: {
  params: { handle: string; lang: Locale }
}) {
  const handle = params.handle.substring(3)
  const { register } = await getDictionary(params.lang)
  const data = await getProfileByHandle({ handle: handle })

  if (data?.status === false || data?.error?.length > 0) {
    notFound()
  }

  return (
    <>
      <Logic
        handle={handle}
        lang={params.lang}
        navigationText={register}
        profile={data?.data}
      />
    </>
  )
}
