'use client'

import { useEffect } from 'react'
import { Refresh } from '@desktop/helpers'
import { RootState } from '@desktop/provider/store'
import { setUser } from '@desktop/provider/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Index() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)

  async function getUserData() {
    const res = await Refresh()
    if (res?.data?.role === 'user') {
      return
    } else {
      dispatch(setUser(res?.data))
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token && !user) {
      async function getData() {
        await getUserData()
      }

      getData()
    }
  }, [user])

  return <></>
}
