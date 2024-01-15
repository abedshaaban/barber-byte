import type { Metadata } from 'next'
import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Logic from './logic'

export async function generateMetadata({
  params
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const { register } = await getDictionary(params.lang)

  return {
    title: {
      absolute: register.metaData.register.title
    },
    description: register.metaData.register.description
  }
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { register } = await getDictionary(params.lang)

  return (
    <section className={'flex min-h-[calc(100vh-60px)] items-center justify-center'}>
      <Logic params={params} register={register} />
    </section>
  )
}
