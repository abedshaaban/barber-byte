import React from 'react'

import { Progress } from '../../../core/progress'

type Props = {
  value: number
}

export default function Index({ value }: Props) {
  return <Progress value={value} className="w-40" />
}
