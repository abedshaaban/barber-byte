import { ReactElement } from 'react'

import { Button } from '@repo/ui/button'
import { Home, Person } from '@repo/ui/icons'
import { cn } from '@repo/ui/util'

type UserData = {
  is_barber_shop: boolean | null
}

type UserTypeProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
  register: any
}

export default function Index({ updateFields, register }: UserTypeProps) {
  const userTypes: { name: string; icon: ReactElement; label: string }[] = [
    { label: register.user, name: 'User', icon: <Person className={'h-20 w-20'} /> },
    { label: register.barberShop, name: 'Barber', icon: <Home className={'h-20 w-20'} /> }
  ]

  function handleClick(name: string) {
    updateFields({ is_barber_shop: name === 'Barber' })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
      {userTypes?.map((item, index) => {
        return (
          <Button
            aria-label={item?.name}
            key={index}
            variant={'outline'}
            className={cn(
              'min-h-40 min-w-36 hover:text-amber-900',
              'flex flex-col gap-1 rounded-xl'
            )}
            onClick={() => {
              handleClick(item?.name)
            }}
            type={'submit'}
          >
            {item?.icon}

            <span className={'w-full text-center text-xl'}>{item?.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
