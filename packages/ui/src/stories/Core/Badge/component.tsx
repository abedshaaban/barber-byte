import React from 'react'

import { Badge } from '../../../badge'

type Props = {
  text: string
  variant: 'default' | 'secondary' | 'destructive' | 'outline' | null | undefined
}

export default function Index({ variant = 'default', text }: Props) {
  return <Badge variant={variant}>{text}</Badge>
}
