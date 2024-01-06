import React from 'react'

import { Button } from '../../button'
import { ToastAction } from '../../toast'
import { Toaster } from '../../toaster'
import { useToast } from '../../use-toast'

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
