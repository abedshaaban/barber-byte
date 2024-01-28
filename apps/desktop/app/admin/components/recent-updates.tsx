'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'

export default function RecentUpdates() {
  return (
    <div>
      <div className="space-y-8">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Olivia Martin</p>
            <p className="text-muted-foreground text-sm">olivia.martin@email.com</p>
          </div>
          <div className="ml-auto font-medium">+$1,999.00</div>
        </div>
      </div>
    </div>
  )
}
