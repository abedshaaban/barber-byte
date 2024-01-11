'use client'

import React, { useState } from 'react'

import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import useMultistepForm from '@repo/ui/multistepForm'
import { cn } from '@repo/ui/util'

import BarberLocation from './barber-location'
import UserEmail from './user-email'
import UserForm from './user-form'
import UserPassword from './user-password'
import UserType from './user-type'

type FormDataType = {
  is_barber_shop: boolean
  first_name: string
  last_name: string
  birth_date: string
  location: string
  email: string
  password: string
}

export default function Logic() {
  const [credentials, setCredentials] = useState<FormDataType>({
    is_barber_shop: true,
    first_name: '',
    last_name: '',
    birth_date: '',
    location: '',
    email: '',
    password: ''
  })

  function updateFields(fields: Partial<FormDataType>) {
    setCredentials((prev) => {
      return { ...prev, ...fields }
    })
  }

  const normalUserForm = [
    <UserType {...credentials} updateFields={updateFields} />,
    <UserForm {...credentials} updateFields={updateFields} />,
    <UserEmail />,
    <UserPassword />
  ]
  const BarberShopUserForm = [
    <UserType {...credentials} updateFields={updateFields} />,
    <UserForm {...credentials} updateFields={updateFields} />,
    <BarberLocation {...credentials} updateFields={updateFields} />,
    <UserEmail />,
    <UserPassword />
  ]

  const { step, next, back, isFirstStep, isLastStep } = useMultistepForm(
    credentials?.is_barber_shop ? BarberShopUserForm : normalUserForm
  )

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
          <>
            <Button variant={'secondary'} onClick={back}>
              Back
            </Button>

            <Button onClick={next}>{isLastStep ? 'Finish' : 'Next'}</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
