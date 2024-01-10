import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import Footer from '@repo/ui/footer'

export default async function SiteFooter({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { footer: metaData } = await getDictionary(lang)

  return (
    <>
      <Footer metaData={metaData} />
    </>
  )
}
