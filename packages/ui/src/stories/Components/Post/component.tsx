import React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Avatar, AvatarFallback, AvatarImage } from '../../../avatar'
import { Button } from '../../../button'
import { Card, CardContent, CardFooter, CardHeader } from '../../../card'

type UserProps = {
  first_name: string
  last_name: string
  url: string
  fallback: string
}

type Props = { user: UserProps }

export default function Index({ user }: Props) {
  return (
    <Card className="w-80 max-w-80">
      {/* user info */}
      <CardHeader>
        <div className="flex w-full flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.url} />
            <AvatarFallback>{user?.fallback}</AvatarFallback>
          </Avatar>

          <div className="flex h-full w-full items-center">
            <span className="">
              {user?.first_name} {user?.last_name}
            </span>
          </div>

          <Button variant={'ghost'} size={'icon'}>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* img */}
      <CardContent></CardContent>

      {/* caption, likes, ... */}
      <CardFooter></CardFooter>
    </Card>
  )
}
