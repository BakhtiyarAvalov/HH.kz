import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { END_POINT } from '@/config/end-point'



export const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: [],
    resume: {},
  },

  reducers: {
    setMyResumes: (state, action) => {
        state.resumes = action.payload.resumes
    },
    uppendResume: (state, action) => {
      state.resumes = [...state.resumes, action.payload.newresume]
    },
    setResume: (state, action) => {
      state.resume = action.payload.resume
    }, 
    hendelDeleteResume: (state, action) => {
      let resumes = [...state.resumes]
      resumes = resumes.filter(item => item.id !== action.payload)
      state.resume = resumes
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { setMyResumes, uppendResume, setResume, hendelDeleteResume } = resumeSlice.actions

export const getMyResumes = () => async (dispatch) => {
    try{
        const res = await axios.get(`${END_POINT}/api/resume`)
        // console.log(res.data);
        dispatch(setMyResumes({resumes: res.data}))
    }catch(e){
        alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
    }
}

export const getResumeById = (id) => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/resume/${id}`)
      console.log("test", res.data);
      dispatch(setResume({resume: res.data}))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
    // console.log(e);
    }
}


export const createResume = (sendData, router) => async (dispatch) => {
  try{
      const res = await axios.post(`${END_POINT}/api/resume`, sendData)
      router.push("/resumes")
      // console.log(res.data);
      // console.log(e);
      dispatch(uppendResume({newresume: res.data}))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}

export const editResume = (sendData, router) => async (dispatch) => {
  try{
      const res = await axios.put(`${END_POINT}/api/resume`, sendData)
      router.push("/resumes")
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}
export const deleteResume = (id) => async (dispatch) => {
  try{
      const res = await axios.delete(`${END_POINT}/api/resume/${id}`)
      dispatch(hendelDeleteResume(id))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}

export default resumeSlice.reducer