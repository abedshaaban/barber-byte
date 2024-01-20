'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Register } from '@repo/helpers/auth'
import type { WorkDayType } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import { checkEmailFormat } from '@web/helpers'
import { setUser } from '@web/provider/userSlice'
import { useDispatch } from 'react-redux'

import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import useMultistepForm from '@repo/ui/multistepForm'
import { useToast } from '@repo/ui/use-toast'
import { cn } from '@repo/ui/util'

import BarberForm from './barber-form'
import BarberHours from './barber-hours'
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
  location: [number, number]
  email: string
  password: string
  shop_name: string
  country: string
  city: string
  street: string
  work_days: WorkDayType[]
}

export default function Logic({
  params,
  register
}: {
  params: { lang: Locale }
  register: any
}) {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [nextButton, setNextButton] = useState<'button' | 'submit'>('submit')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [credentials, setCredentials] = useState<FormDataType>({
    is_barber_shop: null,
    first_name: '',
    last_name: '',
    birth_date: '',
    location: [0, 0],
    email: '',
    password: '',
    shop_name: '',
    country: '',
    city: '',
    street: '',
    work_days: [
      { order: 1, name: 'Monday', start_date: '', end_date: '', is_open: false },
      { order: 2, name: 'Tuesday', start_date: '', end_date: '', is_open: true },
      { order: 3, name: 'Wednesday', start_date: '', end_date: '', is_open: true },
      { order: 4, name: 'Thursday', start_date: '', end_date: '', is_open: true },
      { order: 5, name: 'Friday', start_date: '', end_date: '', is_open: true },
      { order: 6, name: 'Saturday', start_date: '', end_date: '', is_open: true },
      { order: 7, name: 'Sunday', start_date: '', end_date: '', is_open: true }
    ]
  })

  function updateFields(fields: Partial<FormDataType>) {
    setCredentials((prev) => {
      return { ...prev, ...fields }
    })
  }

  const normalUserForm = [
    <UserType {...credentials} updateFields={updateFields} register={register} />,
    <UserForm {...credentials} updateFields={updateFields} register={register} />,
    <UserEmail {...credentials} updateFields={updateFields} register={register} />,
    <UserPassword {...credentials} updateFields={updateFields} register={register} />
  ]
  const BarberShopUserForm = [
    <UserType {...credentials} updateFields={updateFields} register={register} />,
    <BarberForm {...credentials} updateFields={updateFields} register={register} />,
    <UserEmail {...credentials} updateFields={updateFields} register={register} />,
    <BarberHours {...credentials} updateFields={updateFields} register={register} />,
    <BarberLocation {...credentials} updateFields={updateFields} register={register} />,
    <UserPassword {...credentials} updateFields={updateFields} register={register} />
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

    const data = await Register({ ...credentials } as any)

    if (data?.status) {
      dispatch(setUser(data.data))
      toast({
        title: data?.message
      })
      router.push(`/${params.lang}/feed`)
    } else {
      setErrorMessage(data?.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitForm} className={'flex w-full justify-center'}>
      <Card className={'w-full max-w-[450px] bg-neutral-50 p-3 dark:bg-neutral-900'}>
        <CardHeader className="flex w-full items-center">
          <h1 className="text-3xl font-semibold">{register.title}</h1>
          <h2 className="w-full text-center">
            {credentials?.is_barber_shop !== null && !isFirstStep
              ? credentials?.is_barber_shop
                ? register.barberShop
                : register.user
              : null}
          </h2>

          <div className={'text-red-600'}>{errorMessage}</div>
        </CardHeader>

        {loading ? (
          <div className={'pb-3 text-center'}>{register.loading}</div>
        ) : (
          <>
            <CardContent className={'flex flex-col gap-3 px-1 sm:px-6'}>
              {step}
              <p className={'w-full text-end text-sm'}>
                {register.haveAccount}{' '}
                <Link href={`/${params.lang}/auth/register`} className={'underline'}>
                  {register.loginHere}
                </Link>
              </p>
            </CardContent>

            <CardFooter className={cn('flex items-end justify-between', '')}>
              {!isFirstStep && (
                <>
                  <Button type={'button'} variant={'secondary'} onClick={back}>
                    {register.back}
                  </Button>

                  <Button type={nextButton} disabled={nextButton === 'button'}>
                    {isLastStep ? register.finish : register.next}
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
