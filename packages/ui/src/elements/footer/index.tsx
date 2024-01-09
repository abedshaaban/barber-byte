import React, { useState } from 'react'
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

export default function Index() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }

  return (
    <footer className="bg-white dark:bg-gray-900">
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
            <a href="" className="flex items-center">
              <Button variant={'ghost'} size={'icon'} className="m-4 scale-[2]">
                <img src={Logo} alt="" className="h-9 w-9" />
                <span className="sr-only">barber byte logo</span>
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <p className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Resources
              </p>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href={'/'}
                    className="hover:underline"
                    aria-label="barber byte home page"
                  >
                    Home
                  </a>
                </li>

                <li className="mb-4">
                  <a href={''} className="hover:underline" aria-label="about barber byte">
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={''}
                    className="hover:underline"
                    aria-label="contact barber byte"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Follow us
              </p>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href={'/'}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                    aria-label="github page of barber byte"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Legal
              </p>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href={''} className="hover:underline" aria-label="privacy policy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href={''}
                    className="hover:underline"
                    aria-label="terms & conditions"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />

        <div className="flex w-full flex-col justify-center text-center sm:flex-row sm:items-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{' '}
            <a href="" className="hover:underline" aria-label="barber byte home page">
              Barber Byte
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
