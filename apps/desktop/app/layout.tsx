import '@repo/ui/dist/index.css'

import SiteHeader from '@desktop/components/site-header'
import Authnticated from '@desktop/helpers/authenticated'
import RefreshToken from '@desktop/helpers/refresh-token'
import StoreProvider from '@desktop/provider/storeProvider'

import { Toaster } from '@repo/ui/src/core/toaster'
import { cn } from '@repo/ui/src/lib/utils'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head />

        <body className={cn('bg-background min-h-screen font-sans antialiased')}>
          <RefreshToken />

          <div vaul-drawer-wrapper="">
            <div className="bg-background relative flex min-h-screen flex-col">
              <Authnticated>
                <SiteHeader />
                <main className="container flex-1">{children}</main>
              </Authnticated>
            </div>
            <Toaster />
          </div>
        </body>
      </html>
    </StoreProvider>
  )
}
