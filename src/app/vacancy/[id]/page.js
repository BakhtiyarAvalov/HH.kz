'use client'

import Header from '@/components/heder'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVacancyById } from '@/app/store/slices/vacancySlice'
import { useParams } from 'next/navigation'

export default function VacancyPage() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const vacancy = useSelector(state => state.vacancy.vacancy)
    const currentUser = useSelector(state => state.auth.currentUser)

    const didMount = () => {
      dispatch(getVacancyById(id))
    }

    useEffect(didMount, [])
    

    let skills = [];
    if(vacancy.skills) skills = vacancy.skills.split(",")
    console.log("vacancy", vacancy);
  return (
    <main>
        <Header/>
        <div className='container'>
            {currentUser.id === vacancy.id && <div className="flex flex-ai-c flex-jc-sb ptb7">
                <Link href={`/edit-vacancy/${vacancy.id}`} className='button button-secondary-bordered'>Редактировать</Link>
            </div>}
            <div className='card mt-7'>
                <h1>{vacancy.name}</h1>
                <p>{vacancy.salary_from && `от ${vacancy.salary_from}`}  {vacancy.salary_to && `- от ${vacancy.salary_to}`} {vacancy.salary_type}</p>
                {vacancy.experience && <p> требуемый опыт работы: {vacancy.experience.duration}</p>}
                {vacancy.employmentType && <p>Тип занятости {vacancy.employmentType.name}</p>}
                {currentUser.id !== vacancy.id && <button className='button button-primary'>Откликнуться</button>}
            </div>
            {vacancy.company && <p className='secondory mt-7'>{vacancy.company.name}</p>}
            {vacancy.company && <p className='secondory'>{vacancy.company.description}</p>}
            <p className='secondory'>{vacancy.description}</p>
            <p className='secondory'>{vacancy.address}</p>
            <h3 className='mt-7'>Ключевые навыки</h3>
            {skills.map(skill => (<span className='teg mr4'>{skill}</span>))}
        </div>
    </main>
  )
} 
