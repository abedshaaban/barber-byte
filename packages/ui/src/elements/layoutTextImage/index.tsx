import React from 'react'

import { cn } from '../../lib/utils'

type Props = {
  reverse?: boolean
  title: string
  description: string
  img_url: string
}

export default function Index({ reverse = false, title, description, img_url }: Props) {
  return (
    <section
      className={cn(
        'flex w-full flex-col items-center justify-evenly gap-9',
        'p-7',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      )}
    >
      {/* content */}
      <div className={'max-w-96 md:w-1/2'}>
        <div className={'flex flex-col gap-5 text-justify md:text-start'}>
          <h2 className={'text-3xl font-bold'}>{title}</h2>
          <p className={''}>{description}</p>
        </div>
      </div>

      {/* image */}
      <div className="flex items-center justify-center md:w-1/2">
        <div className={cn('flex h-full max-h-[373px] w-full max-w-[373px]')}>
          <img
            src={img_url}
            alt=""
            className={cn(
              'flex h-full w-full min-w-60 gap-5 object-cover object-center',
              'rotate-[9deg] rounded-[90px] shadow-[0px_7px_11px_0px_#00000025]'
            )}
          />
        </div>
      </div>
    </section>
  )
}
