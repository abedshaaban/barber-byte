'use client'

import React from 'react'
import Link from 'next/link'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { Button } from '../../core/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../../core/select'
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

          <Select defaultValue={'en'}>
            <SelectTrigger className="w-[126px]">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
                className="w-fit"
              >
                <path
                  fill="currentColor"
                  d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
                ></path>
              </svg>
              <SelectValue placeholder="Select a language" className="w-full" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItem value="en">Engish</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="ch-sm">简体中文</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
