'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  NEXT_PUBLIC_PROFILE_IMAGES_URL,
  updateProfile,
  updateProfileImage
} from '@desktop/helpers'
import { RootState } from '@desktop/provider/store'
import { setUser } from '@desktop/provider/userSlice'
import { Countries } from '@repo/helpers/data'
import type { AccountStatusType, WorkDayType } from '@repo/helpers/types'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardFooter } from '@repo/ui/card'
import { AtMark, Check, Cross } from '@repo/ui/icons'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import Map from '@repo/ui/map'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@repo/ui/select'
import { Switch } from '@repo/ui/switch'
import { useToast } from '@repo/ui/use-toast'
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
  account_status: AccountStatusType | undefined
  work_days: WorkDayType[]
}

export default function Logic() {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const router = useRouter()
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
    street: user?.role === 'shop' ? user?.street : '',
    account_status: user?.account_status,
    work_days:
      user?.role === 'shop'
        ? [
            {
              order: 1,
              name: 'Monday',
              start_date: user.work_days[0]?.start_date,
              end_date: user.work_days[0]?.end_date,
              is_open: user.work_days[0]?.is_open
            },
            {
              order: 2,
              name: 'Tuesday',
              start_date: user.work_days[0]?.start_date,
              end_date: user.work_days[0]?.end_date,
              is_open: user.work_days[0]?.is_open
            },
            {
              order: 3,
              name: 'Wednesday',
              start_date: user.work_days[0]?.start_date,
              end_date: user.work_days[0]?.end_date,
              is_open: user.work_days[0]?.is_open
            },
            {
              order: 4,
              name: 'Thursday',
              start_date: user.work_days[0]?.start_date,
              end_date: user.work_days[0]?.end_date,
              is_open: user.work_days[0]?.is_open
            },
            {
              order: 5,
              name: 'Friday',
              start_date: user.work_days[0]?.start_date,
              end_date: user.work_days[0]?.end_date,
              is_open: user.work_days[0]?.is_open
            },
            {
              order: 6,
              name: 'Saturday',
              start_date: user.work_days[0]?.start_date,
              end_date: user.work_days[0]?.end_date,
              is_open: user.work_days[0]?.is_open
            },
            {
              order: 7,
              name: 'Sunday',
              start_date: user.work_days[0]?.start_date,
              end_date: user.work_days[0]?.end_date,
              is_open: user.work_days[0]?.is_open
            }
          ]
        : []
  })

  console.log(user)
  function updateFields(fields: Partial<UserCredentials>) {
    setCredentials((prev) => {
      return { ...prev, ...fields }
    })
  }

  async function handleProfileImageUpload(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true)
    if (e.target.files && e.target.files[0]) {
      const res = await updateProfileImage({
        img_url: e.target.files[0]
      })

      if (res?.status === true) {
        dispatch(setUser({ ...user, img_url: res?.data?.img_url }))
        toast({
          title: res?.message
        })
      } else {
        toast({
          variant: 'destructive',
          title: res?.message
        })
      }
    } else {
      return
    }
    setLoading(false)
  }

  async function handleUpdateProfile(e: FormEvent) {
    e.preventDefault()

    if (!credentials.handle || credentials.handle?.length < 1) {
      setErrorMessage('Handle cannot be empty.')
    }

    setLoading(true)
    setErrorMessage('')

    const res = await updateProfile({ ...credentials } as any)

    setLoading(false)

    if (res?.status === false) {
      setErrorMessage(res?.message)
      toast({
        variant: 'destructive',
        title: res?.message
      })
    } else {
      dispatch(setUser(await res?.data))
      toast({
        title: res?.message
      })

      router.push(`/profile`)
    }
  }

  const normalUserData: formDataProps[] =
    user?.role === 'user'
      ? [
          {
            name: 'first_name',
            label: 'First name',
            type: 'text',
            value: credentials.first_name
          },
          {
            name: 'last_name',
            label: 'Last name',
            type: 'text',
            value: credentials.last_name
          },
          {
            name: 'birth_date',
            label: 'Birth date',
            type: 'date',
            value: credentials.birth_date
          }
        ]
      : user?.role === 'shop'
        ? [
            {
              name: 'shop_name',
              label: 'Shop name',
              type: 'text',
              value: credentials.shop_name
            },
            {
              name: 'birth_date',
              label: 'Date of opening',
              type: 'date',
              value: credentials.birth_date
            },
            {
              name: 'country',
              label: 'Country',
              type: 'text',
              value: credentials.country
            },
            {
              name: 'city',
              label: 'City',
              type: 'text',
              value: credentials.city
            },
            {
              name: 'street',
              label: 'Street',
              type: 'text',
              value: credentials.street
            }
          ]
        : []

  function handleOpenDay(index: number) {
    updateFields({
      work_days: credentials.work_days.map((day, i) =>
        i === index
          ? credentials.work_days[index]?.is_open
            ? { ...day, is_open: !credentials.work_days[index]?.is_open }
            : {
                ...day,
                is_open: !credentials.work_days[index]?.is_open,
                end_date: '',
                start_date: ''
              }
          : day
      )
    })
  }

  return (
    <form
      onSubmit={handleUpdateProfile}
      className={
        'm-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-10 py-9'
      }
    >
      {loading ? (
        <>Saving ...</>
      ) : (
        <>
          <Card className={'w-full max-w-[400px] bg-neutral-50 p-9 dark:bg-neutral-900'}>
            <CardContent className={'flex flex-col gap-6'}>
              <div
                className={cn('flex w-full flex-col items-center justify-center gap-6')}
              >
                <div
                  className={cn('flex w-full flex-col items-center justify-center gap-6')}
                >
                  <Avatar className={'aspect-square h-48 w-48'}>
                    {user?.img_url && (
                      <AvatarImage
                        src={`${NEXT_PUBLIC_PROFILE_IMAGES_URL}/${user?.img_url}`}
                        alt={'user profile picture'}
                        className={'object-cover object-center'}
                      />
                    )}

                    <AvatarFallback>No image</AvatarFallback>
                  </Avatar>

                  <Input
                    type="file"
                    className={cn(
                      'w-full max-w-56 cursor-pointer bg-white dark:bg-neutral-800'
                    )}
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={handleProfileImageUpload}
                  />
                </div>
                <div className={'w-full text-center text-red-600'}>{errorMessage}</div>

                <div className="grid w-full max-w-[400px] items-center gap-1.5">
                  <Label htmlFor={'handle'}>Handle</Label>
                  <div className="flex w-full">
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      className={cn('rounded-r-none border-r-0')}
                      type={'button'}
                    >
                      <AtMark className={'dark:fill-white'} />
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

                        if (
                          inputValue.length > 1 &&
                          !/^[a-zA-Z0-9-]+$/.test(inputValue)
                        ) {
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
                  <Label htmlFor={'description'}>Description</Label>

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
                <div className="flex w-full max-w-[400px] justify-start">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="account-status"
                      checked={credentials?.account_status === 'public' ? true : false}
                      onCheckedChange={(val) => {
                        updateFields({ account_status: val ? 'public' : 'private' })
                      }}
                    />
                    <Label htmlFor="account-status">Account status</Label>
                  </div>
                </div>

                {normalUserData?.map((item, index) => {
                  if (item.name === 'country') {
                    return (
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor={'country'}>{item.label}</Label>
                        <Select
                          onValueChange={(val) => {
                            updateFields({ country: val })
                          }}
                          value={item.value as string}
                        >
                          <SelectTrigger
                            className={'w-full bg-white dark:bg-neutral-800'}
                          >
                            <SelectValue placeholder={item.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {Countries.map((n) => {
                              return (
                                <SelectItem value={n.name} key={n.id}>
                                  {n.name}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    )
                  }

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

                {user && user.role === 'shop' && (
                  <>
                    <div className={'grid w-full items-center gap-1.5'}>
                      <Label htmlFor={'location'}>Location</Label>

                      <Map
                        updateState={updateFields}
                        location={credentials.location}
                        defaultZoom={18}
                      />
                    </div>

                    <div className={cn('flex flex-col gap-6')}>
                      <Label htmlFor={'work-days'}>Work Days</Label>

                      {credentials.work_days?.map((item, index) => {
                        return (
                          <div
                            className="flex w-full max-w-sm items-center gap-1.5"
                            key={index}
                          >
                            <Label
                              htmlFor={item?.name}
                              className={'w-[80px] min-w-[80px] max-w-[80px]'}
                            >
                              {item?.name}
                            </Label>
                            <Input
                              type={'time'}
                              required
                              value={item?.start_date}
                              onChange={(e) => {
                                updateFields({
                                  work_days: credentials.work_days.map((day, i) =>
                                    i === index
                                      ? { ...day, start_date: e.target.value }
                                      : day
                                  )
                                })
                              }}
                              className={'bg-white dark:bg-neutral-800'}
                              disabled={item.is_open}
                            />

                            <Input
                              type={'time'}
                              required
                              value={item?.end_date}
                              onChange={(e) => {
                                updateFields({
                                  work_days: credentials.work_days.map((day, i) =>
                                    i === index
                                      ? { ...day, end_date: e.target.value }
                                      : day
                                  )
                                })
                              }}
                              className={'bg-white dark:bg-neutral-800'}
                              disabled={item.is_open}
                            />

                            <div className={'flex flex-row'}>
                              <Button
                                className={cn(
                                  'rounded-r-none border-r-0',
                                  item.is_open ? '' : ''
                                )}
                                size={'icon'}
                                variant={'outline'}
                                type={'button'}
                                disabled={item.is_open ? false : true}
                                onClick={() => {
                                  handleOpenDay(index)
                                }}
                              >
                                <Check />
                              </Button>

                              <Button
                                className={cn(
                                  'rounded-l-none border-l-0',
                                  item.is_open ? '' : ''
                                )}
                                size={'icon'}
                                variant={'outline'}
                                type={'button'}
                                disabled={item.is_open ? true : false}
                                onClick={() => {
                                  handleOpenDay(index)
                                }}
                              >
                                <Cross />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            </CardContent>

            <CardFooter
              className={cn('flex w-full flex-row items-center justify-between')}
            >
              <Link href={`/profile`}>
                <Button variant={'secondary'}>Cancel</Button>
              </Link>

              <Button type={'submit'}>Save</Button>
            </CardFooter>
          </Card>
        </>
      )}
    </form>
  )
}
