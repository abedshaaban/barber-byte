'use client'

import React from 'react'
import Link from 'next/link'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { Button } from '../../core/button'
import LanguageSwitch from '../languageSwitch'
import Logo from '../logo.svg'

type NavLink = {
  name: string
  path: string
}

type NavSection = {
  title: string
  links: NavLink[]
}

type LinkProps = {
  name: string
  img_url?: string
  nav?: NavSection[]
}

export type FooterProps = {
  metaData: LinkProps
}

export default function Index({ metaData }: FooterProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }

  return (
    <footer className="dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="mb-9 flex w-full flex-row justify-start gap-3">
          <Button variant="ghost" className="w-9 px-0" onClick={toggleTheme}>
            <MoonIcon className="h-0 w-0 rotate-90 scale-0 transition-all dark:h-[1.2rem] dark:w-[1.2rem] dark:rotate-0 dark:scale-100" />
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:h-0 dark:w-0 dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <LanguageSwitch />
        </div>

        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Button variant={'link'} size={'icon'} className="m-4 scale-[2]">
                <img
                  src={metaData?.img_url ? metaData?.img_url : Logo}
                  alt=""
                  className="h-9 w-9 rounded-full"
                />

                <span className="sr-only">logo</span>
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {metaData?.nav?.map((section) => {
              return (
                <div key={section?.title}>
                  <p className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                    {section?.title}
                  </p>

                  <ul className="font-medium text-gray-500 dark:text-gray-400">
                    {section?.links?.map((link) => {
                      return (
                        <li className="mb-4" key={link?.name}>
                          <Link
                            href={link?.path}
                            className="hover:underline"
                            aria-label="barber byte home page"
                          >
                            {link?.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />

        <div className="flex w-full flex-col justify-center text-center sm:flex-row sm:items-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{' '}
            <Link href="/" className="hover:underline" aria-label="barber byte home page">
              {metaData?.name}
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
