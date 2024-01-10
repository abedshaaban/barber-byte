import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Header from '@repo/ui/header'

export default async function SiteFooter({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { header: metaData } = await getDictionary(lang)

  return (
    <>
      <Header metaData={metaData} lang={metaData.lang} authText={metaData.authText} />
    </>
  )
}
