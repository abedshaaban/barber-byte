import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { UserType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import { getProfileByHandle } from '@root/packages/helpers/src/account'
import { getDictionary } from '@web/lib/dictionary'

import Logic from './logic'

export async function generateMetadata({
  params
}: {
  params: { handle: string }
}): Promise<Metadata> {
  const handle = params.handle.substring(3)

  const { data: user, status }: { status: boolean; data: UserType; message: string } =
    await getProfileByHandle({
      handle: handle
    })

  let meta = {}

  if (status === true) {
    if (user?.role === 'user') {
      meta = {
        title: `${user.first_name} ${user.last_name}`,
        description: user.description
      }
    } else if (user?.role === 'shop') {
      meta = {
        title: user.shop_name,
        description: user.description
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
  const { navigation } = await getDictionary(params.lang)
  const data = await getProfileByHandle({ handle: handle })

  if (data?.status === false) {
    notFound()
  }

  return (
    <>
      <Logic
        handle={handle}
        lang={params.lang}
        navigationText={navigation}
        profile={data?.data}
      />
    </>
  )
}
