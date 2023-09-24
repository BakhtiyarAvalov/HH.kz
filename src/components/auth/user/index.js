'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from 'react-redux'
import { authorize, sendVerificationEmail, verifycode } from "@/app/store/slices/authSlice"

export default function UserLogin () {
    
    const [step, setStep] = useState(1)
    const [email, setEmail]= useState("")
    const [time, setTime] = useState(119)
    const[code, setCode] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const isAuth = useSelector((state) =>state.auth.isAuth)

    const sendVerifyEmail = ()=>{
        dispatch(sendVerificationEmail(email));
        setStep(2)
    }

    const verifycodeFunc = ()=>{
        dispatch(verifycode(email, code))

    }

    useEffect(()=>{
        let timeCurrent = time
        let interval;
        if(step===2){
            let interval = setInterval(() => {
               if(timeCurrent > 0) {
                    setTime(time => time-1)
                    timeCurrent--
                }
            }, 1000)
        }else if(interval){
            clearInterval(interval)
        }
    }, [step])

    useEffect(()=>{
        if(isAuth){
            router.push("/resumes")
        }
    }, [isAuth])

    const  min = parseInt(time/60)
    const sec = time % 60

    return (
        <section className="login-page">
           {isAuth ? "True" : "False"}
           {step === 1 && <div className="card">
                <h1>Поиск работы</h1>
                <from>
                    <input className="input" placeholder="Введите e-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <button className="button button-primary" onClick={sendVerifyEmail}>Продолжить</button>
                </from>
            </div>}

            {step === 1 && <div className="card">
                <h1>Поиск сотрудников</h1>
                <p>Размещение вакансии и доступ к базе резюме</p>
                <button className="button button-primary-border">Я ищу сотрудников</button>
            </div>}

            {step === 2 && <div className="card">
                <h1>Отправили код на...</h1>
                <p>Напишите его, что бы подтвердить, что это вы, а не кто-то другой входит в личный кабинет </p>
                <from>
                    <input className="input" placeholder="Введите код" value={code} onChange={(e)=>setCode(e.target.value)}/>
                    <p>Повторить можно через {min}:{sec}</p>
                    <button className="button button-primary" type="button" onClick={verifycodeFunc}>Продолжить</button>
                    <button className="button button-primary-border" type="button" onClick={()=>setStep(1)}>Назад</button>
                </from>
            </div>}
            {step === 3 && <div className="card">
                <h1>Давайте познакомимся</h1>
                <from>
                    <input className="input" placeholder="Имя"/>
                    <input className="input" placeholder="Фамилия"/>
                    <button className="button button-primary" type="button" onClick={()=>dispatch(authorize())}>Продолжить</button>
                    <button className="button button-primary-border" onClick={()=>setStep(2)}>Назад</button>
                </from>
            </div>}
        </section>
    )
}