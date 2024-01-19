'use client'

import Post from '@web/components/post'
import { RootState } from '@web/provider/store'
import { useSelector } from 'react-redux'

export default function Logic() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div>
      <Post />
    </div>
  )
}
