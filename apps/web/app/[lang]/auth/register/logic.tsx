'use client'

import React from 'react'
import { cn } from '@repo/ui/cn'

import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import useMultistepForm from '@repo/ui/multistepForm'

export default function Logic() {
  const { step, next, back, isFirstStep, isLastStep } = useMultistepForm([
    <>1</>,
    <>2</>,
    <>3</>
  ])

  return (
    <Card className={'w-full max-w-80 p-3'}>
      <CardHeader className="flex w-full items-end"></CardHeader>

      <CardContent className="text-center">{step}</CardContent>

      <CardFooter
        className={cn('flex items-end', isFirstStep ? 'justify-end' : 'justify-between')}
      >
        {!isFirstStep && (
          <Button variant={'secondary'} onClick={back}>
            Back
          </Button>
        )}

        <Button onClick={next}>{isLastStep ? 'Finish' : 'Next'}</Button>
      </CardFooter>
    </Card>
  )
}
