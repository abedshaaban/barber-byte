'use client'

import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

export default function page() {
  const user = useSelector((state: RootState) => state.user)

  console.log(user)
  return <div>-{user?.user?.role}-</div>
}
