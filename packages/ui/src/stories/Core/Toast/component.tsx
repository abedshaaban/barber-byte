import React from 'react'

import { Button } from '../../../core/button'
import { ToastAction } from '../../../core/toast'
import { Toaster } from '../../../core/toaster'
import { useToast } from '../../../core/use-toast'

export default function Index() {
  const { toast } = useToast()

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up ',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          })
        }}
      >
        Add to calendar
      </Button>
      <Toaster />
    </>
  )
}
