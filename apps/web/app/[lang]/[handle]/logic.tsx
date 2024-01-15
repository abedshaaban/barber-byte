'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfileByHandle } from '@repo/helpers/account'
import { Logout } from '@repo/helpers/auth'
import type { UserType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import type { RootState } from '@web/provider/store'
import { logoutUser } from '@web/provider/userSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button, buttonVariants } from '@repo/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@repo/ui/dialog'

export default function Logic({
  handle,
  lang,
  navigationText
}: {
  handle: string
  lang: Locale
  navigationText: any
}) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const [profile, setProfile] = useState<UserType | null>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function getUserData() {
    const data = await getProfileByHandle({ handle: handle })

    if (data?.status === true) {
      setProfile(await data?.data)
    }
  }

  useEffect(() => {
    async function getData() {
      await getUserData()
    }

    getData()
  }, [])

  async function handleLogout() {
    dispatch(logoutUser())
    await Logout()

    setIsDialogOpen(false)
  }

  return (
    <section className={'flex flex-col'}>
      <div
        className={
          'flex flex-col items-center justify-start gap-9 border-b-2 pb-9 sm:flex-row'
        }
      >
        <Avatar className={'aspect-square h-48 w-48'}>
          <AvatarImage
            src={profile?.img_url}
            alt={'user profile picture'}
            className={'object-cover object-center'}
          />

          <AvatarFallback>
            {profile?.role === 'user'
              ? profile?.first_name[0]
              : profile?.role === 'shop'
                ? profile?.shop_name[0]
                : null}
          </AvatarFallback>
        </Avatar>

        <div className={'flex w-full max-w-96 flex-col gap-3'}>
          <div>
            <h1 className={'text-xl font-bold md:text-3xl'}>
              {profile?.role === 'user' ? (
                <>
                  {profile?.first_name} {profile?.last_name}
                </>
              ) : profile?.role === 'shop' ? (
                <>{profile?.shop_name}</>
              ) : null}
            </h1>

            <h2 className={'text-base text-neutral-500 md:text-2xl'}>
              @{profile?.handle}
            </h2>

            {profile?.role === 'shop' ? (
              <p className={'text-neutral-500'}>
                {profile.country}, {profile.city}, {profile.street}
              </p>
            ) : null}
          </div>

          <p>
            {profile?.description === null
              ? navigationText.nodescription
              : profile?.description}
          </p>

          {user?.handle === profile?.handle ? (
            <>
              <Link
                href={`/${lang}/@${user?.handle}/edit`}
                className={buttonVariants({ variant: 'outline' })}
              >
                {navigationText.editProfile}
              </Link>

              <Dialog open={isDialogOpen}>
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setIsDialogOpen(true)
                  }}
                >
                  <Button variant={'destructive'}>Logout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to logout from your account?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className={'flex w-full flex-row justify-between'}>
                    <Button
                      type="button"
                      variant={'secondary'}
                      onClick={() => {
                        setIsDialogOpen(false)
                      }}
                    >
                      Close
                    </Button>

                    <Button type="submit" variant={'destructive'} onClick={handleLogout}>
                      Logout
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
