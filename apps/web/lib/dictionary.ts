import 'server-only'

import type { Locale } from '@root/i18n.config'

const dictionaries = {
  en: () => import('@web/dictionaries/en.json').then((module) => module.default),
  ar: () => import('@web/dictionaries/ar.json').then((module) => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
