'use client'

import React, { useEffect, useState } from 'react'
import { GetNumberOfUsers } from '@desktop/helpers'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'

import RecentUpdates from './components/recent-updates'

export default function Page() {
  const [users, setUsers] = useState<{ total_users: number; deleted_users: number }>({
    total_users: 0,
    deleted_users: 0
  })

  useEffect(() => {
    async function getData() {
      const res = await GetNumberOfUsers()
      console.log(res.data.count)

      let c = 0
      for (let i = 0; i < res.data.count.length; i++) {
        c += res.data.count[i]
      }

      setUsers((prev) => {
        return { ...prev, total_users: c }
      })
    }

    getData()
  }, [])

  return (
    <section className={'flex w-full flex-col justify-start pt-6'}>
      <h1 className={'text-2xl font-semibold'}>Home</h1>

      <div className={'flex flex-col gap-9 py-9'}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-muted-foreground h-4 w-4"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users?.total_users}</div>
              <p className="text-muted-foreground text-xs">All time</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="flex w-full max-w-md flex-col">
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Updates user changed recently.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentUpdates />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
