import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../accordion'

export default function Index() {
  return (
    <Accordion type="single" collapsible className="w-full min-w-[300px] max-w-[300px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Lorem ipsum dolor sit amet</AccordionTrigger>
        <AccordionContent>
          estibulum tempus fringilla augue vitae venenatis. Cras mattis lacus ac velit
          tempus sodales.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Lorem ipsum dolor sit amet</AccordionTrigger>
        <AccordionContent>
          estibulum tempus fringilla augue vitae venenatis. Cras mattis lacus ac velit
          tempus sodales.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Lorem ipsum dolor sit amet</AccordionTrigger>
        <AccordionContent>
          estibulum tempus fringilla augue vitae venenatis. Cras mattis lacus ac velit
          tempus sodales.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
