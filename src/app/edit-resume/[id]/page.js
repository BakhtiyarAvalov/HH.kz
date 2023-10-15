'use client'
import Header from '@/components/heder'
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
import { useRouter, useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { editResume, getResumeById } from '@/app/store/slices/resumeSlice'

export default function CreateResume() {
  
    //     id - должен совпадать с названием папки
    const {id} = useParams();
    const resume = useSelector(state => state.resume.resume)
  
  const router = useRouter()
  const dispatch = useDispatch()

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
  const [foreignLanguages, setForeignLanguages] = useState([])
  const [employmentTypes, setSelectedEmptTypes] = useState([])
  const [about, setAbout] = useState("")

  useEffect(()=>{

    dispatch(getResumeById(id))
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

  useEffect(() => {
    if(resume.id){
        setCity(resume.cityId)
        setName(resume.first_name)
        setSurname(resume.last_name)
        setPhone(resume.phone)
        setSelectedEmptTypes(resume.employmentTypes.map(et => et.id))
        setGendr(resume.gender)
        setPosition(resume.position)
        setCitizenship(resume.citizenship)
        setSalary(resume.salary)
        setSalaryType(resume.salary_type)
        setWorkingHistories(resume.workingHistories)
        setAbout(resume.about)
        setSellektedSkills(resume.skills)
        setEducation(resume.education)
        setForeignLanguages(resume.foreignLanguages)
    }
  }, [resume])

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
    dispatch(editResume(
      {
        id: resume.id,
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

  let eds = education.map(ed => {
    const end = new Date(ed.end_date)
    return{
    ...ed,
    end_date: end.getFullYear()
    }
})

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
        <Input placholder='' type='text' label='Имя' size='fieldset-md' onChange={(e) => setName(e.target.value)} value={first_name}/>
        <Input placholder='' type='text' label='Фамилия' size='fieldset-md' onChange={(e) => setSurname(e.target.value)} value={last_name}/>
        <Input placholder='' type='text' label='Мобильный телефон' size='fieldset-md'onChange={(e) => setPhone(e.target.value)} value={phone}/>
        <AutoCompliteSelect placholder='' type='text' label='Город проживания' size='fieldset-md' items={cities} onSelect={(data) => setCity(data.id)} selected={cityId}/>

         <h3>Основная информация</h3>
        <SelectDate size="fieldcet-md" label="Дата рождения" onChange={(date) => setBirthday(date)} value={resume.birthday}/>
        
        <fieldset className={"fieldset fieldset-sm"}>
           <label>Пол</label>
           <div className='radio-group'>
            <div className="radio" >
                {resume.gender && resume.gender === "Мужской" && <input type="radio" onChange={hendleGendreChange} name="gender" id='g1' value={"Мужской"} checked/>}
                {!resume.gender || resume.gender !== "Мужской" && <input type="radio" onChange={hendleGendreChange} name="gender" id='g1' value={"Мужской"} />}
              <label htmlFor='g1'>Мужской</label>
            </div>
             <div className="radio">
                {resume.gender && resume.gender === "Женский" && <input type="radio" onChange={hendleGendreChange} name="gender" id='g1' value={"Женский"} checked/>}
                {!resume.gender || resume.gender !== "Женский" && <input type="radio" onChange={hendleGendreChange} name="gender" id='g1' value={"Женский"} />}
              <label htmlFor='g2'>Женский</label>
             </div>
           </div>
        </fieldset>
        
        <AutoCompliteSelect placholder='' type='text' label='Гражданство' size='fieldset-md' items={countries} onSelect={(data) => setCitizenship(data.id)} selected={citizenship}/>
       
        <h3>Специальность</h3>
        <Input placholder='' type='text' label='Желаемо должность' size='fieldset-lg' onChange={(e) => setPosition(e.target.value)} value={position}/>
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
        <AddEducation onChange={(eds) => setEducation(eds)} education={eds}/>

        <h3>Владение языками</h3>
        <AddLang onChange={(lns) => setForeignLanguages(lns)} foreignLanguages={foreignLanguages}  setForeignLanguages={setForeignLanguages}/>

        <h3>Другая важная информация</h3>
        <SelectEmploymentTypes label="Занятость" size="fieldset-md" allEmploymentTypes={allEmploymentTypes} onChange={(tps) => (setSelectedEmptTypes(tps))} employmentTypes={employmentTypes}/>
      
        <button onClick={handleSave} className='button button-primary'> Сохранить и опубликовать </button>
      </div> 
      
    </main>
  )
}