import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { END_POINT } from '@/config/end-point'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    currentUser: null,
    tokenExt: 0
  },
  reducers: {
    authorize: (state, actions) => {
      const decoded = jwt_decode(actions.payload.token);
      state.currentUser = {
        id: decoded.id,
        email: decoded.email,
        full_name: decoded.full_name,
        phone: decoded.phone,
        role: decoded.role,

      }
      state.isAuth = true
      state.tokenExt = decoded.exp
    },
    logOut: (state) => {
      state.isAuth = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { authorize, logOut} = authSlice.actions

export const sendVerificationEmail = (email) => (dispatch) => {
  axios.post(`${END_POINT}/api/auth/sendmail`,{
    email
  } )

}
export const verifycode = (email, code) => (dispatch) => {
  axios.post(`${END_POINT}/api/auth/verifycode`,{
    email, 
    code,
  } ).then(res => {
    dispatch(authorize(res.data)) 
  })

}

export default authSlice.reducer