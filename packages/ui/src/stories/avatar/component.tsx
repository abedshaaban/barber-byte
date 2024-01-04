import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '../../avatar'

type Props = {
  url: string
  fallback: string
}

export default function Index({ url = '', fallback }: Props) {
  return (
    <Avatar>
      <AvatarImage src={url} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
