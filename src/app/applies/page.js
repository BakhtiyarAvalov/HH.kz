'use client'

import Header from '../../components/heder'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeApplies } from '../store/slices/applySlice'
import MyApplies from '@/components/MyApplies'

export default function AppliesPage() {
  
  const dispatch = useDispatch();
  const applies = useSelector((state) => state.apply.applies)

  const didMount = () => {
    dispatch(getEmployeeApplies())
  }
  useEffect(didMount, [])
  return (
    <main>
        <Header/>
        <div className='container'>
            <div className="flex flex-ai-c flex-jc-sb ptb7">
                <h1>Отклики и приглашения</h1>
            </div>
            <MyApplies applies={applies}/>
        </div>
    </main>
  )
}