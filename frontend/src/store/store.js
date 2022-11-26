import { createSlice, configureStore } from '@reduxjs/toolkit'

const logSlice = createSlice({
  name: 'log',
  initialState: {
    value: false,
  },
  reducers: {
    logIn: (state) => {
      state.value = true
      console.log('hello from login slice')
    },
    logOut: (state) => {
      state.value = false
    },
  },
})

export const logActions = logSlice.actions

const store = configureStore({
  reducer: logSlice.reducer,
})

export default store
