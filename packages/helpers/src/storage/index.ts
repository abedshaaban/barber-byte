type LocalStorageProps = {
  key: string
  value?: string | undefined
}

export function Storage({ key, value }: LocalStorageProps) {
  if (value) {
    localStorage?.setItem(key, value)
  } else {
    const data = localStorage?.getItem(key)
    return data
  }
}

export function ClearStorage() {
  localStorage?.clear()
}
