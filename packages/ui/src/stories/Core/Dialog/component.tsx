import React from 'react'

import { Button } from '../../../core/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../../core/dialog'

export default function Index() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lorem ipsum dolor sit amet?</DialogTitle>
          <DialogDescription>Lorem ipsum dolor.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
