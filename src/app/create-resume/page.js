'use client'
import Header from '../../components/heder'
import Input from '@/components/input'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'

  axios.get(`${END_POINT}/api/region/cityes`).then(res =>console.log(res))

export default function CreateResume() {
  return (
    <main>
      <Header/>
      <div className='container'>
        <h1>Ваше резюме</h1>
        <h3>Контактные данные</h3>
        <Input placholder='' type='text' label='Имя' size='fielcet-md'/>
        <Input placholder='' type='text' label='Фамилия' size='fielcet-md'/>
        <Input placholder='' type='text' label='Мобильный телефон' size='fielcet-md'/>
        <Input placholder='' type='text' label='Город проживания' size='fielcet-md'/>
      </div>
    </main>
  )
}