'use client'
import Header from '../../components/heder'
import Input from '@/components/input'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import SelectDate from '@/components/SelectDate'
import ModalAddExp from '@/components/ModalAddExp'
export default function CreateResume() {
  
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])

  const [modalExpIsOpen, setModalExpIsOpen]=useState(false)
  
  useEffect(()=>{
    axios.get(`${END_POINT}/api/region/cities`).then(res => {
      setCities(res.data)
    })
    axios.get(`${END_POINT}/api/region/countries`).then(res => {
      setCountries(res.data)
    })
  },[])

  const onSelect = (data) =>{
    console.log(data);
  }
  const closeModalExp = () => {
    setModalExpIsOpen(false)
  }
  return (
    <main>
      <Header/>
      <div className='container'>
        <h1>Ваше резюме</h1>
        <h3>Контактные данные</h3>
        <Input placholder='' type='text' label='Имя' size='fielcet-md'/>
        <Input placholder='' type='text' label='Фамилия' size='fielcet-md'/>
        <Input placholder='' type='text' label='Мобильный телефон' size='fielcet-md'/>
        <AutoCompliteSelect placholder='' type='text' label='Город проживания' size='fielcet-md' items={cities} onSelect={onSelect}/>

        <h3>Основная информация</h3>
        <SelectDate size="fildset-sm" label="Дата рождения"/>
        <fieldset className={"fielcet fildset-sm"}>
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
        <AutoCompliteSelect placholder='' type='text' label='Гражданство' size='fielcet-md' items={countries} onSelect={onSelect}/>
        <h3>Специальность</h3>
        <Input placholder='' type='text' label='Желаемо должность' size='fielcet-lg'/>
        <fieldset className={"fielcet fildset-sm"}>
           <label>Зарплата</label>
           <div className='salary'>
             <input className='input' placholder='' type='text' size='fielcet-lg'/>
             <select className='input'>
              <option>KZT</option>
              <option>USD</option>
              <option>RUB</option>
             </select>
             на руки
           </div>
        </fieldset>
        <h3>Опыт работы</h3>
        {modalExpIsOpen && <ModalAddExp close = {closeModalExp}/>}
        <fieldset className={"fielcet fildset-lg"}>
           <label>Места работы</label>
           <div className='exp'>
            <div>
              
            </div>
            <button onClick={()=>setModalExpIsOpen(true)} className='button button-primary-borderd'>Добавить место работы</button>
           </div>
        </fieldset>
      </div>
    </main>
  )
}