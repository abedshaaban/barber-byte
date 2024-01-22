import { useEffect, useState } from 'react'
import { getShopWorkDays } from '@repo/helpers/account'
import type { AppointmentType, WorkDayType } from '@repo/helpers/types'
import { getOpeningTimes, roundToNearestMinutes } from '@web/helpers'
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

export default function Index({ shop_id }: UserFormProps) {
  const now = new Date()
  const [closedDays, setClosedDays] = useState<string[] | []>([])
  const [workDays, setWorkDays] = useState<WorkDayType[] | []>([])
  const [times, setTimes] = useState<string[] | []>([])
  const [date, setDate] = useState<CalendarProps>({
    dateTime: null,
    justDate: null
  })

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

    console.log(res)
  }

  const getTimes = ({ startTime, endTime }: { startTime: string; endTime: string }) => {
    const startsAt = startTime.split(':')
    const closesAt = endTime.split(':')
    if (!date.justDate) return
    const { justDate } = date
    const beginning = add(justDate, {
      hours: parseInt(startsAt[0] as string, 10),
      minutes: parseInt(startsAt[1] as string, 10)
    })

    const end = add(justDate, {
      hours: parseInt(closesAt[0] as string, 10),
      minutes: parseInt(closesAt[1] as string, 10)
    })
    const interval = 30

    const t = []

    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      t.push(i)
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
      if (item.name === format(date.justDate, 'EEEE')) {
        return item
      }
    })

    if (day[0]?.start_date) {
      setTimes(getTimes({ startTime: day[0].start_date, endTime: day[0].end_date }))
    }
  }, [date.justDate])

  return (
    <div className={cn('flex flex-col gap-6')}>
      {date.justDate ? (
        <div className={'flex flex-wrap justify-center gap-6'}>
          {times.map((time, index) => {
            return (
              <Button key={index} className={'w-[87px]'} variant={'outline'}>
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
            setDate((prev) => {
              return { ...prev, justDate: date }
            })
          }}
        />
      )}
    </div>
  )
}
