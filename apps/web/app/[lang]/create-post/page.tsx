import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Logic from './logic'

export default async function Page({
  params
}: {
  params: { handle: string; lang: Locale }
}) {
  const { createPost } = await getDictionary(params.lang)

  return (
    <>
      <Logic lang={params.lang} createPost={createPost} />
    </>
  )
}
