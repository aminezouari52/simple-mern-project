import { createSlice, configureStore } from '@reduxjs/toolkit'

const logSlice = createSlice({
  name: 'log',
  initialState: {
    value: localStorage.getItem('loggedIn') || false,
    id: localStorage.getItem('id') || false,
  },
  reducers: {
    logIn(state, action) {
      state.value = true
      state.id = false
      localStorage.setItem('loggedIn', true)
      localStorage.setItem('id', action.payload)
    },
    logOut(state) {
      state.value = false
      state.id = false
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
