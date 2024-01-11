import React from 'react'

import { Button } from '../../../core/button'
import { Card, CardContent, CardFooter, CardHeader } from '../../../core/card'
import useMultistepForm from '../../../elements/multistepForm'
import { cn } from '../../../lib/utils'

export default function Index() {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([<>1</>, <>2</>, <>3</>])

  return (
    <Card className={'w-[300px] p-3'}>
      <CardHeader className="flex w-full items-end">
        {currentStepIndex + 1} / {steps.length}
      </CardHeader>

      <CardContent className="text-center">{step}</CardContent>

      <CardFooter
        className={cn('flex items-end', isFirstStep ? 'justify-end' : 'justify-between')}
      >
        {!isFirstStep && (
          <Button type="button" onClick={back}>
            Back
          </Button>
        )}

        <Button type="submit" onClick={next}>
          {isLastStep ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  )
}
