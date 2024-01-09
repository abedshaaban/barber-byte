import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../core/tabs'

export default function Index() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="w-full">
        <TabsTrigger value="account" className="w-full">
          Account
        </TabsTrigger>
        <TabsTrigger value="password" className="w-full">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}
