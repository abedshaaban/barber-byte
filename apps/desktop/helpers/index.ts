import { Storage } from '@repo/helpers/storage'
import type { LoginProps, RegisterProps, UserType } from '@repo/helpers/types'
import axios from 'axios'

export const NEXT_PUBLIC_DB_URL_APIS = 'http://localhost:8000/api'
export const NEXT_PUBLIC_PROFILE_IMAGES_URL = 'http://localhost:8000/images/ppf'
export const NEXT_PUBLIC_POST_IMAGES_URL = 'http://localhost:8000/images/posts'
export const NEXT_PUBLIC_AI_IMAGES_URL = 'http://localhost:8000/images/ai-haircut'

/**
 * Login user and return user data
 * @param LoginProps
 */
export async function Login({ email, password }: LoginProps) {
  const res = await axios.post(
    `${NEXT_PUBLIC_DB_URL_APIS}/auth/login`,
    {
      email: email,
      password: password
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )

  if (res?.data?.data) {
    Storage({ key: 'token', value: res?.data?.data?.token })
  }

  return res?.data
}

/**
 * Get user data a with token only
 */
export async function Refresh(): Promise<{
  status: boolean
  data: UserType
  error: string
  message: string
}> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${NEXT_PUBLIC_DB_URL_APIS}/auth/refresh`,
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      }
    )

    if (res?.data?.status === true) {
      Storage({ key: 'token', value: res?.data?.data?.token })
    } else {
      Storage({ key: 'token', remove: true })
    }
  } catch (error) {}

  return res?.data
}

/**
 * Logout user
 */
export async function Logout() {
  const token = Storage({ key: 'token' })

  try {
    const res = await axios.post(
      `${NEXT_PUBLIC_DB_URL_APIS}/auth/logout`,
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      }
    )

    Storage({ key: 'token', remove: true })

    return res?.data
  } catch (error) {}
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
      `${NEXT_PUBLIC_DB_URL_APIS}/user/update-profile`,
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
      `${NEXT_PUBLIC_DB_URL_APIS}/user/update-profile-img`,
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
 * Get shop reservations
 * @param image
 */
export async function GetShopReservations(): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${NEXT_PUBLIC_DB_URL_APIS}/shop/get-all-reservations`,
      {},
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
