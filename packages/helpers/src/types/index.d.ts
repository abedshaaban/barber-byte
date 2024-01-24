export type RoleType = 'user' | 'shop' | 'admin'
export type GenderType = 'null' | 'male' | 'female'
export type AccountStatusType = 'private' | 'public'

export type ResponseType = {
  status: boolean
  message: string
  error: string
}

export type LoginProps = {
  email: string
  password: string
}

export type WorkDayType = {
  order: number
  name: string
  start_date: string
  end_date: string
  is_open: boolean
}

export type RegisterProps = LoginProps & {
  handle: string
  is_barber_shop: boolean
  img_url: null | string
  gender: GenderType
  account_status: AccountStatusType
  first_name: string
  last_name: string
  birth_date: Date
  shop_name: string
  country: string
  city: string
  street: string
  location: [number, number]
  description: null | string
  work_days: WorkDayType[]
}

export type RegisterResponseProps = ResponseType & {
  data: {
    handle: string
    first_name: string
    last_name: string
    birth_date: Date
    description: null | string
    img_url: null | string
    token: string
    role: RoleType
    gender: GenderType
    account_status: AccountStatusType
    location: [number, number]
  }
}

export type UserType = {
  handle: string
  birth_date: Date
  description: string | null
  img_url: string | undefined
  gender: GenderType
  account_status: AccountStatusType
  token: string
} & (
  | {
      role: 'user'|'admin'
      first_name: string
      last_name: string
    }
  | {
      role: 'shop'
      shop_name: string
      country: string
      city: string
      street: string
      location: [number, number]
      work_days: WorkDayType[]
    }
)

type PostType = {
  uuid: string
  caption: string | null
  img_url: string
  likes_count: number
  creator_id: string
  created_at: string
  handle: string | null
  first_name: string | null
  last_name: string | null
  name: string
  profile_url: string
}

export type AppointmentType = {
  client_id: string
  client_name: string
  description: string
  time: string
  date: string
  shop_id: string
  img_id: number | null
  img_url: string
}
