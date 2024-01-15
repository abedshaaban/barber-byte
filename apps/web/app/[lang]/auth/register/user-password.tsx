import { useEffect, useState } from 'react'

import { Button } from '@repo/ui/button'
import {
  AtMark,
  ClosedEye,
  EightPlus,
  InfoCircle,
  LowerCaseLetter,
  OpenEye,
  UpperCaseLetter
} from '@repo/ui/icons'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@repo/ui/tooltip'
import { cn } from '@repo/ui/util'

type UserData = {
  password: string
}

type UserPasswordProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
  register: any
}

export default function Index({ password, updateFields, register }: UserPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState({
    special: false,
    capital: false,
    lower: false,
    more: false
  })

  const PasswordRequirements: {
    name: string
    icon: any
    label: string
  }[] = [
    {
      name: register.userPassword.requirements.specialDescription,
      icon: <AtMark className={'h-12 w-12 dark:fill-white'} />,
      label: register.userPassword.requirements.special
    },
    {
      name: register.userPassword.requirements.capitalDescription,
      icon: <UpperCaseLetter className={'h-12 w-12 dark:fill-white'} />,
      label: register.userPassword.requirements.capital
    },
    {
      name: register.userPassword.requirements.lowerDescription,
      icon: <LowerCaseLetter className={'h-12 w-12 dark:fill-white'} />,
      label: register.userPassword.requirements.lower
    },
    {
      name: register.userPassword.requirements.moreDescription,
      icon: <EightPlus className={'h-12 w-12 dark:fill-white'} />,
      label: register.userPassword.requirements.more
    }
  ]

  useEffect(() => {
    setChecked({
      special: /[!@#$%&]/g.test(password),
      lower: /[a-z]/.test(password),
      capital: /[A-Z]/.test(password),
      more: password.length >= 8
    })
  }, [password])

  return (
    <div className={'flex w-full flex-col gap-9'}>
      <div className={'flex flex-row justify-between'}>
        {PasswordRequirements?.map((item, index) => {
          const labelKey = item?.label as keyof typeof checked

          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type={'button'}
                    variant={'outline'}
                    className={cn(
                      'relative flex flex-row items-center justify-center',
                      'h-[70px] w-[70px] rounded-lg bg-white p-2 dark:bg-slate-800',
                      checked[labelKey]
                        ? 'bg-green-200 hover:bg-green-300 dark:bg-green-500'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                    )}
                  >
                    {item.icon}
                    <div className={'absolute flex h-full w-full items-end justify-end'}>
                      <InfoCircle className={'scale-75 text-gray-400'} />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>

      <div className={'grid w-full max-w-sm items-center gap-1.5'}>
        <Label htmlFor={'email'}>{register.userPassword.password}</Label>

        <div className="flex w-full">
          <Input
            className={cn(
              'rounded-r-none border-r-0 outline-none focus-visible:ring-0',
              'bg-white dark:bg-slate-800'
            )}
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
            type={'button'}
          >
            {showPassword ? <OpenEye /> : <ClosedEye />}
          </Button>
        </div>
      </div>
    </div>
  )
}
