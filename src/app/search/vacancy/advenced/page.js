"use client"

import { useEffect, useState } from 'react'
import Header from '@/components/heder'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecializations, getСities, getExperiences, getSkills, getEmpType } from '@/app/store/slices/vacancySlice'
import ModalselectSpec from '@/components/ModalselectSpec'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SearchVacancyAdvenced() {

    const [isSpecModalOpen, setIsSpecModalOpen] = useState(false)
    const dispatch = useDispatch()
   
    const [q, setQ] = useState("")
    const [specializationId, setSpecialization] = useState()
    const [specializationName, setSpecializationName] = useState()
    const [cityId, setCity] = useState()
    const [salary, setSalary] = useState("")
    const [salary_type, setSalaryType] = useState("KZT")
    const [experienceId, setExperienceId] = useState()
    const [employmentTypeId, setEmploymentType] = useState()

    const closeSpecModal = () =>{
        setIsSpecModalOpen(false)
    }
   
    useEffect(() => {
        dispatch(getSpecializations())
        dispatch(getСities())
        dispatch(getExperiences())
        dispatch(getSkills())
        dispatch(getEmpType())
    }, [])

    const router = useRouter()

    const hendelOnSpecChange = (e) => {
        setSpecialization(e.target.value * 1)
        setSpecializationName(e.target.dataset.name)
        closeSpecModal()
    }

    const handleChangeExp = e =>{
        setExperienceId(e.target.value)
    }

    const hendelSearch = () => {
        let queryString = "?"
        if(q) queryString += `q = ${q}&`
        if(specializationId) queryString += `specializationId = ${specializationId}`
        if(cityId) queryString += `cityId = ${cityId}&`
        if(salary) queryString += `salary = ${salary}&`
        if(salary_type) queryString += `salary_type = ${salary_type}&`
        if(experienceId) queryString += `experienceId = ${experienceId}&`
        if(employmentTypeId) queryString += `employmentTypeId = ${employmentTypeId}&`

        router.push(`/search/vacancy${queryString}`)
    }
    
    const cities = useSelector(state => state.vacancy.cities)
    const experiences = useSelector(state => state.vacancy.experiences)
    const empTypes = useSelector(state => state.vacancy.empTypes)

    return (
    <main>
        <Header/>
        <div className='conteiner p7'>
            <h1>Поиск вакансии</h1>
            <fieldset className='fieldset-vertical'>
                <label>Ключевые слова</label>
                <input className='input' placeholder='Название' type='text' value={q} onChange={(e) => setQ(e.target.value)}/>
            </fieldset>
            <fieldset className='fieldset-vertical'>
                <label>Указать специализацию</label>
                {specializationName && <p>{specializationName}</p>}
                <p className='link' onClick={() => setIsSpecModalOpen(true)} >Указать специализацию</p>
            </fieldset>
            {isSpecModalOpen && <ModalselectSpec close = {closeSpecModal}  onChange={hendelOnSpecChange} value={specializationId * 1}/>}
            <AutoCompliteSelect placholder='' type='text' label='Город проживания' size='fieldset-md fieldset-vertical' items={cities} onSelect={(data) => setCity(data.id)} />
            <fieldset className='fieldset-vertical fieldset-md'>
                <label>Предпологаемый уровень дохода в месяц</label>
                <div className='input-group'>
                    <input className='input' placeholder='От' type='text' value={salary} onChange={(e) => setSalary(e.target.value)}/>
                    <select className='input' onChange={e => {setSalaryType(e.target.value)}} value={salary_type}>
                        <option value={"KZT"}>KZT</option>
                        <option value={"USD"}>USD</option>
                        <option value={"RUB"}>RUB</option>
                    </select>
                </div>
            </fieldset>
            <fieldset className='fieldset-vertical fieldset-md'>
                <label>Опыт работы</label>
                <div>
                    {experiences.map(exp => <div key={exp.id} className='radio'>
                        <input type="radio" name='exp' value = {exp.id} onChange={handleChangeExp}/>
                        <label>{exp.duration}</label>
                    </div>)}
                </div>
            </fieldset>
            <fieldset className='fieldset-vertical fieldset-md'>
                <label>Тип занятости</label>
                <div>
                    {empTypes.map(et => <div key={et.id} className='radio'>
                        <input type="radio" name='et' value = {et.id} onChange={(e) => setEmploymentType(e.target.value)}/>
                        <label>{et.name}</label>
                    </div>)}
                </div>
            </fieldset>
            <button className='button button-primary' onClick={hendelSearch()}>Поиск</button>
        </div>
    </main>
  )
}