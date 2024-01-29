'use client'

import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'

import SharedToPlatform from '../components/shared-to-platform'
import UserRegistration from '../components/user-registration'

export default function Posts() {
  return (
    <section className={'flex w-full flex-col justify-start gap-9 pt-6'}>
      <h1 className={'text-2xl font-semibold'}>Users</h1>

      <div className={'wrap flex flex gap-9'}>
        <Card className="flex w-full max-w-md flex-col">
          <CardHeader>
            <CardTitle>Users Created</CardTitle>
          </CardHeader>
          <CardContent>
            <UserRegistration />
          </CardContent>
        </Card>

        <Card className="flex w-full max-w-md flex-col">
          <CardHeader>
            <CardTitle>Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <SharedToPlatform />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
