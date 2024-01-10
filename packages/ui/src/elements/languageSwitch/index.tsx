'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@repo/ui/select'

import { i18n } from '../../../../../i18n.config'

export default function Index() {
  const [localValue, setLocalValue] = useState<string | undefined>('')
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  useEffect(() => {
    if (pathName) {
      const segments = pathName.split('/')
      setLocalValue(segments[1])
    }
  }, [])

  return (
    <Select value={localValue}>
      <SelectTrigger className="w-[100px]">
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
          {i18n.locales.map((locale) => {
            return (
              <Link href={redirectedPathName(locale)} key={locale}>
                <SelectItem value={locale} className="cursor-pointer">
                  {locale.toUpperCase()}
                </SelectItem>
              </Link>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
