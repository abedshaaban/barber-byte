'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import { Register } from '@repo/helpers/auth'
import { checkEmailFormat } from '@web/helpers'

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
  is_barber_shop: boolean | null
  first_name: string
  last_name: string
  birth_date: string
  location: string
  email: string
  password: string
}

export default function Logic() {
  const [loading, setLoading] = useState<boolean>(false)
  const [nextButton, setNextButton] = useState<'button' | 'submit'>('submit')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [credentials, setCredentials] = useState<FormDataType>({
    is_barber_shop: null,
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
    <UserEmail {...credentials} updateFields={updateFields} />,
    <UserPassword {...credentials} updateFields={updateFields} />
  ]
  const BarberShopUserForm = [
    <UserType {...credentials} updateFields={updateFields} />,
    <UserForm {...credentials} updateFields={updateFields} />,
    <UserEmail {...credentials} updateFields={updateFields} />,
    <BarberLocation {...credentials} updateFields={updateFields} />,
    <UserPassword {...credentials} updateFields={updateFields} />
  ]

  const { step, next, back, isFirstStep, isLastStep, currentStepIndex, steps } =
    useMultistepForm(credentials?.is_barber_shop ? BarberShopUserForm : normalUserForm)

  useEffect(() => {
    if (currentStepIndex === steps.length - 1) {
      if (
        /[!@#$%&]/g.test(credentials.password) &&
        /[a-z]/.test(credentials.password) &&
        /[A-Z]/.test(credentials.password) &&
        credentials.password.length >= 8
      ) {
        setNextButton('submit')
      } else setNextButton('button')
    }
  }, [credentials.password])

  async function onSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (currentStepIndex === 2) {
      if (checkEmailFormat(credentials?.email)) {
        setErrorMessage(null)
      } else {
        setErrorMessage('incorrect email format')
        return
      }
    }

    if (!isLastStep) return next()

    setLoading(true)

    const data = await Register({ ...credentials })

    console.log('res:', data)

    if (data?.status) {
      console.log('user:', data?.data)
    } else {
      setErrorMessage(data?.message)
    }

    setLoading(true)
  }

  return (
    <form onSubmit={onSubmitForm} className={'flex w-full justify-center'}>
      <Card className={'w-full max-w-[400px] p-3'}>
        <CardHeader className="flex w-full items-center">
          <h1 className="text-3xl font-semibold">Register</h1>
          <h2 className="w-full text-center">
            {credentials?.is_barber_shop !== null && !isFirstStep
              ? credentials?.is_barber_shop
                ? 'Barber Shop'
                : 'User'
              : null}
          </h2>

          <div className={'text-red-600'}>{errorMessage}</div>
        </CardHeader>

        {loading ? (
          <div className={'pb-3 text-center'}>Loading ...</div>
        ) : (
          <>
            <CardContent className={'px-1 sm:px-6'}>{step}</CardContent>

            <CardFooter className={cn('flex items-end justify-between', '')}>
              {!isFirstStep && (
                <>
                  <Button type={'button'} variant={'secondary'} onClick={back}>
                    Back
                  </Button>

                  <Button type={nextButton} disabled={nextButton === 'button'}>
                    {isLastStep ? 'Finish' : 'Next'}
                  </Button>
                </>
              )}
            </CardFooter>
          </>
        )}
      </Card>
    </form>
  )
}
