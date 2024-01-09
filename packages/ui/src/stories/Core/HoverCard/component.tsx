import React from 'react'

import { Button } from '../../../core/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../core/hover-card'

export default function Index() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Hover</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  )
}
