import React from 'react'

import { Slider } from '../../slider'

export default function Index() {
  return <Slider defaultValue={[33]} max={100} step={1} className="w-32" />
}
