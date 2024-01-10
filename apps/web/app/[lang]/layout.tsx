import '@repo/ui/styles.css'

import type { Metadata } from 'next'
import { i18n, Locale } from '@root/i18n.config'
import SiteFooter from '@web/components/site-footer'
import SiteHeader from '@web/components/site-header'
import { getDictionary } from '@web/lib/dictionary'

import { cn, ThemeProvider } from '@repo/ui/util'

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const { home } = await getDictionary(params.lang)

  return {
    title: {
      template: `%s | Barber Byte`,
      default: 'Barber Byte'
    },
    description: home.metadata.description,
    // metadataBase: new URL(siteConfig.url),
    keywords: home.metadata.keywords,
    authors: home.metadata.authors,
    // creator: '',
    // openGraph: {
    //   type: 'website',
    //   locale: 'en_US',
    //   url: siteConfig.url,
    //   title: siteConfig.name,
    //   description: siteConfig.description,
    //   siteName: siteConfig.name,
    //   images: [
    //     {
    //       url: siteConfig.ogImage,
    //       width: 1200,
    //       height: 630,
    //       alt: siteConfig.name
    //     }
    //   ]
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: siteConfig.name,
    //   description: siteConfig.description,
    //   images: [siteConfig.ogImage],
    //   creator: '@'
    // },
    icons: {
      icon: '/icons/favicon.ico',
      shortcut: '/icons/favicon-16x16.png',
      apple: '/icons/apple-touch-icon.png'
    }
    // manifest: `${siteConfig.url}/site.webmanifest`
  }
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
