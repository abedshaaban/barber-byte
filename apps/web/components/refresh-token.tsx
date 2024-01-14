'use client'

import { useEffect } from 'react'
import { Refresh } from '@repo/helpers/auth'
import { Storage } from '@repo/helpers/storage'
import { RootState } from '@web/provider/store'
import { setUser } from '@web/provider/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Index() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)

  async function getUserData() {
    const userData = await Refresh()

    dispatch(setUser(await userData?.data))
  }

  useEffect(() => {
    const token = Storage({ key: 'token' })

    if (token && !user) {
      async function getData() {
        await getUserData()
      }

      getData()
    }
  }, [user])

  return <></>
}
