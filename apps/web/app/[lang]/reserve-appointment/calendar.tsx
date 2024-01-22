import type { AppointmentType } from '@repo/helpers/types'

import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { cn } from '@repo/ui/util'



type UserFormProps = Partial<AppointmentType> & {
  updateFields: (fields: Partial<AppointmentType>) => void
  reservation: any
}

export default function Index({

}: UserFormProps) {


  return (
    <div className={cn('flex flex-col gap-6')}>
   
    </div>
  )
}
