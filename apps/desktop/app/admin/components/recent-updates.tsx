'use client'

import { useEffect, useState } from 'react'
import { GetRecentUpdatedUsers, NEXT_PUBLIC_PROFILE_IMAGES_URL } from '@desktop/helpers'
import { UserType } from '@repo/helpers/types'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'

export default function RecentUpdates() {
  const [users, setUsers] = useState([])
  function formatDateTime(dateTimeString: string) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    }).format(new Date(dateTimeString))

    const formattedDateTime =
      formattedDate +
      ' ' +
      new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).format(new Date(dateTimeString))

    return formattedDateTime
  }

  useEffect(() => {
    async function getData() {
      const res = await GetRecentUpdatedUsers()

      console.log(res.data)

      if (res.status === true) {
        setUsers(res.data)
      }
    }

    getData()
  }, [])

  return (
    <div>
      <div className="space-y-8">
        {users &&
          users?.map((item: any, index) => {
            return (
              <div className="flex items-center" key={index}>
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`${NEXT_PUBLIC_PROFILE_IMAGES_URL}/${item?.img_url}`}
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    {item.role_id === 2 ? (
                      item?.shop?.name[0]
                    ) : (
                      <>
                        {item?.first_name[0].toUpperCase()}{' '}
                        {item?.last_name[0].toUpperCase()}
                      </>
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {item.role_id === 2 ? (
                      item?.shop?.name
                    ) : (
                      <>
                        {item?.first_name} {item?.last_name}
                      </>
                    )}
                  </p>
                  <p className="text-muted-foreground text-sm">{item?.email}</p>
                </div>
                <div className="ml-auto font-medium">
                  {formatDateTime(item?.updated_at)}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
