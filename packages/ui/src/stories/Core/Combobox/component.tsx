import React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { Button } from '../../../button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '../../../command'
import { cn } from '../../../lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../../../popover'

export default function Index() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const content = [
    {
      value: '1',
      label: 'a'
    },
    {
      value: '2',
      label: 'b'
    },
    {
      value: '3',
      label: 'c'
    },
    {
      value: '4',
      label: 'd'
    },
    {
      value: '5',
      label: 'e'
    }
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? content.find((c) => c.value === value)?.label : 'Select content...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search content..." className="h-9" />
          <CommandEmpty>No content found.</CommandEmpty>
          <CommandGroup>
            {content.map((c) => (
              <CommandItem
                key={c.value}
                value={c.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                {c.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === c.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
