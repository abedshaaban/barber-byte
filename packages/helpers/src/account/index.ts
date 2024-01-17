import { RegisterProps, UserType } from '@/types'
import axios from 'axios'

import { Storage } from '../storage'

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

/**
 * Update user profile
 * @param RegisterProps
 */
export async function updateProfile({
  birth_date,
  first_name,
  last_name,
  shop_name,
  country,
  city,
  street,
  location,
  handle,
  img_url,
  gender,
  account_status,
  description
}: RegisterProps): Promise<RegisterProps> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `http://localhost:8000/api/user/update-profile`,
      {
        handle: handle,
        description: description,
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        shop_name: shop_name,
        country: country,
        city: city,
        street: street,
        location: location,
        img_url: img_url,
        gender: gender === 'male' ? 1 : gender === 'female' ? 2 : 3,
        account_status:
          account_status === 'public' ? 1 : account_status === 'private' ? 2 : null
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      }
    )
  } catch (error) {
    console.error(error)
  }

  return res?.data
}
