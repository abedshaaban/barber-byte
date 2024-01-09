import '@repo/ui/styles.css'

import type { Metadata } from 'next'
import SiteHeader from '@web/components/site-header'

import { cn } from '@repo/ui/util'

export const metadata: Metadata = {
  title: {
    template: `%s | Barber Byte`,
    default: 'Barber Byte'
  },
  description: ''
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('bg-background min-h-screen font-sans antialiased')}>
        <div vaul-drawer-wrapper="">
          <div className="bg-background relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
