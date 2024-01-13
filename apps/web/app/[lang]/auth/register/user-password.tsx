import { useState } from 'react'

import { Button } from '@repo/ui/button'
import {
  AtMark,
  ClosedEye,
  EightPlus,
  LowerCaseLetter,
  OpenEye,
  UpperCaseLetter
} from '@repo/ui/icons'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { cn } from '@repo/ui/util'

type UserData = {
  password: string
}

type UserPasswordProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export default function Index({ password, updateFields }: UserPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)

  const PasswordRequirements: {
    name: string
    icon: any
  }[] = [
    {
      name: 'Use special character.',
      icon: <AtMark className={'h-12 w-12'} />
    },
    {
      name: 'Use upper case letters.',
      icon: <UpperCaseLetter className={'h-12 w-12'} />
    },
    {
      name: 'Use lower case letters.',
      icon: <LowerCaseLetter className={'h-12 w-12'} />
    },
    {
      name: 'Password must be eight plus characters.',
      icon: <EightPlus className={'h-12 w-12'} />
    }
  ]

  return (
    <div className={'flex w-full flex-col'}>
      <div className={'flex flex-row '}>
        {PasswordRequirements?.map((item, index) => {
          return <div key={index}>{item.icon}</div>
        })}
      </div>

      <div className={'grid w-full max-w-sm items-center gap-1.5'}>
        <Label htmlFor={'email'}>Password</Label>

        <div className="flex w-full">
          <Input
            className={cn('rounded-r-none border-r-0 outline-none focus-visible:ring-0')}
            type={showPassword ? 'text' : 'password'}
            id={'email'}
            placeholder={'********'}
            min={8}
            minLength={8}
            required
            value={password}
            onChange={(e) => {
              updateFields({ password: e.target.value })
            }}
          />

          <Button
            variant={'outline'}
            size={'icon'}
            className={cn('rounded-l-none border-l-0')}
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          >
            {showPassword ? <OpenEye /> : <ClosedEye />}
          </Button>
        </div>
      </div>
    </div>
  )
}
