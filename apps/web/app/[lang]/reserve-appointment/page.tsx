import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Logic from './logic'

export default async function page({ params }: { params: { lang: Locale } }) {
  const { reservation } = await getDictionary(params.lang)

  return (
    <section className={'flex justify-center py-9'}>
      <Logic reservationTextTranslation={reservation} />
    </section>
  )
}
