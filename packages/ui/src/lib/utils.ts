import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ThemeProvider } from './theme'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { ThemeProvider }
