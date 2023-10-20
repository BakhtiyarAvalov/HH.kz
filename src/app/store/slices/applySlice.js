import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { END_POINT } from '@/config/end-point'


let initialState = {
  applies: [],
  apply: {},
}
// console.log(token);


export const applySlice = createSlice({
  name: 'apply',
   initialState,

  reducers: {
    appendApply: (state, actions) => {
        state.applies = [...state.applies, actions.payload]
    },
    setApplises: (state, actions) => {
        state.applies =  actions.payload
    },
    removeApply: (state, actions) => {
        let applies = [...state.applies]
        applies = applies.filter(item => item.id !== actions.payload)
        state.applies = applies
    }
  },
})

// Action creators are generated for each case reducer function
export const {removeApply, appendApply, setApplises} = applySlice.actions


export const getEmployeeApplies = (data) => (dispatch) => {
  axios.get(`${END_POINT}/api/applies/employee`, data).then(res =>{
    dispatch(setApplises(res.data))
  }).catch(e =>{
    console.log(e);
  })

}
export const createApplies = (data) => (dispatch) => {
    axios.post(`${END_POINT}/api/applies`, data).then(res =>{
      dispatch(appendApply(res.data))
    }).catch(e =>{
      console.log(e);
    })
}

export const deleteApplies = (id) => (dispatch) => {
    axios.delete(`${END_POINT}/api/applies/${id}`).then(res =>{
      dispatch(removeApply(id))
    }).catch(e =>{
      console.log(e);
    })
  
  }
export default applySlice.reducer