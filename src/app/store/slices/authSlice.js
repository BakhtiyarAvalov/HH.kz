import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    currentUser: null,
  },
  reducers: {
    authorize: (state) => {
      state.isAuth = true
    },
    logOut: (state) => {
      state.isAuth = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { authorize, logOut} = authSlice.actions

export default authSlice.reducer