'use client'

import { usePathname } from 'next/navigation'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import Header from '@repo/ui/header'

export default function SiteFooter({ metaData }: { metaData: any }) {
  const user = useSelector((state: RootState) => state.user.user)
  const pathname = usePathname()
  const excludePaths: string[] = []

  if (excludePaths.includes(pathname)) {
    return null
  }

  return (
    <>
      <Header
        metaData={metaData}
        lang={metaData.lang}
        authText={metaData.authText}
        user={user}
      />
    </>
  )
}
