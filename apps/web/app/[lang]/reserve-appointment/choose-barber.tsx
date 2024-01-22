import { useCallback, useEffect, useRef, useState } from 'react'
import { searchShop } from '@repo/helpers/account'
import type { AppointmentType } from '@repo/helpers/types'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Magnifier } from '@repo/ui/icons'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Skeleton } from '@repo/ui/skeleton'
import { cn } from '@repo/ui/util'

type UserFormProps = Partial<AppointmentType> & {
  updateFields: (fields: Partial<AppointmentType>) => void
  reservation: any
}

export default function Index({ shop_id }: UserFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [shops, setShops] = useState<
    | {
        uuid: string
        handle: string
        name: string
        country: string
        city: string
        street: string
      }[]
    | []
  >([])

  const useDebounce = (value: string, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState('')
    const timerRef = useRef()

    useEffect(() => {
      timerRef.current = setTimeout(() => setDebouncedValue(value), delay)

      return () => {
        clearTimeout(timerRef.current)
      }
    }, [value, delay])

    return debouncedValue
  }

  const debouncedValue = useDebounce(query, 500)

  const search = useCallback(async () => {
    setLoading(true)
    const res = await searchShop({ query: query, page: 1 })

    if (res.status === true) {
      setShops(res.data.data)
      setErrorMessage('')
    } else {
      setErrorMessage(res.message)
    }

    setLoading(false)
  }, [debouncedValue])

  useEffect(() => {
    search()
  }, [debouncedValue, search])

  return (
    <div className={cn('flex flex-col gap-6')}>
      <div className={'w-full text-center text-red-600'}>{errorMessage}</div>

      <div className={'flex w-full flex-wrap justify-center gap-3'}>
        <div className={'grid w-full max-w-sm items-center gap-1.5'}>
          <Label htmlFor={'barber-shop'}>Barber shop</Label>

          <div className={'flex w-full'}>
            <Button
              variant={'outline'}
              className={'rounded-r-none border-r-0'}
              size={'icon'}
              type={'button'}
            >
              <Magnifier />
            </Button>

            <Input
              className={cn(
                'rounded-l-none border-l-0 outline-none focus-visible:ring-0',
                'bg-white dark:bg-neutral-800'
              )}
              type={'text'}
              id={'barber-shop'}
              placeholder={'Search barber shop by name, handle, location.'}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </div>
        </div>
      </div>

      <div className={'flex w-full flex-wrap justify-center gap-3'}>
        {loading
          ? 'skeleton'
          : shops.length > 0
            ? shops.map((item, index) => {
                return (
                  <div key={index} className={'flex w-full flex-row items-center gap-3'}>
                    <Avatar>
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${0}`}
                        className={'object-cover object-center'}
                      />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className={'flex h-full w-full flex-col items-start text-start'}>
                      <span className="">{item.name}</span>

                      <span className={'text-xs text-gray-600'}>
                        @{item.handle} | {`${item.country} ${item.city} ${item.street}`}
                      </span>
                    </div>
                  </div>
                )
              })
            : null}
      </div>
    </div>
  )
}
