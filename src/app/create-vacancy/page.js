"use client"

import { useEffect, useState } from 'react'
import Header from '../../components/heder'
import { useDispatch } from 'react-redux'
import { getSpecializations, getСities } from '@/app/store/slices/vacancySlice'
import ModalselectSpec from '@/components/ModalselectSpec'

export default function CreateVacancy() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [specializationId, setSpecialization] = useState()
    const [cityId, setCity] = useState()
    const [isSpecModalOpen, setIsSpecModalOpen] = useState(false)
    
    const closeSpecModal = () =>{
        setIsSpecModalOpen(false)
    }
   
    useEffect(() => {
        dispatch(getSpecializations())
        dispatch(getСities())

    }, [])

    const hendelOnSpecChange = (e) => {
        // console.log(e.target.value, e);
        setSpecialization(e.target.value*1)
    }

    return (
    <main>
      <Header/>
      <div className='conteiner p7'>
        <h1>Создание вакансии</h1>
        <h2>Основная информация</h2>
        <fieldset className='fieldset-vertical'>
            <label>Название вакансии</label>
            <input className='input' placeholder='Название' type='text' value={name} onChange={() => setName(e.target.value)}/>
        </fieldset>
        <fieldset className='fieldset-vertical'>
            <label>Указать специализацию</label>
            <p className='link' onClick={() => setIsSpecModalOpen(true)} >Указать специализацию</p>
        </fieldset>
        {isSpecModalOpen && <ModalselectSpec close = {closeSpecModal}  onChange={hendelOnSpecChange} value={specializationId}/>}

        <AutoCompliteSelect placholder='' type='text' label='Город проживания' size='fieldset-md' items={cities} onSelect={(data) => setCity(data.id)} />
      
      </div>

    </main>
  )
}