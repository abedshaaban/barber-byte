'use client'

import * as React from 'react'
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
import { Cross } from '@repo/ui/icons'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@repo/ui/navigation-menu'
import { cn } from '@repo/ui/util'

export default function SiteHeader() {
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  async function handleLogout() {
    dispatch(logoutUser())
    await Logout()
  }
  function NavigationMenuDemo() {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Posts</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Beautifully designed components built with Radix UI and Tailwind
                        CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href={`/${user?.role}/reservations`} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Reservations
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }

  const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = 'ListItem'

  return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <NavigationMenuDemo />
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
