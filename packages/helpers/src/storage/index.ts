type LocalStorageProps = {
  key: string
  value?: string | undefined
}

export function LocalStorage({ key, value = undefined }: LocalStorageProps) {
  if (value === undefined) {
    const data = localStorage.getItem(key)
    return data
  } else {
    localStorage.setItem(key, value)
  }
}

export function ClearLocalStorage() {
  localStorage.clear()
}
