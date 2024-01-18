'use client'

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { Locale } from '@root/i18n.config'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { AspectRatio } from '@repo/ui/aspect-ratio'
import { Button, buttonVariants } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Textarea } from '@repo/ui/textarea'
import { cn } from '@repo/ui/util'

export default function Logic({ lang }: { lang: Locale }) {
  const reduxUser = useSelector((state: RootState) => state.user)
  const user = reduxUser?.user
  const [previewImage, setpreviewImage] = useState('')
  const [PostData, setPostData] = useState<{ caption: string; img_url: File | null }>({
    caption: '',
    img_url: null
  })

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
            <AspectRatio ratio={1 / 1} className={'bg-muted'}>
              {PostData?.img_url ? (
                <img
                  src={previewImage}
                  alt="post image"
                  className={'h-full w-full object-cover object-center'}
                />
              ) : (
                <img src={'/images/assets/500x500.jpg'} alt="default image" />
              )}
            </AspectRatio>

            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="message">Caption (optional)</Label>
              <Textarea
                placeholder={'Caption'}
                id="message"
                maxLength={255}
                className={cn('cursor-pointer bg-white dark:bg-neutral-800')}
                onChange={(e) => {
                  setPostData((prev) => {
                    return { ...prev, caption: e.target.value }
                  })
                }}
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
                onChange={(e) => {
                  setPostData((prev) => {
                    return {
                      ...prev,
                      img_url:
                        e.target.files && e.target.files[0] ? e.target.files[0] : null
                    }
                  })

                  if (e.target.files && e.target.files[0]) {
                    setpreviewImage(URL.createObjectURL(e.target.files[0]))
                  }
                }}
              />
            </div>
          </div>

          {PostData.caption}

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
