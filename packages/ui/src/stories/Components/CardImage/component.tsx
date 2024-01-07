import React from 'react'

import { Card } from '../../../card'
import Map from '../../@assets/map.jpg'

type Props = {
  title: string
}

export default function Index({ title }: Props) {
  return (
    <Card className="relative cursor-pointer">
      <div className="absolute z-20 flex h-[105px] w-[255px] items-center justify-center rounded-xl bg-black bg-opacity-60 text-center font-semibold text-white duration-300 hover:bg-opacity-30">
        {title}
      </div>

      <div className="z-10 h-[105px] w-[255px] rounded-xl">
        <img
          src={Map}
          alt=""
          className="h-full w-full rounded-xl object-cover object-center"
        />
      </div>
    </Card>
  )
}
