'use client'

import { RootState } from '@desktop/provider/store'
import { useSelector } from 'react-redux'

export default function Home() {
  const user = useSelector((state: RootState) => state.user)

  console.log(user.user)
  return <div>hello word</div>
}
