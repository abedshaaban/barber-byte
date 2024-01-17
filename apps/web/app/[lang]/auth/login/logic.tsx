'use client'

import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Login } from '@repo/helpers/auth'
import type { LoginProps } from '@repo/helpers/types'
import { Locale } from '@root/i18n.config'
import { setUser } from '@web/provider/userSlice'
import { useDispatch } from 'react-redux'

import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { useToast } from '@repo/ui/use-toast'
import { cn } from '@repo/ui/util'

type formDataProps = {
  name: string
  label: string
  placeholder?: string
  type: string
  value: string | number
}

export default function Logic({
  params,
  register,
  authText
}: {
  params: { lang: Locale }
  register: any
  authText: any
}) {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [credentials, setCredentials] = useState<LoginProps>({
    email: '',
    password: ''
  })

  function updateFields(fields: Partial<LoginProps>) {
    setCredentials((prev) => {
      return { ...prev, ...fields }
    })
  }

  const formData: formDataProps[] = [
    {
      name: 'email',
      label: register.userEmail.email,
      type: 'email',
      placeholder: 'example@domain',
      value: credentials.email
    },
    {
      name: 'password',
      label: register.userPassword.password,
      type: 'password',
      placeholder: '********',
      value: credentials.password
    }
  ]

  async function onSubmitForm(e: FormEvent) {
    e.preventDefault()

    setLoading(true)

    const data = await Login({ ...credentials })

    if (data?.status) {
      dispatch(setUser(await data?.data))
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
      <Card className={'w-full max-w-[400px] bg-neutral-50 p-3 dark:bg-neutral-900'}>
        <CardHeader className="flex w-full items-center">
          <h1 className="text-3xl font-semibold">{authText.login}</h1>

          <div className={'text-red-600'}>{errorMessage}</div>
        </CardHeader>

        {loading ? (
          <div className={'pb-3 text-center'}>{register.loading}</div>
        ) : (
          <>
            <CardContent className={'flex flex-col gap-6 px-1 sm:px-6'}>
              {formData?.map((item, index) => {
                return (
                  <div
                    className={'grid w-full max-w-sm items-center gap-1.5'}
                    key={index}
                  >
                    <Label htmlFor={item?.name}>{item?.label}</Label>
                    <Input
                      type={item?.type}
                      id={item?.name}
                      placeholder={item?.placeholder}
                      required
                      value={item?.value}
                      onChange={(e) => {
                        updateFields({ [item?.name]: e.target.value })
                      }}
                      className={'bg-white dark:bg-neutral-800'}
                    />
                  </div>
                )
              })}

              <p className={'-mt-4 w-full text-end text-sm'}>
                {register.noAccount}{' '}
                <Link href={`/${params.lang}/auth/register`} className={'underline'}>
                  {register.registerHere}
                </Link>
              </p>
            </CardContent>

            <CardFooter className={cn('flex items-end justify-end')}>
              <Button type={'submit'} className={'w-full'}>
                {authText.login}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </form>
  )
}
