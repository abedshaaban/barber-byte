'use client'

import { usePathname } from 'next/navigation'

import Footer from '@repo/ui/footer'

export default function SiteFooter({ metaData }: { metaData: any }) {
  const pathname = usePathname()
  const excludePaths = [
    '/en/auth/register',
    '/ar/auth/register',
    '/zh_HANS/auth/register'
  ]

  if (excludePaths.includes(pathname)) {
    return null
  }

  return (
    <>
      <Footer metaData={metaData} />
    </>
  )
}
