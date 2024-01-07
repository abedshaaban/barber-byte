import React from 'react'

import { Card, CardContent } from '../../../card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../../../carousel'

type Props = {
  orientation: 'horizontal' | 'vertical'
  loop: boolean
}

export default function Index({ orientation = 'horizontal', loop }: Props) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: loop
      }}
      orientation={orientation}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
