import { UserType } from '@/types'
import axios from 'axios'

type AccountHnalde = {
  handle: string
}

export async function getProfileByHandle({ handle }: AccountHnalde): Promise<UserType> {
  const res = await axios.get(`http://localhost:8000/api/account/${handle}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return res?.data
}
