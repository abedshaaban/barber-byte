'use client'

import React, { useEffect, useState } from 'react'
import { GetSharedToPlatform } from '@desktop/helpers'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts'

export default function Users() {
  const [users, setUsers] = useState([])

  const UsersChart = ({ data }: { data: any }) => {
    console.log(data)

    return (
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorWhastapp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" type="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.map((platformData) => (
            <Area
              key={platformData.platform}
              type="monotone"
              dataKey="count"
              name={`${platformData.platform}`}
              data={platformData.date.map((date, index) => ({
                date,
                count: platformData.count[index]
              }))}
              fill={
                platformData?.platform === 'facebook'
                  ? 'url(#colorWhastapp)'
                  : platformData?.platform === 'whatsapp'
                    ? 'url(#colorFacebook)'
                    : '#8884d8'
              }
              stroke={
                platformData?.platform === 'facebook'
                  ? '#8884d8'
                  : platformData?.platform === 'whatsapp'
                    ? '#82ca9d'
                    : '#8884d8'
              }
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  useEffect(() => {
    async function getReservations() {
      const res = await GetSharedToPlatform()

      console.log(res?.data)

      setUsers(res?.data)
    }

    getReservations()
  }, [])

  return <UsersChart data={users} />
}
