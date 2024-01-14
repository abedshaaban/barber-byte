import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserType } from '@repo/helpers/types'

const initialState: UserType | null = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserType | null, action: PayloadAction<UserType | null>) => {
      state = action.payload
    },

    logoutUser: (state) => {
      state = null
    }
  }
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer
