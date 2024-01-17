'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { updateProfile } from '@repo/helpers/account'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { Button } from '@repo/ui/button'
import { AtMark } from '@repo/ui/icons'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { cn } from '@repo/ui/util'

type formDataProps = {
  name: string
  label: string
  placeholder?: string
  type: string
  value: string | number | undefined
}

type UserCredentials = {
  handle: string
  first_name: string
  last_name: string
  birth_date: string
  location: [number, number]
  password: string
  shop_name: string
  country: string
  city: string
  street: string
  description: null | string
}

export default function Logic({
  handle,
  register,
  lang
}: {
  handle: string
  register: any
  lang: string
}) {
  const user = useSelector((state: RootState) => state.user.user)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [credentials, setCredentials] = useState<Partial<UserCredentials>>({
    handle: user ? user?.handle : '',
    description: user ? user?.description : '',
    first_name: user?.role === 'user' ? user?.first_name : '',
    last_name: user?.role === 'user' ? user?.last_name : '',
    birth_date: user?.birth_date as unknown as string,
    location: user?.role === 'shop' ? user?.location : [0, 0],
    shop_name: user?.role === 'shop' ? user?.shop_name : '',
    country: user?.role === 'shop' ? user?.country : '',
    city: user?.role === 'shop' ? user?.city : '',
    street: user?.role === 'shop' ? user?.street : ''
  })

  function updateFields(fields: Partial<UserCredentials>) {
    setCredentials((prev) => {
      return { ...prev, ...fields }
    })
  }

  async function handleUpdateProfile(e: FormEvent) {
    e.preventDefault()

    if (!credentials.handle || credentials.handle?.length < 1) {
      setErrorMessage('Handle cannot be empty.')
    }

    setLoading(true)

    console.log(credentials)
    const res = await updateProfile({ ...credentials })
    console.log(res)

    setLoading(false)
  }

  if (user?.handle !== handle) {
    return (
      <div className={'flex h-full w-full flex-col items-center justify-center gap-9'}>
        <h1 className={'text-3xl md:text-5xl'}>( • ᴖ • ｡) Page Not Found</h1>

        <p>
          Page is not found. Go{' '}
          <Link href={`/`} className={'underline'}>
            to home
          </Link>
        </p>
      </div>
    )
  }

  const normalUserData: formDataProps[] =
    user?.role === 'user'
      ? [
          {
            name: 'first_name',
            label: register.userForm.firstName,
            type: 'text',
            placeholder: register.userForm.firstNameExample,
            value: credentials.first_name
          },
          {
            name: 'last_name',
            label: register.userForm.lastName,
            type: 'text',
            placeholder: register.userForm.lastNameExample,
            value: credentials.last_name
          },
          {
            name: 'birth_date',
            label: register.userForm.birthDate,
            type: 'date',
            value: credentials.birth_date
          }
        ]
      : user?.role === 'shop'
        ? [
            {
              name: 'shop_name',
              label: register.barberForm.shopName,
              type: 'text',
              placeholder: register.barberForm.shopNameExample,
              value: credentials.shop_name
            },
            {
              name: 'birth_date',
              label: register.barberForm.dateOfOpening,
              type: 'date',
              value: credentials.birth_date
            },
            {
              name: 'country',
              label: register.barberLocation.country,
              type: 'text',
              placeholder: register.barberLocation.country,
              value: credentials.country
            },
            {
              name: 'city',
              label: register.barberLocation.city,
              type: 'text',
              placeholder: register.barberLocation.city,
              value: credentials.city
            },
            {
              name: 'street',
              label: register.barberLocation.street,
              type: 'text',
              placeholder: register.barberLocation.street,
              value: credentials.street
            }
          ]
        : []

  return (
    <form
      onSubmit={handleUpdateProfile}
      className={'flex w-full max-w-[400px] flex-col gap-10'}
    >
      {loading ? (
        <>Saving ...</>
      ) : (
        <>
          <div className={cn('flex w-full flex-col justify-center gap-6')}>
            <div className={'text-red-600'}>{errorMessage}</div>
            <div className="grid w-full max-w-[400px] items-center gap-1.5">
              <Label htmlFor={'handle'}>{register.handle}</Label>
              <div className="flex w-full">
                <Button
                  variant={'outline'}
                  size={'icon'}
                  className={cn('rounded-r-none border-r-0')}
                  type={'button'}
                >
                  <AtMark />
                </Button>

                <Input
                  type={'text'}
                  id={'handle'}
                  min={1}
                  minLength={1}
                  placeholder={'example'}
                  required
                  value={credentials.handle}
                  onChange={(e) => {
                    const inputValue = e.target.value

                    if (inputValue.length > 1 && !/^[a-zA-Z0-9-]+$/.test(inputValue)) {
                      return
                    }

                    updateFields({ handle: inputValue })
                  }}
                  className={cn(
                    'rounded-l-none border-l-0 outline-none focus-visible:ring-0',
                    'bg-white dark:bg-neutral-800'
                  )}
                />
              </div>
            </div>
            <div className="grid w-full max-w-[400px] items-center gap-1.5">
              <Label htmlFor={'description'}>{register.userForm.description}</Label>

              <Input
                type={'text'}
                id={'description'}
                max={240}
                maxLength={240}
                required
                value={
                  credentials.description === null ||
                  credentials.description === undefined
                    ? ''
                    : credentials.description
                }
                onChange={(e) => {
                  updateFields({ description: e.target.value })
                }}
                className={cn('bg-white dark:bg-neutral-800')}
              />
            </div>

            {normalUserData?.map((item, index) => {
              return (
                <div
                  className="grid w-full max-w-[400px] items-center gap-1.5"
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
          </div>
          <div className={'flex flex-row items-center justify-between'}>
            <Link href={`/${lang}`}>
              <Button variant={'secondary'}>{register.cancel}</Button>
            </Link>

            <Button type={'submit'}>{register.save}</Button>
          </div>
        </>
      )}
    </form>
  )
}
