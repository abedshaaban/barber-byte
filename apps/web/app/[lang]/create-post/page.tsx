import { Locale } from '@root/i18n.config'

import Logic from './logic'

export default function Page({ params }: { params: { handle: string; lang: Locale } }) {
  return (
    <>
      <Logic lang={params.lang} />
    </>
  )
}
