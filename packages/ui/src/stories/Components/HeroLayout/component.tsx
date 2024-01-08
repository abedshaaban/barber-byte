import React from 'react'

import { cn } from '../../../lib/utils'
import DefaultImage from '../../@assets/default-img.png'

type Props = {
  reverse: boolean
}

export default function Index({ reverse }: Props) {
  return (
    <section
      className={cn(
        'flex w-full flex-col items-center justify-evenly md:flex-row',
        'p-7'
      )}
    >
      {/* content */}
      <div className={'max-w-96'}>
        <div className={'flex flex-col gap-5'}>
          <h2 className={'text-3xl font-bold'}>Title</h2>
          <p className={''}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
        </div>
      </div>

      {/* image */}
      <div className="">
        <div
          className={cn(
            'flex h-full max-h-[373px] w-full max-w-[373px]',
            reverse ? '' : ''
          )}
        >
          <img
            src={DefaultImage}
            alt=""
            className={cn(
              'flex h-full w-full gap-5 object-cover object-center',
              'rotate-[9deg] rounded-[90px] shadow-[0px_7px_11px_0px_#00000025]'
            )}
          />
        </div>
      </div>
    </section>
  )
}
