import { useState } from 'react'

import Logic from './logic'

export default function Page() {
  return (
    <section className={'flex min-h-[calc(100vh-60px)] items-center justify-center'}>
      <Logic />
    </section>
  )
}
