import '@repo/ui/dist/index.css'

import { cn } from '@repo/ui/src/lib/utils'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />

      <body className={cn('bg-background min-h-screen font-sans antialiased')}>
        <div vaul-drawer-wrapper="">
          <div className="bg-background relative flex min-h-screen flex-col">
            <main className="container flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}