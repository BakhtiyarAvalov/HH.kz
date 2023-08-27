'use client'
import Header from '../../components/heder'
import Input from '@/components/input'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'


export default function CreateResume() {
  
  const [cities, setCities] = useState([])
  
  useEffect(()=>{
    axios.get(`${END_POINT}/api/region/cities`).then(res => {
      setCities(res.data)
    })
  },[])

  const onSelect = (data) =>{
    console.log(data);
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
      </div>
    </main>
  )
}