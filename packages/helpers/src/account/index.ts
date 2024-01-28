import axios from 'axios'

import { Storage } from '../storage'
import { RegisterProps, UserType, WorkDayType } from '../types'

type AccountHandle = {
  handle: string
}

type ShopID = {
  shop_id: string
}

/**
 * Get user profile from handle if the user account status is public.
 * @param handle
 */
export async function getProfileByHandle({ handle }: AccountHandle): Promise<{
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
 * Get shop work days and open work hours.
 * @param shop_id
 */
export async function getShopWorkDays({ shop_id }: ShopID): Promise<{
  status: boolean
  data: WorkDayType[]
  error: string
  message: string
}> {
  let res

  try {
    res = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/shop/work_hours/${shop_id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
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

/**
 * Get a post
 * @param page optional, for pagination
 */
export async function getPosts({ page }: { page: number }): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    res = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/post/get?page=${page}`,

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error(error)
  }

  return res?.data
}

/**
 * Get a post by id
 * @param uuid
 */
export async function getPostById({ uuid }: { uuid: string }): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    res = await axios.get(`${process.env.NEXT_PUBLIC_DB_URL_APIS}/post/${uuid}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
  }

  return res?.data
}

/**
 * Get user posts by handle
 * @param handle iser handle
 */
export async function getUserPostsByHandle({ handle }: { handle: string }): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/post/get-by-handle`,
      { handle: handle },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error(error)
  }

  return res?.data
}

/**
 * Get user posts
 */
export async function getUserPosts(): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/user/get-user-posts`,

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
 * Like or unlike a post
 * @param post id
 * @param user id
 */
export async function togglePostLike({
  post_id
}: {
  post_id: string
}): Promise<{ status: boolean; data: any; error: string; message: string }> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/post/like/${post_id}`,
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

/**
 * Like or unlike a post
 * @param post id
 * @param user id
 */
export async function SharePost({
  post_id,
  platform
}: {
  post_id: string
  platform: string
}): Promise<{ status: boolean; data: any; error: string; message: string }> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/post/share/${post_id}`,
      { platform: platform },
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
 * Generate images with AI
 * @param prompt text needed to generate the image from
 * @param n number of images generated 1-10
 * @param size size of the image
 */
export async function generateImage({
  n,
  prompt,
  size
}: {
  prompt: string
  n: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  size: '256x256' | '512x512' | '1024x1024'
}): Promise<{ status: boolean; data: any; error: string; message: string }> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/user/generate-image`,
      {
        prompt: prompt,
        n: n,
        size: size
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
 * Search shops
 * @param query text to search with across handle, shop name, country, city, and street.
 * @param page page number for pagination
 */
export async function searchShop({
  query,
  page
}: {
  query: string
  page: number
}): Promise<{ status: boolean; data: any; error: string; message: string }> {
  let res

  try {
    res = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/shop?query=${query}&page=${page}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error(error)
  }

  return res?.data
}

/**
 * Get booked time reservations of a shop on a specific day.
 * @param shop_id
 * @param date
 */
export async function getShopRservations({
  shop_id,
  date
}: ShopID & { date: string }): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/shop/day-reservations`,
      {
        shop_id: shop_id,
        date: date
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
 * Create reservation for user
 * @param shop_id
 * @param date
 */
export async function createRservations({
  name,
  time,
  date,
  img_id,
  shop_id,
  description
}: ShopID & {
  date: string
  time: string
  name: string
  img_id: number
  description: string
}): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/user/create-reservations`,
      {
        name: name,
        description: description,
        time: time,
        date: date,
        img_id: img_id,
        shop_id: shop_id
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
 * Create reservation for user
 * @param shop_id
 * @param date
 */
export async function getUserReservations(): Promise<{
  status: boolean
  data: any
  error: string
  message: string
}> {
  let res

  try {
    const token = Storage({ key: 'token' })

    res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL_APIS}/user/get-reservations`,
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      }
    )
  } catch (error) {}

  return res?.data
}
