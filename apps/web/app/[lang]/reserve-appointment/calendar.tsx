import { useEffect, useState } from 'react'
import { getShopRservations, getShopWorkDays } from '@repo/helpers/account'
import type { AppointmentType, WorkDayType } from '@repo/helpers/types'
import { add, format } from 'date-fns'
import Calendar from 'react-calendar'

import { Button } from '@repo/ui/button'
import { cn } from '@repo/ui/util'

type UserFormProps = Partial<AppointmentType> & {
  updateFields: (fields: Partial<AppointmentType>) => void
  reservation: any
}

type CalendarProps = {
  justDate: Date | null
  dateTime: Date | null
}

export default function Index({
  shop_id,
  updateFields,
  date: justDate,
  time: dateTime
}: UserFormProps) {
  const now = new Date()
  const [closedDays, setClosedDays] = useState<string[] | []>([])
  const [workDays, setWorkDays] = useState<WorkDayType[] | []>([])
  const [times, setTimes] = useState<string[] | []>([])
  const [openHours, setOpenHours] = useState<string[] | []>([])

  async function getWorkDays() {
    const res = await getShopWorkDays({
      shop_id: shop_id as string
    })

    if (res?.status === true) {
      let days = []
      setWorkDays(res?.data)
      for (let i = 0; i < res?.data.length; i++) {
        if (res?.data[i]?.is_open === 1) {
          days.push(res?.data[i].name as string)
        }
      }

      setClosedDays(() => {
        return [...days]
      })
    }
  }

  function getTimes({
    startTime,
    endTime
  }: {
    startTime: string
    endTime: string
  }): string[] {
    const startsAt = startTime.split(':')
    const closesAt = endTime.split(':')
    if (!justDate) return []
    const beginning = add(justDate, {
      hours: parseInt(startsAt[0] as string, 10),
      minutes: parseInt(startsAt[1] as string, 10)
    })

    const end = add(justDate, {
      hours: parseInt(closesAt[0] as string, 10),
      minutes: parseInt(closesAt[1] as string, 10)
    })
    const interval = 30

    const t: string[] = []

    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      t.push(i as unknown as string)
    }

    return t
  }

  useEffect(() => {
    async function getDates() {
      await getWorkDays()
    }

    getDates()
  }, [])

  useEffect(() => {
    const day = workDays.filter((item) => {
      if (item.name === format(justDate as string, 'EEEE')) {
        return item
      }
    })

    if (day[0]?.start_date) {
      async function getReservationHours() {
        const res = await getShopRservations({
          date: justDate as string,
          shop_id: shop_id as string
        })

        let o: string[] = []
        for (let i = 0; i < res.data.length; i++) {
          o.push(res.data[i].time)
        }

        setOpenHours(o)
      }

      getReservationHours()

      setTimes(getTimes({ startTime: day[0].start_date, endTime: day[0].end_date }))
    }
  }, [justDate])

  return (
    <div className={cn('flex flex-col gap-6')}>
      {justDate ? (
        <div className={'flex flex-wrap justify-center gap-6'}>
          {times.map((time, index) => {
            const isClosed = openHours.includes(format(time, 'kk:mm'))
            return (
              <Button
                key={index}
                className={cn(
                  'w-[87px]',
                  isClosed ? 'cursor-not-allowed' : 'cursor-pointer'
                )}
                variant={
                  isClosed
                    ? 'ghost'
                    : format(time, 'kk:mm') === dateTime
                      ? 'default'
                      : 'outline'
                }
                type={'button'}
                onClick={() => {
                  if (!isClosed) {
                    updateFields({
                      time: format(time, 'kk:mm')
                    })
                  }
                }}
              >
                {format(time, 'kk:mm')}
              </Button>
            )
          })}
        </div>
      ) : (
        <Calendar
          minDate={now}
          className="REACT-CALENDAR p-2"
          view="month"
          tileDisabled={({ date: d }) => closedDays.includes(format(d, 'EEEE'))}
          onClickDay={(date) => {
            updateFields({
              date: format(date, 'yyyy-MM-dd')
            })
          }}
        />
      )}
    </div>
  )
}
