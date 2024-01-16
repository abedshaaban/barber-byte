'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

import { Button } from '@repo/ui/button'
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
  email: string
  password: string
  shop_name: string
  country: string
  city: string
  street: string
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
  const [credentials, setCredentials] = useState<Partial<UserCredentials>>({
    handle: user ? user?.handle : '',
    first_name: user?.role === 'user' ? user?.first_name : '',
    last_name: user?.role === 'user' ? user?.last_name : '',
    birth_date: user?.birth_date as unknown as string,
    location: user?.role === 'shop' ? user?.location : [0, 0],
    email: '',
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

  function handleUpdateProfile() {
    setLoading(true)
    console.log(credentials)
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
            name: 'handle',
            label: register.handle,
            type: 'text',
            value: credentials.handle
          },
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
              name: 'handle',
              label: register.handle,
              type: 'text',
              value: credentials.handle
            },
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
    <section className={'flex w-full max-w-[400px] flex-col gap-10'}>
      {loading ? (
        <>Saving ...</>
      ) : (
        <>
          <div className={cn('flex w-full flex-col justify-center gap-6')}>
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

            <Button onClick={handleUpdateProfile}>{register.save}</Button>
          </div>
        </>
      )}
    </section>
  )
}
