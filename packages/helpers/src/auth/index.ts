import { LocalStorage } from '@/storage'
import type { RegisterProps, RegisterResponseProps } from '@/types'
import axios from 'axios'

export async function Register({
  is_barber_shop,
  birth_date,
  first_name,
  last_name,
  email,
  password
}: RegisterProps): Promise<RegisterResponseProps> {
  const res = await axios.post(
    'http://127.0.0.1:8000/api/auth/register',
    {
      is_barber_shop: is_barber_shop,
      first_name: first_name,
      last_name: last_name,
      birth_date: birth_date,
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

  localStorage.setItem('token', res?.data?.data?.token)

  return res?.data
}

export function Login() {}
