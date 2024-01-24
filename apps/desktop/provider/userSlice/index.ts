import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserType } from '@repo/helpers/types'

interface UserState {
  user: UserType | null
}

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload
    },

    logoutUser: (state) => {
      state.user = null
    }
  }
})

export const setUser = createAction<PayloadAction<UserType | null>>('user/setUser')
export const logoutUser = createAction('user/logoutUser')

const userReducer = userSlice.reducer
export default userReducer
