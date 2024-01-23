'use client'

import React from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { UserType } from '@repo/helpers/types'

import { Avatar, AvatarFallback, AvatarImage } from '../../core/avatar'
import { Button } from '../../core/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../core/dropdown-menu'
import { ScrollArea } from '../../core/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '../../core/sheet'
import { Plus } from '../../icons'
import { cn } from '../../lib/utils'
import LanguageSwitch from '../languageSwitch'
import Logo from '../logo.svg'

type NavLink = {
  name: string
  path: string
}

type MobileNavProps = {
  name: string
  img_url?: string
  links?: NavLink[]
  lang: string
}

type MainNavProps = {
  name: string
  img_url?: string
  links?: NavLink[]
  lang: string
}

type HeaderProps = {
  user: UserType | null
  metaData: MainNavProps
  lang: string
  authText: {
    login: string
    register: string
    createPost: string
    reserveAppointment: string
  }
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

function MobileNav({ name, links, lang }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href={`/${lang}`}
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <HamburgerMenuIcon className="mr-2 h-4 w-4" />
          <span className="font-bold">{name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {links?.map((link) => (
              <MobileLink key={link.path} href={link.path} onOpenChange={setOpen}>
                {link.name}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

function MainNav({ name, img_url, links, lang }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden flex-row items-center sm:flex">
      <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
        <img src={img_url ? img_url : Logo} alt={name} className="h-9 w-9 rounded-full" />
        <span className="font-bold">{name}</span>
      </Link>

      <nav className="flex items-center gap-3 space-x-6 text-sm font-medium">
        {links?.map((link) => {
          return (
            <Link
              href={link.path}
              className={cn(
                'hover:text-foreground/80 transition-colors',
                pathname === link.path ? 'text-foreground' : 'text-foreground/60'
              )}
              key={link.path}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default function Index({ user, metaData, lang, authText }: HeaderProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav
          name={metaData?.name}
          links={metaData?.links}
          img_url={metaData?.img_url}
          lang={lang}
        />
        <div className="sm:hidden">
          <MobileNav name={metaData?.name} links={metaData?.links} lang={lang} />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>

          <nav className="flex items-center gap-2">
            <LanguageSwitch />

            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'outline'} size={'icon'}>
                      <Plus />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href={`/${lang}/create-post`}>{authText.createPost}</Link>
                      </DropdownMenuItem>
                      {user?.role === 'user' ? (
                        <>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            <Link href={`/${lang}/reserve-appointment`}>
                              {authText.reserveAppointment}
                            </Link>
                          </DropdownMenuItem>
                        </>
                      ) : null}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href={`/${lang}/@${user?.handle}`}
                  className={'flex h-full items-center'}
                >
                  <Button variant={'link'} className={'rounded-full p-0'}>
                    <Avatar>
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_PROFILE_IMAGES_URL}/${user?.img_url}`}
                        alt={'user profile picture'}
                        className={'object-cover object-center'}
                      />
                      <AvatarFallback
                        className={'flex items-center justify-center text-center'}
                      >
                        {user?.role === 'user'
                          ? user?.first_name[0]
                          : user?.role === 'shop'
                            ? user.shop_name[0]
                            : 'u'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/${lang}/auth/login`}>
                  <Button variant={'outline'}>{authText.login}</Button>
                </Link>

                <Link href={`/${lang}/auth/register`}>
                  <Button variant={'default'}>{authText.register}</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
