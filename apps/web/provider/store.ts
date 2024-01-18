import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './userSlice'

export const store: any = configureStore({
  reducer: {
    user: UserReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
