import { Locale } from '@root/i18n.config'

import Logic from './logic'

export default function Page({ params }: { params: { lang: Locale } }) {
  return (
    <section className={'flex min-h-[calc(100vh-60px)] items-center justify-center'}>
      <Logic params={params} />
    </section>
  )
}
