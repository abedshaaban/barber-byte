'use client'

import React, { FormEvent, useState } from 'react'
import { Login } from '@desktop/helpers'
import { RootState } from '@desktop/provider/store'
import { setUser } from '@desktop/provider/userSlice'
import type { LoginProps } from '@repo/helpers/types'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { useToast } from '@repo/ui/use-toast'
import { cn } from '@repo/ui/util'

export default function Index({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user)
  const { toast } = useToast()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [credentials, setCredentials] = useState<LoginProps>({
    email: '',
    password: ''
  })

  if (!user.user) {
    function updateFields(fields: Partial<LoginProps>) {
      setCredentials((prev) => {
        return { ...prev, ...fields }
      })
    }

    async function onSubmitForm(e: FormEvent) {
      e.preventDefault()

      setLoading(true)

      const res = await Login({ ...credentials })

      console.log(res)
      if (res?.status) {
        dispatch(setUser(await res?.data))
        toast({
          title: res?.message
        })
      } else {
        setErrorMessage(res?.message)
        setLoading(false)
      }
    }

    return (
      <form
        onSubmit={onSubmitForm}
        className={'flex h-screen w-full items-center justify-center'}
      >
        <Card className={'w-full max-w-[400px] bg-neutral-50 p-3 dark:bg-neutral-900'}>
          <CardHeader className="flex w-full items-center">
            <h1 className="text-3xl font-semibold">Login</h1>

            <div className={'text-red-600'}>{errorMessage}</div>
          </CardHeader>

          {loading ? (
            <div className={'pb-3 text-center'}>Loading ...</div>
          ) : (
            <>
              <CardContent className={'flex flex-col gap-6 px-1 sm:px-6'}>
                <div className={'grid w-full max-w-sm items-center gap-1.5'}>
                  <Label htmlFor={'email'}>Email</Label>
                  <Input
                    type={'text'}
                    id={'email'}
                    placeholder={'example@domain'}
                    required
                    value={credentials.email}
                    onChange={(e) => {
                      updateFields({ email: e.target.value })
                    }}
                    className={'bg-white dark:bg-neutral-800'}
                  />
                </div>

                <div className={'grid w-full max-w-sm items-center gap-1.5'}>
                  <Label htmlFor={'password'}>Password</Label>
                  <Input
                    type={'password'}
                    id={'password'}
                    placeholder={'********'}
                    required
                    value={credentials.password}
                    onChange={(e) => {
                      updateFields({ password: e.target.value })
                    }}
                    className={'bg-white dark:bg-neutral-800'}
                  />
                </div>
              </CardContent>

              <CardFooter className={cn('flex items-end justify-end')}>
                <Button type={'submit'} className={'w-full'}>
                  Login
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </form>
    )
  }

  return children
}
