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

export type RegisterProps = LoginProps & {
  handle: string
  is_barber_shop: boolean
  first_name: string
  last_name: string
  birth_date: Date
  shop_name: string
  country: string
  city: string
  street: string
  location: [number, number]
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
  description: null | string
  img_url: null | string
  gender: GenderType
  account_status: AccountStatusType
  token: string
} & (
  | {
      role: 'user'
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
    }
)
