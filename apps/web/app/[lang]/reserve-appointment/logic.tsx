'use client'

import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import type { AppointmentType } from '@repo/helpers/types'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import useMultistepForm from '@repo/ui/multistepForm'
import { cn } from '@repo/ui/util'

import ClientData from './client-data'

export default function Logic({
  reservationTextTranslation
}: {
  reservationTextTranslation: any
}) {
  const [appointmentData, setAppointmentData] = useState<Partial<AppointmentType>>({
    client_name: '',
    description: '',
    shop_id: '',
    img_url: ''
  })
  const user = useSelector((state: RootState) => state.user)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  function updateFields(fields: Partial<AppointmentType>) {
    setAppointmentData((prev) => {
      return { ...prev, ...fields }
    })
  }

  const { step, next, back, isFirstStep, isLastStep, currentStepIndex, steps } =
    useMultistepForm([
      <ClientData
        {...appointmentData}
        reservation={reservationTextTranslation}
        updateFields={updateFields}
      />,
      <>2</>,
      <>3</>,
      <>4</>
    ])

  async function onSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (!isLastStep) return next()

    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <form className={'flex w-full justify-center py-9'} onSubmit={onSubmitForm}>
      {!user ? (
        <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
          <h1 className={'text-2xl md:text-5xl'}>( • ᴖ • ｡) Page Not Found</h1>

          <p>
            Page is not found. Go{' '}
            <Link href={`/`} className={'underline'}>
              to home
            </Link>
          </p>
        </div>
      ) : loading ? (
        <div className={'pb-3 text-center'}>{reservationTextTranslation.loading}</div>
      ) : (
        <Card className={'w-full max-w-[450px] bg-neutral-50 p-3 dark:bg-neutral-900'}>
          <CardHeader className="flex w-full items-center">
            <h1 className="text-3xl font-semibold">
              {reservationTextTranslation.reserveAppointment}
            </h1>

            <div className={'text-red-600'}>{errorMessage}</div>
          </CardHeader>

          <CardContent className={'flex flex-col gap-3 px-1 sm:px-6'}>{step}</CardContent>

          <CardFooter
            className={cn(
              'flex items-end',
              isFirstStep ? 'justify-end' : 'justify-between'
            )}
          >
            {!isFirstStep && (
              <Button type={'button'} variant={'secondary'} onClick={back}>
                {reservationTextTranslation.back}
              </Button>
            )}

            <Button type={'submit'}>
              {isLastStep
                ? reservationTextTranslation.finish
                : reservationTextTranslation.next}
            </Button>
          </CardFooter>
        </Card>
      )}
    </form>
  )
}
