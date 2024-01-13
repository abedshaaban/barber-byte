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

export type RegisterProps = {
  is_barber_shop: boolean
  email: string
  password: string
  first_name: string
  last_name: string
  birth_date: Date
}

export type RegisterResponseProps = ResponseType & {
  data: {
    first_name: string
    last_name: string
    birth_date: Date
    description: null | string
    img_url: null | string
    token: string
    role: RoleType
    gender: GenderType
    account_status: AccountStatusType
  }
}
