import { useState } from 'react'
import type { AppointmentType } from '@repo/helpers/types'

import { Button } from '@repo/ui/button'
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

  return (
    <div className={cn('flex flex-col gap-6')}>
      <div className={'w-full text-center text-red-600'}>{errorMessage}</div>

      <div className={'flex w-full flex-wrap justify-center gap-3'}>shops</div>
    </div>
  )
}
