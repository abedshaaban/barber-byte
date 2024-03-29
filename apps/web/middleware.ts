import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLoacale } from '@formatjs/intl-localematcher'
import { i18n } from '@root/i18n.config'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  let locale = ''

  try {
    locale = matchLoacale(languages, locales, i18n.defaultLocale)
  } catch (error) {
    locale = i18n.defaultLocale
  }

  return locale
}

const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export default middleware

export const config = {
  matcher: ['/((?!api|icons|images|_next/static|_next/image|favicon.ico).*)']
}
