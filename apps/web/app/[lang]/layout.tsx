import '@repo/ui/styles.css'

import type { Metadata } from 'next'
import { i18n, Locale } from '@root/i18n.config'
import SiteFooter from '@web/components/site-footer'
import SiteHeader from '@web/components/site-header'

import { cn, ThemeProvider } from '@repo/ui/util'

export const metadata: Metadata = {
  title: {
    template: `%s | Barber Byte`,
    default: 'Barber Byte'
  },
  description: ''
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head />

      <body className={cn('bg-background min-h-screen font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper="">
            <div className="bg-background relative flex min-h-screen flex-col">
              <SiteHeader params={params} />
              <main className="container flex-1">{children}</main>
              <SiteFooter params={params} />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
