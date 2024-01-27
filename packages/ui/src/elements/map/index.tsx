import React from 'react'
import { Map, Marker, ZoomControl } from 'pigeon-maps'

type MapProps = {
  updateState: any
  location: [number, number]
  defaultZoom?: number
}

export default function MyMap({ updateState, location, defaultZoom = 1 }: MapProps) {
  function handleMarkOnMap({ latLng }: { latLng: [number, number] }) {
    updateState({ location: latLng })
  }

  return (
    <Map
      height={300}
      defaultCenter={location}
      defaultZoom={defaultZoom}
      onClick={handleMarkOnMap}
    >
      <ZoomControl />

      <Marker width={50} anchor={location} />
    </Map>
  )
}
