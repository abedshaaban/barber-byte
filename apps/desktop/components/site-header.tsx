'use client'

import Link from 'next/link'
import { Logout, NEXT_PUBLIC_PROFILE_IMAGES_URL } from '@desktop/helpers'
import { RootState } from '@desktop/provider/store'
import { logoutUser } from '@desktop/provider/userSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/dropdown-menu'

export default function SiteHeader() {
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  async function handleLogout() {
    dispatch(logoutUser())
    await Logout()
  }

  return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>

          <nav className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'link'} className={'rounded-full p-0'}>
                  <Avatar>
                    {user?.img_url && (
                      <AvatarImage
                        src={`${NEXT_PUBLIC_PROFILE_IMAGES_URL}/${user?.img_url}`}
                        alt={'user profile picture'}
                        className={'object-cover object-center'}
                        loading={'lazy'}
                      />
                    )}
                    <AvatarFallback
                      className={'flex items-center justify-center text-center'}
                    >
                      {user?.role === 'admin'
                        ? user?.first_name[0]
                        : user?.role === 'shop'
                          ? user.shop_name[0]
                          : 'u'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem className={'cursor-pointer'}>
                    <Link href={`/${user?.role}`} className={'w-full'}>
                      Home
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className={'cursor-pointer'}>
                    <Link href={`/profile`} className={'w-full'}>
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className={'cursor-pointer bg-red-100'}
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
