import type { AppointmentType } from '@repo/helpers/types'

import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Textarea } from '@repo/ui/textarea'
import { cn } from '@repo/ui/util'

type UserFormProps = Partial<AppointmentType> & {
  updateFields: (fields: Partial<AppointmentType>) => void
  reservation: any
}

export default function Index({
  client_name,
  description,
  updateFields,
  reservation
}: UserFormProps) {
  return (
    <div className={cn('flex flex-col gap-6')}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={'prompt'}>{reservation.imageGeneration.prompt}</Label>
        <Textarea
          id={'prompt'}
          placeholder={reservation.imageGeneration.promptExample}
          required
          value={description}
          onChange={(e) => {
            updateFields({ description: e.target.value })
          }}
          className={'bg-white dark:bg-neutral-800'}
        />
      </div>
    </div>
  )
}
