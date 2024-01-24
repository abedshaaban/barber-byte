import type { LoginProps,UserType } from '@repo/helpers/types'
import  { Storage} from '@repo/helpers/storage'
import axios from 'axios'

/**
 * Login user and return user data
 * @param LoginProps
 */
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
        `http://localhost:8000/api/auth/logout`,
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
  