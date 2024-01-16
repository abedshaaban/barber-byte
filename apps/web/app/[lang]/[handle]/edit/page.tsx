import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Logic from './logic'

export default async function page({
  params
}: {
  params: { handle: string; lang: Locale }
}) {
  const handle = params.handle.substring(3)
  const { register } = await getDictionary(params.lang)

  return (
    <section className={'flex w-full justify-center'}>
      <Logic handle={handle} register={register} lang={params?.lang} />
    </section>
  )
}
