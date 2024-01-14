import type { LoginProps, RegisterProps, RegisterResponseProps } from '@/types'
import axios from 'axios'
import { nanoid } from 'nanoid'

import { Storage } from '../storage'

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
  location
}: RegisterProps): Promise<RegisterResponseProps> {
  const res = await axios.post(
    `http://localhost:8000/api/auth/register`,
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
      location: location
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

export async function Login({ email, password }: LoginProps) {
  const res = await axios.post(
    `http://localhost:8000/api/auth/login`,
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

export async function Refresh() {
  const token = Storage({ key: 'token' })

  const res = await axios.post(
    `http://localhost:8000/api/auth/refresh`,
    {},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }
    }
  )

  if (res?.data?.data) {
    Storage({ key: 'token', value: res?.data?.data?.token })
  }

  return res?.data
}
