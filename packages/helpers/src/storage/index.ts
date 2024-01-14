type LocalStorageProps = {
  key: string
  value?: string | undefined
  remove?: boolean
}

/**
 * Get, set or remove data from local storage
 * @param LocalStorageProps
 */
export function Storage({ key, value, remove = false }: LocalStorageProps) {
  if (value) {
    localStorage?.setItem(key, value)
  } else {
    if (remove) {
      localStorage?.removeItem(key)
      return
    }

    const data = localStorage?.getItem(key)
    return data
  }
}

/**
 * Clear local storage
 */
export function ClearStorage() {
  localStorage?.clear()
}
