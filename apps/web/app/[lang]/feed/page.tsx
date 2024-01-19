import { Locale } from '@root/i18n.config'

import Logic from './logic'

export default function page({ params }: { params: { lang: Locale } }) {
  return (
    <section className={'flex justify-center py-9'}>
      <Logic lang={params.lang} />
    </section>
  )
}
