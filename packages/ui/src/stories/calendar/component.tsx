import React from 'react'

import { Calendar } from '../../calendar'

type Props = {
  mode: 'default' | 'single' | 'multiple' | 'range'
}

export default function Index({ mode = 'single' }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <Calendar
        mode={mode}
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </>
  )
}
