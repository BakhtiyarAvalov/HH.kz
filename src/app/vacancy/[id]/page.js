'use client'

import Header from '@/components/heder'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVacancyById } from '@/app/store/slices/vacancySlice'
import { getMyResumes } from '@/app/store/slices/resumeSlice'
import { useParams } from 'next/navigation'
// import { getMyResumes } from '@/app/store/slices/resumeSlice'
import { handleClientScriptLoad } from 'next/script'
import { createApplies, getEmployeeApplies } from '@/app/store/slices/applySlice'
export default function VacancyPage() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const vacancy = useSelector(state => state.vacancy.vacancy)
    const currentUser = useSelector(state => state.auth.currentUser)
    const resumes = useSelector(state => state.resume.resumes)
    const applies = useSelector(state => state.apply.applies)

    const [resumeId, setResume] = useState()
    
    const didMount = () => {
      dispatch(getVacancyById(id))
      dispatch(getMyResumes())
      dispatch(getEmployeeApplies())
    }

    useEffect(didMount, [])
    useEffect(() =>{
      if(resumes[0])
      setResume(resumes[0].id)
    },[])

    const handleApply = () =>{
      dispatch(createApplies({
        resumeId, 
        vacancyId: id
      }))
    }
    let isApplied = applies.some(item => item.vacancyId === id * 1)

    // let isApplied = false;
    // applies.map(item =>{
    //   if(item.vacancyId === id) isApplied = true
    // })

    let skills = [];
    if(vacancy.skills) skills = vacancy.skills.split(",")
    // console.log("vacancy", vacancy);
  return (
    <main>
        {/* <Header/> */}
        <div className='container'>
            {currentUser && currentUser.id === vacancy.id && <div className="flex flex-ai-c flex-jc-sb ptb7">
                <Link href={`/edit-vacancy/${vacancy.id}`} className='button button-secondary-bordered'>Редактировать</Link>
            </div>}
            <div className='card mt-7'>
                <h1>{vacancy.name}</h1>
                <p>{vacancy.salary_from && `от ${vacancy.salary_from}`}  {vacancy.salary_to && `- от ${vacancy.salary_to}`} {vacancy.salary_type}</p>
                {vacancy.experience && <p> требуемый опыт работы: {vacancy.experience.duration}</p>}
                {vacancy.employmentType && <p>Тип занятости {vacancy.employmentType.name}</p>}
                {
                  currentUser && currentUser.role.name === "employee" && 
                  (<select className='input mtb4' style={{maxWidth: "200px"}} value={resumeId} onChange={(e)=>(e.target.value)}>
                    {resumes.map(item => (<option value={item.id} key={item.id}>{item.position}</option>))}
                  </select>)
                }
                {currentUser && currentUser.id !== vacancy.id && !isApplied && <button className='button button-primary' onClick={handleApply}>Откликнуться</button>}
                {currentUser && currentUser.id !== vacancy.id && isApplied && <Link className='button button-primary' style={{maxWidth: "200px"}} href="/applise">Смотреть отклик</Link>}

            </div>
            {vacancy.company && <p className='secondory mt-7'>{vacancy.company.name}</p>}
            {vacancy.company && <p className='secondory'>{vacancy.company.description}</p>}
            <p className='secondory' dangerouslySetInnerHTML={{__html: vacancy.description}}></p>
            <p className='secondory'>{vacancy.address}</p>
            <h3 className='mt-7'>Ключевые навыки</h3>
            {skills.map((skill, index) => (<span className='teg mr4' key={`${skill} - ${index}`}>{skill}</span>))}
        </div>
    </main>
  )
} 
