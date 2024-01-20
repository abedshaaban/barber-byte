import axios from 'axios'
import { nanoid } from 'nanoid'

import { Storage } from '../storage'
import type { LoginProps, RegisterProps, RegisterResponseProps, UserType } from '../types'

/**
 * Register a user as a normal user type or barber shop depending on the params passed
 * @param RegisterProps
 */
export async function Register({
  is_barber_shop,
  birth_date,
  first_name,
  last_name,
  email,
  password,
  shop_name,
  country,
  city,
  street,
  location,
  work_days
}: RegisterProps): Promise<{
  status: boolean
  data: RegisterResponseProps
  error: string
  message: string
}> {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_DB_URL_APIS}/auth/register`,
    {
      handle: nanoid(9),
      is_barber_shop: is_barber_shop,
      first_name: first_name,
      last_name: last_name,
      birth_date: birth_date,
      email: email,
      password: password,
      shop_name: shop_name,
      country: country,
      city: city,
      street: street,
      location: location,
      work_days: work_days
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
 * Login user and return user data
 * @param LoginProps
 */
export async function Login({ email, password }: LoginProps) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_DB_URL_APIS}/auth/login`,
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
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/auth/refresh`,
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
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/auth/logout`,
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
  } catch (error) {
    console.log(error)
  }
}
