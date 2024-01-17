'use client'

import { usePathname } from 'next/navigation'

import Footer from '@repo/ui/footer'

export default function SiteFooter({ metaData }: { metaData: any }) {
  const pathname = usePathname()
  const excludePathsPattern = /^(\/(en|ar|zh_HANS)\/@[\w-]+(\/(register|login|edit))?)$/

  const excludePaths: string[] = [
    '/en/auth/register',
    '/ar/auth/register',
    '/zh_HANS/auth/register',
    '/en/auth/login',
    '/ar/auth/login',
    '/zh_HANS/auth/login'
  ]

  if (excludePaths.includes(pathname) || excludePathsPattern.test(pathname)) {
    return null
  }

  return (
    <>
      <Footer metaData={metaData} />
    </>
  )
}
