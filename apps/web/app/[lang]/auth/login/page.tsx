import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Logic from './logic'

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { register, auth: authText } = await getDictionary(params.lang)
  return (
    <section className={'flex min-h-[calc(100vh-60px)] items-center justify-center'}>
      <Logic params={params} register={register} authText={authText} />
    </section>
  )
}
