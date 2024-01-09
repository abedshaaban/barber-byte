import React from 'react'

import { AspectRatio } from '../../../core/aspect-ratio'
import Gamer from '../../@assets/gamer.png'

type Props = {
  ratio: number
}

export default function Index({ ratio }: Props) {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={ratio}>
        <img src={Gamer} alt="Image" className="rounded-md object-cover" />
      </AspectRatio>
    </div>
  )
}
