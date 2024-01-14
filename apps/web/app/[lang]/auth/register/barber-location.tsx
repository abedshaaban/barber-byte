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
}

export default function Index({
  updateFields,
  location,
  country,
  city,
  street
}: UserLocationProps) {
  const formData: formDataProps[] = [
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      placeholder: 'Country',
      value: country
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'City',
      value: city
    },
    {
      name: 'street',
      label: 'Street',
      type: 'text',
      placeholder: 'Street',
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
        <Label>Location</Label>
        <Map updateState={updateFields} location={location} />
      </div>
    </div>
  )
}
