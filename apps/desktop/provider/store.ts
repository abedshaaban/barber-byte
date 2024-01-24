import { configureStore } from '@reduxjs/toolkit'
import { UserType } from '@repo/helpers/types'

import UserReducer from './userSlice'

export const store = configureStore({
  reducer: {
    user: UserReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
