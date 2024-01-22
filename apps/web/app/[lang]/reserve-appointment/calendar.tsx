import { useEffect, useState } from 'react'
import { getShopWorkDays } from '@repo/helpers/account'
import type { AppointmentType } from '@repo/helpers/types'
import { roundToNearestMinutes } from '@web/helpers'
import { format, formatISO, isBefore, parse } from 'date-fns'
import Calendar from 'react-calendar'

import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
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
  const [date, setDate] = useState<CalendarProps>({
    dateTime: null,
    justDate: null
  })

  const now = new Date()
  //   const today = days.find((d) => d.dayOfWeek === now.getDay())
  //   const rounded = roundToNearestMinutes(now, 30)
  //   const closing = parse(today!.closeTime, 'kk:mm', now)
  //   const tooLate = !isBefore(rounded, closing)
  //   if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))

  async function workDays() {
    const res = await getShopWorkDays({
      shop_id: shop_id as string
    })

    console.log(res)
  }

  useEffect(() => {
    async function getDates() {
      await workDays()
    }

    getDates()
  }, [])

  return (
    <div className={cn('flex flex-col gap-6')}>
      {date.justDate ? null : (
        <Calendar
          minDate={now}
          className="REACT-CALENDAR p-2"
          view="month"
          // tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
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
