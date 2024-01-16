import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Logic from './logic'

export default async function page({
  params
}: {
  params: { handle: string; lang: Locale }
}) {
  const handle = params.handle.substring(3)
  const { navigation } = await getDictionary(params.lang)

  return (
    <>
      <Logic handle={handle} editText={navigation} />
    </>
  )
}
