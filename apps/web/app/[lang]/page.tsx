import Link from 'next/link'
import { Locale } from '@root/i18n.config'
import { getDictionary } from '@web/lib/dictionary'

import { Button } from '@repo/ui/button'
import LayoutTextImage from '@repo/ui/layoutTextImage'

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const { home, auth } = await getDictionary(lang)

  return (
    <div className="ml-[-2rem] mr-[-2rem] flex flex-col gap-9">
      <section className="relative h-[calc(100vh-56px)] max-h-[900px] w-full">
        <div className="absolute left-0 z-0 h-[calc(100vh-56px)] max-h-[900px] w-full">
          <img
            src="/images/home/barbershop.webp"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col-reverse items-center justify-evenly gap-9 bg-[#000000a1] p-9 md:flex-row md:justify-center">
          <div className="flex max-w-[400px] flex-col gap-5 text-white">
            <h1 className="text-3xl font-bold md:text-5xl">{home.hero.title}</h1>
            <p>{home.hero.description}</p>

            <Link href={'/auth/register'}>
              <Button
                variant={'outline'}
                className="w-fit bg-white text-black hover:bg-slate-200 hover:text-black"
              >
                {auth.register}
              </Button>
            </Link>
          </div>

          <div className="h-full max-h-[240px] w-full max-w-[240px]">
            <img
              src="/images/home/haircut.webp"
              alt=""
              className="h-full w-full rounded-[42px] object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* sub hero */}
      <section className="flex w-full justify-center p-3 md:p-9">
        <p className="max-w-[700px] text-center text-2xl">{home.hero.subHero}</p>
      </section>

      {/* client showcase */}
      {home.client.section.map((section, index) => {
        return (
          <LayoutTextImage
            key={section.id}
            title={section.title}
            description={section.description}
            img_url={section.img_url}
            reverse={(index + 1) % 2 === 0}
          />
        )
      })}

      {/* call to action */}
      <section className="flex w-full flex-col items-center justify-center gap-6 border-y-2 p-3  md:flex-row md:p-9">
        <p className="max-w-[700px] text-center text-xl">{home.cta1}</p>

        <Link href={'/auth/register'}>
          <Button className="w-fit">{auth.register}</Button>
        </Link>
      </section>

      {/* barbershop owner showcase */}
      <span className="w-full text-center text-3xl font-bold md:text-5xl">
        {home.barberShop.title}
      </span>

      {home.barberShop.section.map((section, index) => {
        return (
          <LayoutTextImage
            key={section.id}
            title={section.title}
            description={section.description}
            img_url={section.img_url}
            reverse={(index + 1) % 2 !== 0}
          />
        )
      })}

      {/* call to action */}
      <section className="flex w-full flex-col items-center justify-center gap-6 border-y-2 p-3  md:flex-row md:p-9">
        <p className="max-w-[700px] text-center text-xl">{home.cta2}</p>

        <Link href={'/auth/register'}>
          <Button className="w-fit">{auth.register}</Button>
        </Link>
      </section>
    </div>
  )
}
