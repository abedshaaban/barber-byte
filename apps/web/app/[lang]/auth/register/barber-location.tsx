import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import Map from '@repo/ui/map'
import { cn } from '@repo/ui/util'

type UserData = {
  country: string
  city: string
  street: string
  location: [number, number]
}

type formDataProps = {
  name: string
  label: string
  placeholder?: string
  type: string
  value: string | number
}

type UserLocationProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
  register: any
}

export default function Index({
  updateFields,
  location,
  country,
  city,
  street,
  register
}: UserLocationProps) {
  const formData: formDataProps[] = [
    {
      name: 'country',
      label: register.barberLocation.country,
      type: 'text',
      placeholder: register.barberLocation.country,
      value: country
    },
    {
      name: 'city',
      label: register.barberLocation.city,
      type: 'text',
      placeholder: register.barberLocation.city,
      value: city
    },
    {
      name: 'street',
      label: register.barberLocation.street,
      type: 'text',
      placeholder: register.barberLocation.street,
      value: street
    }
  ]

  return (
    <div className={'flex h-full w-full flex-col gap-6'}>
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
              />
            </div>
          )
        })}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>{register.barberLocation.location}</Label>
        <Map updateState={updateFields} location={location} />
      </div>
    </div>
  )
}
