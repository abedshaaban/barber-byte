import React from 'react'

import { Button } from '../../../button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../hover-card'

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
