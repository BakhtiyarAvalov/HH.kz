"use client"

import { useEffect, useState } from 'react'
import Header from '../../components/heder'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecializations, getСities, getExperiences, getSkills, getEmpType, createVacancy } from '@/app/store/slices/vacancySlice'
import ModalselectSpec from '@/components/ModalselectSpec'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import { handleClientScriptLoad } from 'next/script'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AutoCompliteTegs from '@/components/AutoCompliteTegs'
import { useRouter } from 'next/navigation'

export default function CreateVacancy() {

    const [isSpecModalOpen, setIsSpecModalOpen] = useState(false)
    const dispatch = useDispatch()
   
    const [name, setName] = useState("")
    const [specializationId, setSpecialization] = useState()
    const [specializationName, setSpecializationName] = useState()
    const [cityId, setCity] = useState()
    const [salary_from, setSalaryFrom] = useState("")
    const [salary_to, setSalaryTo] = useState("")
    const [salary_type, setSalaryType] = useState("KZT")
    const [address, setAddress] = useState("")
    const [experienceId, setExperienceId] = useState()
    const [description, setDescription] = useState("<h3>Обязанности</h3> <ul><li></li> <li></li></ul> <h3>Требования</h3> <ul><li></li> <li></li></ul><h3>Условия</h3><ul><li></li> <li></li></ul>")
    const [skills, setSellektedSkills] = useState([])
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
        // console.log(e.target.value, e);
        setSpecialization(e.target.value * 1)
        setSpecializationName(e.target.dataset.name)
        closeSpecModal()
    }

    const handleChangeExp = e =>{
        setExperienceId(e.target.value)
    }

    const onSkillsChange = (data) => {
        const arr = data.map(item => item.name)
        setSellektedSkills(arr.join(","))
    }
    const hendelSave = () => {
        dispatch(createVacancy({
            name, 
            specializationId: `${specializationId}`,
            cityId: `${cityId}`,
            description,
            employmentTypeId,
            salary_from, 
            salary_to, 
            salary_type, 
            address, 
            experienceId, 
            skills, 
            about_company: ""
        }, router))
    }
    
    const cities = useSelector(state => state.vacancy.cities)
    const experiences = useSelector(state => state.vacancy.experiences)
    const allSkills = useSelector(state => state.vacancy.skills)
    const empTypes = useSelector(state => state.vacancy.empTypes)

    return (
    <main>
        <Header/>
        <div className='conteiner p7'>
            <h1>Создание вакансии</h1>
            <h2>Основная информация</h2>
            <fieldset className='fieldset-vertical'>
                <label>Название вакансии</label>
                <input className='input' placeholder='Название' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
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
                    <input className='input' placeholder='От' type='text' value={salary_from} onChange={(e) => setSalaryFrom(e.target.value)}/>
                    <input className='input' placeholder='До' type='text' value={salary_to} onChange={(e) => setSalaryTo(e.target.value)}/>
                    <select className='input' onChange={e => {setSalaryType(e.target.value)}} value={salary_type}>
                        <option value={"KZT"}>KZT</option>
                        <option value={"USD"}>USD</option>
                        <option value={"RUB"}>RUB</option>
                    </select>
                </div>
            </fieldset>
            <fieldset className='fieldset-vertical'>
                <label>Адрес</label>
                <input className='input' placeholder='Введите адрес' type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
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
                <label>Расскожите про вакансию</label>
                <div>
                    <CKEditor
                            editor={ ClassicEditor }
                            data= {description}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            } }
                            config={ {
                                toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', 'undo' ]
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDescription(data)
                                // console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                // console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                // console.log( 'Focus.', editor );
                            } }
                        />
                    </div>
            </fieldset>
            <AutoCompliteTegs placholder='' type='text' label='Ключевые навыки' size='fieldset-md fieldset-vertical' items={allSkills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(",").map(item => ({name: item})) : []}/>
            <fieldset className='fieldset-vertical fieldset-md'>
                <label>Опыт работы</label>
                <div>
                    {empTypes.map(et => <div key={et.id} className='radio'>
                        <input type="radio" name='et' value = {et.id} onChange={(e) => setEmploymentType(e.target.value)}/>
                        <label>{et.name}</label>
                    </div>)}
                </div>
            </fieldset>
            <button className='button button-primary' onClick={hendelSave}>Создать</button>
        </div>
    </main>
  )
}