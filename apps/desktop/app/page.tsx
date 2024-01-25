'use client'

import { useRouter } from 'next/navigation'
import { RootState } from '@desktop/provider/store'
import { useSelector } from 'react-redux'

export default function Home() {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.user)

  if (user && user.role === 'shop') {
    router.push(`/shop`)
  } else if (user && user.role === 'admin') {
    router.push(`/admin`)
  }
}
