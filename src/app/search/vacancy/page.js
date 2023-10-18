'use client'

import Header from '@/components/heder'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchedVacancies, getSpecializations, getСities, getExperiences, getSkills, getEmpType } from '@/app/store/slices/vacancySlice'
import ModalselectSpec from '@/components/ModalselectSpec'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import MyVacancies from '@/components/myvacancies'
import { useRouter } from 'next/navigation'

export default function SearchVacancy() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()
    const [isSpecModalOpen, setIsSpecModalOpen] = useState(false)

    const [q, setQ] = useState(searchParams.get("q"))
    const [specializationId, setSpecialization] = useState(searchParams.get("specializationId"))
    const [specializationName, setSpecializationName] = useState(searchParams.get("specializationName"))
    const [cityId, setCity] = useState(searchParams.get("cityId"))
    const [salary, setSalary] = useState(searchParams.get("salary"))
    const [salary_type, setSalaryType] = useState(searchParams.get("salary_type"))
    const [experienceId, setExperienceId] = useState(searchParams.get("experienceId"))
    const [employmentTypeId, setEmploymentType] = useState(searchParams.get("employmentTypeId"))

    const dispatch = useDispatch();
    const hendelSearch = ()=>{
        dispatch(getSearchedVacancies({
            q,
            specializationId,
            cityId,
            salary, 
            salary_type,
            experienceId,
            employmentTypeId,
        }, router))
    }

    useEffect (()=>{
        hendelSearch()
    }, [q, 
        specializationId,
        cityId,
        salary, 
        salary_type,
        experienceId,
        employmentTypeId,])

    useEffect(()=>{
        // hendelSearch()
        dispatch(getSpecializations())
        dispatch(getСities())
        dispatch(getExperiences())
        dispatch(getSkills())
        dispatch(getEmpType())
    }, [])

    const handleChangeExp = e =>{
        setExperienceId(e.target.value)
    }
    const closeSpecModal = () =>{
        setIsSpecModalOpen(false)
    }
    const hendelOnSpecChange = (e) => {
        setSpecialization(e.target.value * 1)
        setSpecializationName(e.target.dataset.name)
        closeSpecModal()
    }
    
    const cities = useSelector(state => state.vacancy.cities)
    const experiences = useSelector(state => state.vacancy.experiences)
    const empTypes = useSelector(state => state.vacancy.empTypes)
    // const vacancies = useSelector(state => state.vacancy.vacancies)
 
    return (
    <main>
        <Header/>
        <div className='conteiner p7 mt-7'>
            <div className='flex'>
                <fieldset className='fieldset-vertical'  style={{width:"100%"}}>
                    <input className='input' placeholder='Название' type='text' value={q} onChange={(e) => setQ(e.target.value)}/>
                </fieldset>
                <button className='button button-primary' onClick={hendelSearch}>Найти</button>
            </div>
            <div className='flex'>
                <div  style={{width:"20%"}}>
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
                </div>
                <div className='card ml-7'  style={{width:"80%", paddingLeft: "40px"}}>
                    <MyVacancies/>
                </div>
            </div>
        </div>
    </main>
  )
} 
