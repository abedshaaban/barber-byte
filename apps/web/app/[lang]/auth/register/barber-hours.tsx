import { Button } from '@repo/ui/button'
import { Check, Cross } from '@repo/ui/icons'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { cn } from '@repo/ui/util'

type WorkDayType = {
  name: string
  startDay: string
  endDay: string
  isOpen: boolean
}

type UserData = {
  work_days: WorkDayType[]
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
  register: any
}

export default function Index({ work_days, register, updateFields }: UserFormProps) {
  function handleOpenDay(index: number) {
    updateFields({
      work_days: work_days.map((day, i) =>
        i === index
          ? work_days[index]?.isOpen
            ? { ...day, isOpen: !work_days[index]?.isOpen }
            : { ...day, isOpen: !work_days[index]?.isOpen, endDay: '', startDay: '' }
          : day
      )
    })
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      {work_days?.map((item, index) => {
        return (
          <div className="flex w-full max-w-sm items-center gap-1.5" key={index}>
            <Label htmlFor={item?.name} className={'w-[80px] min-w-[80px] max-w-[80px]'}>
              {item?.name}
            </Label>
            <Input
              type={'time'}
              required
              value={item?.startDay}
              onChange={(e) => {
                updateFields({
                  work_days: work_days.map((day, i) =>
                    i === index ? { ...day, startDay: e.target.value } : day
                  )
                })
              }}
              className={'bg-white dark:bg-neutral-800'}
              disabled={item.isOpen}
            />

            <Input
              type={'time'}
              required
              value={item?.endDay}
              onChange={(e) => {
                updateFields({
                  work_days: work_days.map((day, i) =>
                    i === index ? { ...day, endDay: e.target.value } : day
                  )
                })
              }}
              className={'bg-white dark:bg-neutral-800'}
              disabled={item.isOpen}
            />

            <div className={'flex flex-row'}>
              <Button
                className={cn('rounded-r-none border-r-0', item.isOpen ? '' : '')}
                size={'icon'}
                variant={'outline'}
                type={'button'}
                disabled={item.isOpen ? false : true}
                onClick={() => {
                  handleOpenDay(index)
                }}
              >
                <Check />
              </Button>

              <Button
                className={cn('rounded-l-none border-l-0', item.isOpen ? '' : '')}
                size={'icon'}
                variant={'outline'}
                type={'button'}
                disabled={item.isOpen ? true : false}
                onClick={() => {
                  handleOpenDay(index)
                }}
              >
                <Cross />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
