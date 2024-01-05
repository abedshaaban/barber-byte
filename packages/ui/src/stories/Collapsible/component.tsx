import React from 'react'
import { CaretDownIcon, CaretSortIcon } from '@radix-ui/react-icons'

import { Button } from '../../button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../collapsible'

export default function Index() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Lorem ipsum dolor sit amet</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {isOpen ? (
              <CaretDownIcon className="h-4 w-4" />
            ) : (
              <CaretSortIcon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        1 Lorem ipsum dolor sit amet
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          2 Lorem ipsum dolor sit amet
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          3 Lorem ipsum dolor sit amet
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
