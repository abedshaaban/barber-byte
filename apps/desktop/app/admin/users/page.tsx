'use client'

import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'

import UserRegistration from '../components/user-registration'

export default function Posts() {
  return (
    <section className={'flex w-full flex-col justify-start pt-6'}>
      <h1 className={'text-2xl font-semibold'}>Users</h1>

      <div className={'py-9'}>
        <Card className="flex w-full max-w-md flex-col">
          <CardHeader>
            <CardTitle>Users Created</CardTitle>
          </CardHeader>
          <CardContent>
            <UserRegistration />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
