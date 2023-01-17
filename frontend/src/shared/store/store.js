import { createSlice, configureStore } from '@reduxjs/toolkit'

const logSlice = createSlice({
  name: 'log',
  initialState: {
    value: localStorage.getItem('loggedIn') || false,
  },
  reducers: {
    logIn(state, action) {
      state.value = true
      localStorage.setItem('loggedIn', true)
      localStorage.setItem('id', action.payload)
    },
    logOut(state) {
      state.value = false
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('id')
    },
  },
})

export const logActions = logSlice.actions

const store = configureStore({
  reducer: logSlice.reducer,
})

export default store
