'use client'

import Link from 'next/link'
import { Locale } from '@root/i18n.config'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { Button, buttonVariants } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Textarea } from '@repo/ui/textarea'
import { cn } from '@repo/ui/util'

export default function Logic({ lang }: { lang: Locale }) {
  const reduxUser = useSelector((state: RootState) => state.user)
  const user = reduxUser?.user

  return (
    <section className={'flex w-full justify-center py-9'}>
      {!user ? (
        <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
          <h1 className={'text-2xl md:text-5xl'}>( • ᴖ • ｡) Page Not Found</h1>

          <p>
            Page is not found. Go{' '}
            <Link href={`/`} className={'underline'}>
              to home
            </Link>
          </p>
        </div>
      ) : (
        <form className={'flex w-full max-w-sm flex-col gap-9'}>
          <div className={'flex w-full flex-col gap-6'}>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="message">Caption</Label>
              <Textarea
                placeholder={'Caption'}
                id="message"
                maxLength={255}
                className={cn('cursor-pointer bg-white dark:bg-neutral-800')}
              />
            </div>

            <div className="grid w-full max-w-sm gap-1.5">
              <Label>Post </Label>
              <Input
                type="file"
                className={cn(
                  'w-full max-w-56 cursor-pointer bg-white dark:bg-neutral-800'
                )}
                accept=".jpg, .jpeg, .png, .webp"
                required
              />
            </div>
          </div>

          <div className={'flex w-full flex-row items-center justify-between'}>
            <Link
              href={`/${lang}`}
              className={cn(buttonVariants({ variant: 'secondary' }), '')}
            >
              cancel
            </Link>

            <Button type={'submit'}>post</Button>
          </div>
        </form>
      )}
    </section>
  )
}
