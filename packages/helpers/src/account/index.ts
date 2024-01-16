import { UserType } from '@/types'
import axios from 'axios'

type AccountHnalde = {
  handle: string
}

/**
 * Get user profile from handle if the user account status is public.
 * @param handle
 */
export async function getProfileByHandle({ handle }: AccountHnalde): Promise<UserType> {
  let res

  try {
    res = await axios.get(`http://localhost:8000/api/account/${handle}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    // console.error(error)
  }

  return res?.data
}
