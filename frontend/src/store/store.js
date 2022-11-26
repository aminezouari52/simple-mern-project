import { createSlice, configureStore } from '@reduxjs/toolkit'

const logSlice = createSlice({
  name: 'log',
  initialState: {
    value: localStorage.getItem('loggedIn') || false,
  },
  reducers: {
    logIn(state) {
      state.value = true
      localStorage.setItem('loggedIn', true)
    },
    logOut(state) {
      state.value = false
      localStorage.setItem('loggedIn', false)
    },
  },
})

export const logActions = logSlice.actions

const store = configureStore({
  reducer: logSlice.reducer,
})

export default store
