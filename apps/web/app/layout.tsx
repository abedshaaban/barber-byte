import '@repo/ui/styles.css'

import type { Metadata } from 'next'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-background min-h-screen font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper="">
            <div className="bg-background relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="container flex-1">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
