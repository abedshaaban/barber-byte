import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { cn } from '@repo/ui/util'

type UserData = {
  first_name: string
  last_name: string
  birth_date: string
}

type formDataProps = {
  name: string
  label: string
  placeholder?: string
  type: string
  value: string | number
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
  register: any
}

export default function Index({
  first_name,
  last_name,
  birth_date,
  updateFields,
  register
}: UserFormProps) {
  const formData: formDataProps[] = [
    {
      name: 'first_name',
      label: register.userForm.firstName,
      type: 'text',
      placeholder: register.userForm.firstNameExample,
      value: first_name
    },
    {
      name: 'last_name',
      label: register.userForm.lastName,
      type: 'text',
      placeholder: register.userForm.lastNameExample,
      value: last_name
    },
    {
      name: 'birth_date',
      label: register.userForm.birthDate,
      type: 'date',
      placeholder: '',
      value: birth_date
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
