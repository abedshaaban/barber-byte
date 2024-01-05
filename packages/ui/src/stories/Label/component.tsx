import React from 'react'

import { Label } from '../../label'

type Props = {
  text: string
}

export default function Index({ text }: Props) {
  return <Label>{text}</Label>
}
