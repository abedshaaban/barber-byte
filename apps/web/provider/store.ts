import { configureStore } from '@reduxjs/toolkit'

import selfUserReducer from './'

const store = configureStore({
  reducer: {
    selfUser: selfUserReducer
  }
})

export default store
