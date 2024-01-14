import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer
