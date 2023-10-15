import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { END_POINT } from '@/config/end-point'



export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState: {
    vacancies: [],
    vacancy: {},
    specializations: {}
  },

  reducers: {
    setMyVacancies: (state, action) => {
        state.vacancies = action.payload.vacancies
    },
    // uppendVacancy: (state, action) => {
    //   state.vacancies = [...state.vacancies, action.payload.vacancy]
    // },
    // setVacancies: (state, action) => {
    //   state.vacancy = action.payload.vacancy
    // }, 
    // hendelDeleteVacancy: (state, action) => {
    //   let vacancies = [...state.vacancies]
    //   vacancies = vacancies.filter(item => item.id !== action.payload)
    //   state.vacancy = vacancies
    // }, 
    setSpecializations: (state, action) => {
      state.specializations = action.payload
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { setMyVacancies, uppendVacancy, setVacancies, hendelDeleteVacancy, setSpecializations } = vacancySlice.actions

export const getMyVacancies = () => async (dispatch) => {
    try{
        const res = await axios.get(`${END_POINT}/api/vacancy`)
        // console.log(res.data);
        dispatch(setMyVacancies({vacancies: res.data}))
    }catch(e){
        alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
    }
}

export const getSpecializations = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/specializations`)
      // console.log(res.data);
      dispatch(setSpecializations(res.data))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}

// export const getResumeById = (id) => async (dispatch) => {
//   try{
//       const res = await axios.get(`${END_POINT}/api/resume/${id}`)
//       console.log("test", res.data);
//       dispatch(setResume({resume: res.data}))
//   }catch(e){
//       alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
//     // console.log(e);
//     }
// }


// export const createResume = (sendData, router) => async (dispatch) => {
//   try{
//       const res = await axios.post(`${END_POINT}/api/resume`, sendData)
//       router.push("/resumes")
//       // console.log(res.data);
//       // console.log(e);
//       dispatch(uppendResume({newresume: res.data}))
//   }catch(e){
//       alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
//   }
// }

// export const editResume = (sendData, router) => async (dispatch) => {
//   try{
//       const res = await axios.put(`${END_POINT}/api/resume`, sendData)
//       router.push("/resumes")
//   }catch(e){
//       alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
//   }
// }
// export const deleteResume = (id) => async (dispatch) => {
//   try{
//       const res = await axios.delete(`${END_POINT}/api/resume/${id}`)
//       dispatch(hendelDeleteResume(id))
//   }catch(e){
//       alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
//   }
// }

export default vacancySlice.reducer