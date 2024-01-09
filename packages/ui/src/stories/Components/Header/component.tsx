import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '../../../core/avatar'
import { Button } from '../../../core/button'
import { cn } from '../../../lib/utils'
import Logo from '../../@assets/logo.svg'

type User = {
  name: string
  img_url: string
}

interface HeaderProps {
  user?: User
}

function MainNav() {
  return (
    <div className="mr-4 flex">
      <a href="/" className="mr-6 flex items-center space-x-2">
        <img src={Logo} alt="" className="h-9 w-9" />
        <span className="hidden font-bold sm:inline-block">Barber Byte</span>
      </a>

      <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
        <a
          href="/"
          className={cn('hover:text-foreground/80 transition-colors', 'text-foreground')}
        >
          Home
        </a>

        <a
          href="/"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            'text-foreground/60'
          )}
        >
          Browse
        </a>
      </nav>
    </div>
  )
}

export default function Index({ user }: HeaderProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>

          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <a
                  href="/"
                  className={cn(
                    'hover:text-foreground/80 flex transition-colors md:hidden',
                    'text-foreground/60'
                  )}
                >
                  Browse
                </a>

                <Button variant={'link'}>
                  <Avatar>
                    <AvatarImage src={user?.img_url} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </>
            ) : (
              <>
                <Button variant={'outline'}>Login</Button>
                <Button variant={'default'}>Register</Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
