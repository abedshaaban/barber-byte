type LocalStorageProps = {
  key: string
  value?: string | undefined
}

export function LocalStorage({ key, value = undefined }: LocalStorageProps) {
  if (value === undefined) {
    localStorage.getItem(key)
  } else {
    localStorage.setItem(key, value)
  }
}
