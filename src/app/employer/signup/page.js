"use client"
import Image from 'next/image'
import logo from '@/images/logo.png'
import { useState } from 'react'
import { signUp } from '@/app/store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { hendelDeleteResume } from '@/app/store/slices/resumeSlice'


export default function EmployerSignup() {
    const [step, setStep] = useState(1)
    const [email, setEmail]= useState("")
    const [first_name, setName]= useState("")
    const [company_name, setCompanyName]= useState("")
    const [company_description, setCompanyDescription]= useState("")
    const [last_name, setSurname]= useState("")
    const [company_address, setCompanyAdres]= useState("")
    const [company_logo, setCompanyLogo]= useState()
    const [password, setPassword]= useState("")
    const [password2, setPassword2]= useState("")

    const dispatch = useDispatch()


    const onLogoChange = (e) =>{
        setCompanyLogo(e.target.files[0])
    }

    const hendelSignup = () => {
        dispatch(signUp({
            email, 
            full_name: `${first_name} ${last_name}`,
            company_name,
            company_address,
            password,
            password2, 
            company_description,
            company_logo,
        }))
    }

  return (
    <main className='bg'>
        <div className='container'>
            <div className='auth-header'>
                <Image id="imgID" alt='' src={logo}/>
            </div>
            <section className="login-page">
                 {step === 1 && <div className="card">
                    <h1>Регистрация для поиска сотрудников</h1>
                    <p>В завершении на почту придет пароль</p>
                    <form>
                        <input className="input" placeholder="Введите e-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <button className="button button-primary"  onClick={()=>setStep(2)}>Продолжить</button>  
                    </form>
                </div>}

                {step === 2 && <div className="card">
                    <h1>Как вас зовут</h1>
                    <form>
                        <input className="input" placeholder="Введите имя" value={first_name} onChange={(e)=>setName(e.target.value)}/>
                        <input className="input" placeholder="Введите фамилию" value={last_name} onChange={(e)=>setSurname(e.target.value)}/>
                        <button className="button button-primary" type="button" onClick={()=>setStep(3)}>Продолжить</button>
                        <button className="button button-primary-border" type="button" onClick={()=>setStep(1)}>Назад</button>
                    </form>
                </div>}

                {step === 3 && <div className="card">
                    <h1>Введите название компании</h1>
                    <form>
                        <input className="input" placeholder="Название компании" value={company_name} onChange={(e)=>setCompanyName(e.target.value)}/>
                        <textarea className="textarea" placeholder="Опесание" value={company_description} onChange={(e)=>setCompanyDescription(e.target.value)}></textarea>
                        <input className="input" placeholder="Адрес компании" value={company_address} onChange={(e)=>setCompanyAdres(e.target.value)}/>
                        <input type="file" className="input" placeholder="Логотип компании" onChange={onLogoChange}/>
                        <button className="button button-primary" type="button" onClick={()=>setStep(4)}>Продолжить</button>                         {/* onClick={()=>dispatch(authorize())} */}
                        <button className="button button-primary-border" onClick={()=>setStep(3)}>Назад</button> 
                    </form>
                </div>}

                {step === 4 && <div className="card">
                    <h1>Введите пароль</h1>
                    <form>
                        <input className="input" type='password' placeholder="Введите пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <input className="input" type="password" placeholder="Поддвердите пароль" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
                        <button className="button button-primary" type="button" onClick={hendelSignup}>Регистрировать</button>
                        <button className="button button-primary-border" type="button" onClick={()=>setStep(3)}>Назад</button>
                    </form>
                </div>}
            </section>
        </div>
    </main>
  )
}