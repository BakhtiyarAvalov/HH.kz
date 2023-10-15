'use client'
import Header from '../../components/heder'
import Input from '@/components/input'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import SelectDate from '@/components/SelectDate'
import ModalAddExp from '@/components/ModalAddExp'
import WorkingHistory from '@/components/WorkingHistory'
import AutoCompliteTegs from '@/components/AutoCompliteTegs'
import AddEducation from '@/components/AddEducation'
import AddLang from '@/components/AddLang'
import SelectEmploymentTypes from '@/components/SelectEmploymentTypes'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { createResume } from '@/app/store/slices/resumeSlice'

export default function CreateResume() {
  
  const router = useRouter()
  const dispatch = useDispatch

  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  const [allSkills, setSkills] = useState([])
  const [allEmploymentTypes, setEmploymentTypes] = useState([])
  const [modalExpIsOpen, setModalExpIsOpen]=useState(false)
  const [workingHistories, setWorkingHistories] = useState([])
  const [first_name, setName] = useState("")
  const [last_name, setSurname] = useState("")
  const [phone, setPhone] = useState("")
  const [cityId, setCity] = useState()
  const [birthday, setBirthday] = useState()
  const [gender, setGendr] = useState("")
  const [citizenship, setCitizenship] = useState()
  const [position, setPosition] = useState("")
  const [salary, setSalary] = useState()
  const [salary_type, setSalaryType] = useState("KZT")
  const [skills, setSellektedSkills] = useState([])
  const [education, setEducation] = useState([])
  const [foreignLanguages, setForeignLanguages] = useState("")
  const [employmentTypes, setSelectedEmptTypes] = useState([])
  const [about, setAbout] = useState("")

  useEffect(()=>{
    axios.get(`${END_POINT}/api/region/cities`).then(res => {
      setCities(res.data)
    })
    axios.get(`${END_POINT}/api/region/countries`).then(res => {
      setCountries(res.data)
    })
    axios.get(`${END_POINT}/api/skills`).then(res => {
      setSkills(res.data)
    })
    axios.get(`${END_POINT}/api/employment-types`).then(res => {
      setEmploymentTypes(res.data)
    })

  },[])

  const closeModalExp = () => {
    setModalExpIsOpen(false)
  }
  const addWorkingHistory = (item) =>{
    setWorkingHistories([...workingHistories, item])
    closeModalExp()
  }
  const removeWorkingHistory = (workingHistory) => {
    let wh = [...workingHistories]
    let index = workingHistories.indexOf(workingHistory)
    wh.splice(index, 1)
    setWorkingHistories(wh)
  }
  const hendleGendreChange = (e)=>{
    setGendr(e.target.value)
  }
  const onSkillsChange = (data) => {
    const arr = data.map(item => item.name)
    setSellektedSkills(arr.join(","))
  }
  const handleSave = () => {
    dispatch(createResume(
      {
        first_name,
        last_name,
        phone,
        cityId,
        birthday,
        gender,
        about,
        citizenship,
        position,
        salary,
        salary_type,
        skills,
        education,
        foreignLanguages,
        employmentTypes,
        workingHistories,
        main_language: "",
      },
      router
    ))
  }

  // console.log("onSave", {
  //   first_name,
  //   last_name,
  //   phone,
  //   cityId,
  //   birthday,
  //   gender,
  //   about,
  //   citizenship,
  //   position,
  //   salary,
  //   salary_type,
  //   skills,
  //   education,
  //   foreinLanguages,
  //   employmentTypes,
  //   workingHistories,
  // });

  return (
    <main>
      <Header/>
      <div className='container p7'>
        <h1>Ваше резюме</h1>
        <h3>Контактные данные</h3>
        <Input placholder='' type='text' label='Имя' size='fieldset-md' onChange={(e) => setName(e.target.value)}/>
        <Input placholder='' type='text' label='Фамилия' size='fieldset-md' onChange={(e) => setSurname(e.target.value)}/>
        <Input placholder='' type='text' label='Мобильный телефон' size='fieldset-md'onChange={(e) => setPhone(e.target.value)}/>
        <AutoCompliteSelect placholder='' type='text' label='Город проживания' size='fieldset-md' items={cities} onSelect={(data) => setCity(data.id)} />

         <h3>Основная информация</h3>
        <SelectDate size="fieldcet-md" label="Дата рождения" onChange={(date) => setBirthday(date)}/>
        
        <fieldset className={"fieldset fieldset-sm"}>
           <label>Пол</label>
           <div className='radio-group'>
            <div className="radio" >
              <input type="radio" onChange={hendleGendreChange} name="gender" id='g1' value={"Мужской"}/>
              <label htmlFor='g1'>Мужской</label>
            </div>
             <div className="radio">
              <input type="radio" onChange={hendleGendreChange} name="gender" id='g2' value={"Женский"}/>
              <label htmlFor='g2'>Женский</label>
             </div>
           </div>
        </fieldset>
        
        <AutoCompliteSelect placholder='' type='text' label='Гражданство' size='fieldset-md' items={countries} onSelect={(data) => setCitizenship(data.id)}/>
       
        <h3>Специальность</h3>
        <Input placholder='' type='text' label='Желаемо должность' size='fieldset-lg' onChange={(e) => setPosition(e.target.value)}/>
        <fieldset className={"fieldset fieldset-sm"}>
           <label>Зарплата</label>
           <div className='salary'>
             <input className='input' placholder='' type='number' size='fieldset-lg' onChange={e => {setSalary(e.target.value)*1}} value={salary}/>
             <select className='input' onChange={e => {setSalaryType(e.target.value)}} value={salary_type}>
              <option value={"KZT"}>KZT</option>
              <option value={"USD"}>USD</option>
              <option value={"RUB"}>RUB</option>
             </select>
             на руки
           </div>
        </fieldset>

        <h3>Опыт работы</h3>
        {modalExpIsOpen && <ModalAddExp close = {closeModalExp} addWorkingHistory={addWorkingHistory}/>}
        <fieldset className={"fieldset fieldset-lg"}>
           <label>Места работы</label>
           <div className='exp'>
              {workingHistories.map(item => (<WorkingHistory workingHistory = {item} remove={removeWorkingHistory}/>))}
              <button onClick={()=>setModalExpIsOpen(true)} className='button button-primary-borderd'>Добавить место работы</button>
           </div>
        </fieldset>
        <fieldset className={"fieldset fieldset-lg"}>
           <label>О себе</label>
            <textarea className="textarea" placeholder= "Расскожите о себе" onChange={(e) => setAbout(e.target.value)} value={about}></textarea>
        </fieldset>

        <AutoCompliteTegs placholder='' type='text' label='Ключевые навыки' size='fieldset-md' items={allSkills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(",").map(item => ({name: item})) : []}/>
        
        <h3>Образование</h3>
        <AddEducation onChange={(eds) => setEducation(eds)} education={[]}/>

        <h3>Владение языками</h3>
        <AddLang onChange={(lns) => setForeignLanguages(lns)} foreignLanguages={[]}/>

        <h3>Другая важная информация</h3>
        <SelectEmploymentTypes label="Занятость" size="fieldset-md" allEmploymentTypes={allEmploymentTypes} onChange={(tps) => (setSelectedEmptTypes(tps))} employmentTypes={[]}/>
      
        <button onClick={handleSave} className='button button-primary'> Сохранить и опубликовать </button>
      </div> 
      
    </main>
  )
}