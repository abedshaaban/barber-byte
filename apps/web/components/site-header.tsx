'use client'

import { usePathname } from 'next/navigation'

import Header from '@repo/ui/header'

export default function SiteFooter({ metaData }: { metaData: any }) {
  const pathname = usePathname()
  const excludePaths: string[] = []

  if (excludePaths.includes(pathname)) {
    return null
  }

  return (
    <>
      <Header metaData={metaData} lang={metaData.lang} authText={metaData.authText} />
    </>
  )
}
