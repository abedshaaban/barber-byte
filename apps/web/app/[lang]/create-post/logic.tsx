'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createPost } from '@repo/helpers/account'
import { Locale } from '@root/i18n.config'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { AspectRatio } from '@repo/ui/aspect-ratio'
import { Button, buttonVariants } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Textarea } from '@repo/ui/textarea'
import { useToast } from '@repo/ui/use-toast'
import { cn } from '@repo/ui/util'

export default function Logic({
  lang,
  createPost: postTextTranslation
}: {
  lang: Locale
  createPost: any
}) {
  const { toast } = useToast()
  const router = useRouter()
  const reduxUser = useSelector((state: RootState) => state.user)
  const user = reduxUser?.user
  const [previewImage, setPreviewImage] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [postData, setPostData] = useState<{ caption: string; img_url: File | null }>({
    caption: '',
    img_url: null
  })

  async function handleUploadPost(e: FormEvent) {
    e.preventDefault()

    setLoading(true)

    if (postData.img_url === null) {
      setErrorMessage('No image uploaded')
      return
    }

    const res = await createPost({ ...postData })

    if (res?.status) {
      toast({
        title: res?.message
      })
      router.push(`/${lang}/feed`)
    } else {
      setErrorMessage(res?.message)
      setLoading(false)
    }
  }

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
      ) : loading ? (
        <div className={'pb-3 text-center'}>{postTextTranslation.loading}</div>
      ) : (
        <form
          onSubmit={handleUploadPost}
          className={'flex w-full max-w-sm flex-col gap-9'}
        >
          <div className={'flex w-full flex-col gap-6'}>
            <AspectRatio ratio={1 / 1} className={'bg-muted'}>
              {postData?.img_url ? (
                <img
                  src={previewImage}
                  alt="post image"
                  className={'h-full w-full object-cover object-center'}
                />
              ) : (
                <img src={'/images/assets/500x500.jpg'} alt="default image" />
              )}
            </AspectRatio>

            <div className={'w-full text-center text-red-600'}>{errorMessage}</div>

            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="message">{postTextTranslation.captionOptional}</Label>
              <Textarea
                placeholder={postTextTranslation.caption}
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
              <Label>{postTextTranslation.post}</Label>
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
                    setPreviewImage(URL.createObjectURL(e.target.files[0]))
                  }
                }}
              />
            </div>
          </div>

          <div className={'flex w-full flex-row items-center justify-between'}>
            <Link
              href={`/${lang}`}
              className={cn(buttonVariants({ variant: 'secondary' }), '')}
            >
              {postTextTranslation.cancel}
            </Link>

            <Button type={'submit'}>{postTextTranslation.post}</Button>
          </div>
        </form>
      )}
    </section>
  )
}
