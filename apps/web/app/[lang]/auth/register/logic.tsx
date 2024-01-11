'use client'

import React, { useState } from 'react'

import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import useMultistepForm from '@repo/ui/multistepForm'
import { cn } from '@repo/ui/util'

import BarberLocation from './barber-location'
import UserEmail from './user-email'
import UserPassword from './user-password'
import UserType from './user-type'
import UserForm from './userForm'

export default function Logic() {
  const [credentials, setCredentials] = useState({
    first_name: '',
    last_name: '',
    birth_date: ''
  })

  const { step, next, back, isFirstStep, isLastStep } = useMultistepForm([
    <UserType />,
    <UserForm />,
    <BarberLocation />,
    <UserEmail />,
    <UserPassword />
  ])

  return (
    <Card className={'w-full max-w-[400px] p-3'}>
      <CardHeader className="flex w-full items-center">
        <h1 className="text-3xl font-semibold">Register</h1>
      </CardHeader>

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
