import { getPostById } from '@repo/helpers/account'
import { Locale } from '@root/i18n.config'

import Logic from './logic'

export default async function page({
  params
}: {
  params: { lang: Locale; post_id: string }
}) {
  const res = await getPostById({ uuid: params.post_id })

  if (res?.status === true) {
    return (
      <section className={'flex justify-center py-9'}>
        <Logic lang={params.lang} post_id={params.post_id} />
      </section>
    )
  } else {
    return (
      <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
        <h1 className={'text-3xl md:text-5xl'}>( • ᴖ • ｡) Post Not Found</h1>

        <p>
          Post page is not found. Go{' '}
          <a href={`/`} className={'underline'}>
            to home
          </a>
        </p>
      </div>
    )
  }
}
