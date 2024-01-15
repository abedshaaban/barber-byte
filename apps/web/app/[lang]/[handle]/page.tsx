import type { Metadata } from 'next'
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

  const { data: user }: { data: UserType } = await getProfileByHandle({
    handle: handle
  })

  let meta = {}

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

  return meta
}

export default async function Page({
  params
}: {
  params: { handle: string; lang: Locale }
}) {
  const handle = params.handle.substring(3)
  const { navigation } = await getDictionary(params.lang)

  return (
    <>
      <Logic handle={handle} lang={params.lang} navigationText={navigation} />
    </>
  )
}
