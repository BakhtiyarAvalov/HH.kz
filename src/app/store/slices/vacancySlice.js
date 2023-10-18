import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { END_POINT } from '@/config/end-point'



export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState: {
    vacancies: [],
    vacancy: {},
    specializations: {},
    cities: [],
    experiences: [],
    skills: [],
    empTypes: [],
  },

  reducers: {
    setVacancies: (state, action) => {
        state.vacancies = action.payload.vacancies
    },

    setVacancy: (state, action) => {
      state.vacancy = action.payload.vacancy
    }, 
    hendelDeleteVacancy: (state, action) => {
      let vacancies = [...state.vacancies]
      vacancies = vacancies.filter(item => item.id !== action.payload)
      state.vacancies = vacancies
    }, 
    setSpecializations: (state, action) => {
      state.specializations = action.payload
    }, 
    setCities: (state, action) => {
      state.cities = action.payload
    },
    setExps: (state, action) => {
      state.experiences = action.payload
    },
    setSkills: (state, action) => {
      state.skills = action.payload
    },
    setEmpType: (state, action) => {
      state.empTypes = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setVacancy, setVacancies, hendelDeleteVacancy, setSpecializations, setCities, setExps, setSkills, setEmpType } = vacancySlice.actions

export const getMyVacancies = () => async (dispatch) => {
    try{
        const res = await axios.get(`${END_POINT}/api/vacancy`)
        // console.log(res.data);
        dispatch(setVacancies({vacancies: res.data}))
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

export const getСities = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/region/cities`)
      // console.log(res.data);
      dispatch(setCities(res.data))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}

export const getExperiences = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/experiences`)
      // console.log(res.data);
      dispatch(setExps(res.data))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}
export const getSkills = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/skills`)
      // console.log(res.data);
      dispatch(setSkills(res.data))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}
export const getEmpType = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/employment-types`)
      // console.log(res.data);
      dispatch(setEmpType(res.data))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}

export const createVacancy = (sendData, router) => async (dispatch) => {
  try{
      const res = await axios.post(`${END_POINT}/api/vacancy`, sendData)
      router.push("/vacancy")
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}

export const deleteVacancy = (id) => async (dispatch) => {
  try{
      const res = await axios.delete(`${END_POINT}/api/vacancy/${id}`)
      dispatch(hendelDeleteVacancy(id))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
  }
}

export const getVacancyById = (id) => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/vacancy/${id}`)
      dispatch(setVacancy({vacancy: res.data}))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
    // console.log(e);
    }
}

export const getSearchedVacancies= (params, router) => async (dispatch) => {
  try{
    const{
      q,
      specializationId,
      cityId,
      salary, 
      salary_type,
      experienceId,
      employmentTypeId,
    } = params;

    let queryString = "?"
    if(q) queryString += `q = ${q}&`
    if(specializationId) queryString += `specializationId = ${specializationId}`
    if(cityId) queryString += `cityId = ${cityId}&`
    if(salary) queryString += `salary = ${salary}&`
    if(salary_type) queryString += `salary_type = ${salary_type}&`
    if(experienceId) queryString += `experienceId = ${experienceId}&`
    if(employmentTypeId) queryString += `employmentTypeId = ${employmentTypeId}&`

    router.push(`/search/vacancy${queryString}`)
      const res = await axios.get(`${END_POINT}/api/vacancy/search${queryString}`)
      console.log("vacancies",res.data);
      dispatch(setVacancies({vacancies: res.data}))
  }catch(e){
      alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
      console.log("err", e);

  }
}



// export const editResume = (sendData, router) => async (dispatch) => {
//   try{
//       const res = await axios.put(`${END_POINT}/api/resume`, sendData)
//       router.push("/resumes")
//   }catch(e){
//       alert("Что то прошло не так, сообщите о ошибке Тех. специалистам сайта!")
//   }
// }


export default vacancySlice.reducer