'use client'

import React, { useEffect, useState } from 'react'
import { GetNumberOfUsers } from '@desktop/helpers'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function Posts() {
  const [users, setUsers] = useState([])

  const GenderChart = ({ data }: { data: any }) => {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey="count"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  useEffect(() => {
    async function getReservations() {
      const res = await GetNumberOfUsers()

      let r = []

      for (let i = 0; i < res.data.count.length; i++) {
        const c = res.data.count[i]
        const d = res.data.date[i]

        r.push({ date: d, count: c })
      }

      setUsers(r)
      console.log(r)
    }

    getReservations()
  }, [])

  return (
    <div className={'py-9'}>
      <GenderChart data={users} />
    </div>
  )
}
