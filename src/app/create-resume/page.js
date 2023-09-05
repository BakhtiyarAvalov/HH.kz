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
export default function CreateResume() {
  
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  const [skills, setSkills] = useState([])
  const [employmentTypes, setEmploymentTypes] = useState([])
  const [modalExpIsOpen, setModalExpIsOpen]=useState(false)
  const [workingHistories, setWorkingHistories] = useState([])

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

  const onSelect = (data) =>{
    console.log(data);
  }
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
  return (
    <main>
      <Header/>
      <div className='container'>
        <h1>Ваше резюме</h1>
        <h3>Контактные данные</h3>
        <Input placholder='' type='text' label='Имя' size='fieldset-md'/>
        <Input placholder='' type='text' label='Фамилия' size='fieldset-md'/>
        <Input placholder='' type='text' label='Мобильный телефон' size='fieldset-md'/>
        <AutoCompliteSelect placholder='' type='text' label='Город проживания' size='fieldset-md' items={cities} onSelect={onSelect}/>

        <h3>Основная информация</h3>
        <SelectDate size="fieldcet-md" label="Дата рождения"/>
        <fieldset className={"fieldset fieldset-sm"}>
           <label>Пол</label>
           <div className='radio-group'>
            <div className="radio" >
              <input type="radio" name="gender" id='g1'/>
              <label htmlFor='g1'>Мужской</label>
            </div>
             <div className="radio">
              <input type="radio" name="gender" id='g2'/>
              <label htmlFor='g2'>Женский</label>
             </div>
           </div>
        </fieldset>
        <AutoCompliteSelect placholder='' type='text' label='Гражданство' size='fieldset-md' items={countries} onSelect={onSelect}/>
       
        <h3>Специальность</h3>
        <Input placholder='' type='text' label='Желаемо должность' size='fieldset-lg'/>
        <fieldset className={"fieldset fieldset-sm"}>
           <label>Зарплата</label>
           <div className='salary'>
             <input className='input' placholder='' type='text' size='fieldset-lg'/>
             <select className='input'>
              <option>KZT</option>
              <option>USD</option>
              <option>RUB</option>
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
            <textarea className="textarea" placeholder= "Расскожите о себе"></textarea>
        </fieldset>

        <AutoCompliteTegs placholder='' type='text' label='Ключевые навыки' size='fieldset-md' items={skills} onSelect={onSelect}/>
        
        <h3>Образование</h3>
        <AddEducation onChange={() => {}}/>

        <h3>Владение языками</h3>
        <AddLang onChange={() => {}}/>

        <h3>Другая важная информация</h3>
        <SelectEmploymentTypes label="Занятость" size="fieldset-md" employmentTypes={employmentTypes}/>
      
        <button className='button button-primary'> Сохранить и опубликовать </button>
      </div>
    </main>
  )
}