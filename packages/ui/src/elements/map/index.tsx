import React from 'react'
import { Map, Marker, ZoomControl } from 'pigeon-maps'

export default function MyMap() {
  return (
    <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={1}>
      <ZoomControl />
      <Marker width={50} anchor={[50.879, 4.6997]} />
    </Map>
  )
}
