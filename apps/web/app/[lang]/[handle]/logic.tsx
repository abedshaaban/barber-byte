'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getUserPostsByHandle } from '@repo/helpers/account'
import { Logout } from '@repo/helpers/auth'
import type { PostType, UserType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import Post from '@web/components/post'
import type { RootState } from '@web/provider/store'
import { logoutUser } from '@web/provider/userSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button, buttonVariants } from '@repo/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@repo/ui/dialog'
import Map from '@repo/ui/map'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/tabs'

export default function Logic({
  handle,
  lang,
  navigationText,
  profile: initial_profile
}: {
  handle: string
  lang: Locale
  navigationText: any
  profile: UserType | null
}) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const [profile, setProfile] = useState<UserType | null>(initial_profile)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [posts, setPosts] = useState<any[] | []>([])
  function emptyFunc(_: any) {}

  useEffect(() => {
    if (user?.handle === handle) {
      setProfile(user)
    }

    async function getPosts() {
      const res = await getUserPostsByHandle({
        handle: handle
      })

      if (res.status === true) {
        setPosts(res.data)
      }
    }

    getPosts()
  }, [user])

  async function handleLogout() {
    dispatch(logoutUser())
    await Logout()

    setIsDialogOpen(false)
  }

  const DisplayPosts: React.FC = () => {
    return (
      <div className={'flex w-full flex-wrap items-center justify-evenly gap-1'}>
        {posts?.map((item, index) => {
          return (
            <Post
              key={index}
              user={user}
              lang={lang}
              caption={item.caption}
              created_at={item.created_at}
              creator_id={item.creator_id}
              first_name={item.creator.first_name}
              handle={item.creator.handle}
              img_url={item.img_url}
              last_name={item.creator.last_name}
              likes_count={item.likes_count}
              name={profile && profile.role === 'shop' ? profile.shop_name : ''}
              profile_url={item.creator.img_url}
              uuid={item.creator.uuid}
            />
          )
        })}
      </div>
    )
  }

  return (
    <>
      {!profile ? (
        <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
          <h1 className={'text-2xl md:text-5xl'}>( • ᴖ • ｡) User Not Found</h1>

          <p>
            User page is not found. Go{' '}
            <Link href={`/`} className={'underline'}>
              to home
            </Link>
          </p>
        </div>
      ) : (
        <section className={'flex flex-col gap-9'}>
          <div
            className={
              'flex flex-wrap items-center justify-evenly gap-9 border-b-2 pb-9 lg:flex-row'
            }
          >
            <Avatar className={'aspect-square h-48 w-48'}>
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_PROFILE_IMAGES_URL}/${profile?.img_url}`}
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
                      <Button variant={'destructive'}>
                        {navigationText.logout.title}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{navigationText.logout.title}</DialogTitle>
                        <DialogDescription>
                          {navigationText.logout.description}
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
                          {navigationText.close}
                        </Button>

                        <Button
                          type="submit"
                          variant={'destructive'}
                          onClick={handleLogout}
                        >
                          {navigationText.logout.title}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : null}
            </div>

            {profile.role === 'shop' && (
              <div className={'w-full max-w-sm'}>
                <Map
                  updateState={emptyFunc}
                  location={profile.location}
                  defaultZoom={18}
                />
              </div>
            )}
          </div>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="flex w-full flex-row">
              <TabsTrigger value="posts" className={'w-full'}>
                Posts
              </TabsTrigger>

              {profile.role === 'user' ? (
                <TabsTrigger value="reservations" className={'w-full'}>
                  Reservations
                </TabsTrigger>
              ) : null}
            </TabsList>

            <TabsContent value="posts">
              <DisplayPosts />
            </TabsContent>

            {profile.role === 'user' ? (
              <TabsContent value="reservations">2</TabsContent>
            ) : null}
          </Tabs>
        </section>
      )}
    </>
  )
}
