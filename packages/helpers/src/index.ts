import {
  createPost,
  getProfileByHandle,
  updateProfile,
  updateProfileImage
} from './account'
import { Login, Logout, Refresh, Register } from './auth'
import { ClearStorage, Storage } from './storage'
import {
  AccountStatusType,
  GenderType,
  LoginProps,
  RegisterProps,
  RegisterResponseProps,
  ResponseType,
  RoleType,
  UserType
} from './types'

export {
  getProfileByHandle,
  updateProfile,
  updateProfileImage,
  Login,
  Logout,
  Refresh,
  Register,
  ClearStorage,
  Storage,
  createPost
}

export type {
  AccountStatusType,
  GenderType,
  LoginProps,
  RegisterProps,
  RegisterResponseProps,
  ResponseType,
  RoleType,
  UserType
}
