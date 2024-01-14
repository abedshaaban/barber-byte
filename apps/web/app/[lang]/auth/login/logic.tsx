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
import { cn } from '@repo/ui/util'

type formDataProps = {
  name: string
  label: string
  placeholder?: string
  type: string
  value: string | number
}

export default function Logic({ params }: { params: { lang: Locale } }) {
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
      label: 'Email',
      type: 'email',
      placeholder: 'example@domain',
      value: credentials.email
    },
    {
      name: 'password',
      label: 'Password',
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
      router.push(`/${params.lang}/feed`)
    } else {
      setErrorMessage(data?.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitForm} className={'flex w-full justify-center'}>
      <Card className={'w-full max-w-[400px] bg-slate-50 p-3 dark:bg-slate-900'}>
        <CardHeader className="flex w-full items-center">
          <h1 className="text-3xl font-semibold">Login</h1>

          <div className={'text-red-600'}>{errorMessage}</div>
        </CardHeader>

        {loading ? (
          <div className={'pb-3 text-center'}>Loading ...</div>
        ) : (
          <>
            <CardContent className={'flex flex-col gap-6 px-1 sm:px-6'}>
              {formData?.map((item, index) => {
                return (
                  <div className="grid w-full max-w-sm items-center gap-1.5" key={index}>
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
                    />
                  </div>
                )
              })}

              <p className={'w-full text-end'}>
                Don&#39;t have an account?{' '}
                <Link href={`/${params.lang}/auth/register`} className={'underline'}>
                  Register here.
                </Link>
              </p>
            </CardContent>

            <CardFooter className={cn('flex items-end justify-end')}>
              <Button type={'submit'}>Login</Button>
            </CardFooter>
          </>
        )}
      </Card>
    </form>
  )
}
