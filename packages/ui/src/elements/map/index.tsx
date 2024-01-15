import React from 'react'
import { Map, Marker, ZoomControl } from 'pigeon-maps'

type MapProps = {
  updateState: any
  location: [number, number]
}

export default function MyMap({ updateState, location }: MapProps) {
  function handleMarkOnMap({ latLng }: { latLng: [number, number] }) {
    updateState({ location: latLng })
  }

  return (
    <Map
      height={300}
      defaultCenter={[50.879, 4.6997]}
      defaultZoom={1}
      onClick={handleMarkOnMap}
    >
      <ZoomControl />

      <Marker width={50} anchor={location} />
    </Map>
  )
}
