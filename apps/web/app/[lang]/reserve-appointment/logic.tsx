'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import type { AppointmentType } from '@repo/helpers/types'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import useMultistepForm from '@repo/ui/multistepForm'
import { cn } from '@repo/ui/util'

import ChooseBarber from './choose-barber'
import ClientData from './client-data'
import GenerateImage from './generate-image'

export default function Logic({
  reservationTextTranslation,
  lang
}: {
  reservationTextTranslation: any
  lang: string
}) {
  const user = useSelector((state: RootState) => state.user)
  const [nextButton, setNextButton] = useState<'button' | 'submit'>('button')
  const [appointmentData, setAppointmentData] = useState<Partial<AppointmentType>>({
    client_name: user?.user
      ? user?.user.role === 'user'
        ? `${user?.user?.first_name} ${user?.user?.last_name}`
        : ''
      : '',
    description: '',
    shop_id: '',
    img_url: ''
  })
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  function updateFields(fields: Partial<AppointmentType>) {
    setAppointmentData((prev) => {
      return { ...prev, ...fields }
    })
  }

  const { step, next, back, isFirstStep, isLastStep, currentStepIndex, steps } =
    useMultistepForm([
      <GenerateImage
        {...appointmentData}
        reservation={reservationTextTranslation}
        updateFields={updateFields}
      />,
      <ClientData
        {...appointmentData}
        reservation={reservationTextTranslation}
        updateFields={updateFields}
      />,
      <ChooseBarber
        {...appointmentData}
        reservation={reservationTextTranslation}
        updateFields={updateFields}
      />,
      <>3</>
    ])

  async function onSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (!isLastStep) return next()

    setLoading(true)

    console.log(appointmentData)
    setTimeout(() => setLoading(false), 3000)
  }

  useEffect(() => {
    if (currentStepIndex === 0) {
      if (!appointmentData.img_url) {
        setNextButton('button')
      } else setNextButton('submit')
    }
  }, [appointmentData.img_url])

  if (!user?.user) {
    return (
      <div className={'flex w-full justify-center py-9'}>
        <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
          <h1 className={'text-2xl md:text-5xl'}>( • ᴖ • ｡) You are not authenticated</h1>

          <p>
            Please{' '}
            <Link href={`/${lang}/auth/login`} className={'underline'}>
              login
            </Link>{' '}
            to view this page or{' '}
            <Link href={`/${lang}/auth/register`} className={'underline'}>
              register
            </Link>{' '}
            an account.
          </p>
        </div>
      </div>
    )
  }

  if (user?.user?.role !== 'user') {
    return (
      <div className={'flex w-full justify-center py-9'}>
        <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
          <h1 className={'text-2xl md:text-5xl'}>( • ᴖ • ｡) You are not authorized</h1>

          <p>
            Go to{' '}
            <Link href={`/${lang}`} className={'underline'}>
              home
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <form className={'flex w-full justify-center py-9'} onSubmit={onSubmitForm}>
      {loading ? (
        <div className={'pb-3 text-center'}>{reservationTextTranslation.loading}</div>
      ) : (
        <Card className={'w-full max-w-[450px] bg-neutral-50 p-3 dark:bg-neutral-900'}>
          <CardHeader className="flex w-full items-center">
            <h1 className="text-center text-3xl font-semibold">
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

            <Button type={nextButton} disabled={nextButton === 'button'}>
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
