import React from 'react'
import { FontBoldIcon } from '@radix-ui/react-icons'

import { Toggle } from '../../../toggle'

export default function Index() {
  return (
    <Toggle aria-label="Toggle italic">
      <FontBoldIcon className="h-4 w-4" />
    </Toggle>
  )
}
