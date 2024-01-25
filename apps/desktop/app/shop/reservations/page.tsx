'use client'

import { useEffect, useState } from 'react'
import { GetShopReservations } from '@desktop/helpers'

export default function Reservation() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    async function getReservations() {
      const res = await GetShopReservations()

      console.log(res)

      setReservations(res.data)
    }

    getReservations()
  }, [])

  return <div>reservation</div>
}
