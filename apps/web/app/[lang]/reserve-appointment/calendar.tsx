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

export default function Index({}: UserFormProps) {
  const now = new Date()
  //   const today = days.find((d) => d.dayOfWeek === now.getDay())
  //   const rounded = roundToNearestMinutes(now, 30)
  //   const closing = parse(today!.closeTime, 'kk:mm', now)
  //   const tooLate = !isBefore(rounded, closing)
  //   if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Calendar
        minDate={now}
        className="REACT-CALENDAR p-2"
        view="month"
        // tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
        // onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
        onClickDay={(date) => {
          console.log(date)
        }}
      />
    </div>
  )
}
