import React from 'react'
import { RocketIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from '../../../alert'

type Props = {
  variant: 'default' | 'destructive'
  title: string
  description: string
}

export default function Index({ variant, title, description }: Props) {
  return (
    <Alert variant={variant}>
      <RocketIcon className="h-4 w-4" />

      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
