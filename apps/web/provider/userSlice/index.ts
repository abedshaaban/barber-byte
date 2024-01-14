import type { } from '@repo/helpers/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null
}

export const selfUserSlice = createSlice({
  name: 'selfUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (window.localStorage && action.payload?.token) {
        window.localStorage.setItem('cookie', action.payload?.token)
      }

      state.user = action.payload
    },

    logoutUser: (state) => {
      state.user = null
    }
  }
})

export const { setUser, logoutUser } = selfUserSlice.actions
export default selfUserSlice.reducer
