import { ReactElement } from 'react'

import { Button } from '@repo/ui/button'
import { Home, Person } from '@repo/ui/icons'
import { cn } from '@repo/ui/util'

export default function Index() {
  const userTypes: { name: string; icon: ReactElement }[] = [
    { name: 'User', icon: <Person className={'h-32 w-32'} /> },
    { name: 'Barber', icon: <Home className={'h-32 w-32'} /> }
  ]

  return (
    <div className="flex items-center justify-center gap-6">
      {userTypes?.map((item, index) => {
        return (
          <Button
            aria-label={item?.name}
            key={index}
            variant={'outline'}
            className={cn(
              'relative h-fit w-fit hover:text-amber-900 ',
              'flex flex-col gap-1 rounded-xl'
            )}
          >
            {item?.icon}

            <span className={'w-full text-center text-xl'}>{item?.name}</span>
          </Button>
        )
      })}
    </div>
  )
}
