import axios from 'axios'

import { Storage } from '../storage'
import { RegisterProps, UserType } from '../types'

type AccountHnalde = {
  handle: string
}

/**
 * Get user profile from handle if the user account status is public.
 * @param handle
 */
export async function getProfileByHandle({ handle }: AccountHnalde): Promise<{
  status: boolean
  data: UserType
  error: string
  message: string
}> {
  let res

  try {
    res = await axios.get(`${process.env.NEXT_PUBLIC_DB_URL_APIS}/account/${handle}`, {
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
}: RegisterProps): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/user/update-profile`,
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
          account_status === 'public' ? 2 : account_status === 'private' ? 1 : null
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

/**
 * Update user's profile image
 * @param image
 */
export async function updateProfileImage({
  img_url
}: {
  img_url: File
}): Promise<{ status: boolean; data: any; error: string; message: string }> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/user/update-profile-img`,
      {
        img_url: img_url
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`
        }
      }
    )
  } catch (error) {
    console.error(error)
  }

  return res?.data
}

/**
 * Preate a post
 * @param image
 * @param caption optional
 */
export async function createPost({
  img_url,
  caption
}: {
  img_url: File | null
  caption?: string
}): Promise<{ status: boolean; data: any; error: string; message: string }> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/user/create-post`,
      {
        img_url: img_url,
        caption: caption
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`
        }
      }
    )
  } catch (error) {
    console.error(error)
  }

  return res?.data
}
