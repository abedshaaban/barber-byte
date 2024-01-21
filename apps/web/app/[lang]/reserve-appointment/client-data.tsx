import type { AppointmentType } from '@repo/helpers/types'

import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { cn } from '@repo/ui/util'

type formDataProps = {
  name: string
  label: string
  placeholder?: string
  type: string
  value: string | number | undefined
}

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
  const formData: formDataProps[] = [
    {
      name: 'client_name',
      label: reservation.clientData.name,
      type: 'text',
      value: client_name
    },
    {
      name: 'description',
      label: reservation.clientData.description,
      type: 'text',
      placeholder: reservation.clientData.descriptionExample,
      value: description
    }
  ]

  return (
    <div className={cn('flex flex-col gap-6')}>
      {formData?.map((item, index) => {
        return (
          <div className="grid w-full max-w-sm items-center gap-1.5" key={index}>
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
    </div>
  )
}
