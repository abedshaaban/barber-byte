'use client'

import { RootState } from '@desktop/provider/store'
import { useSelector } from 'react-redux'

export default function Home() {
  const user = useSelector((state: RootState) => state.user)

  if (user.user && user.user.role === 'user') {
    return <div>{user.user === null ? 'no user' : user.user.first_name}</div>
  }
}
