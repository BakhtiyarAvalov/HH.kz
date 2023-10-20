'use client'
import { useDispatch, useSelector} from 'react-redux'
import { logOut, authorize } from "@/app/store/slices/authSlice"
import jwt_decode from 'jwt-decode'
import logo from '../../images/logo.png'
import search from '../../images/search.png'
import Image from "next/image"
import Link from 'next/link'
import { useEffect } from 'react'

export default function Header () {

    const isAuth = useSelector((state) =>state.auth.isAuth)
    const currentUser = useSelector((state) =>state.auth.currentUser)

    const dispatch = useDispatch()
    useEffect (()=>{
        const token = localStorage.getItem("token")
        if(token){
          let decodedToken = jwt_decode(token)
          if(decodedToken.exp * 1000 > Date.now()){
            dispatch(authorize({token}))
          }else{
            localStorage.removeItem("token")
          }
        }
    },[])

    return (
        <header className="header">
            <div className = "container">
                <div className="header-item">
                    <div className = "header-iner">
                        <Image alt='' src={logo}/>
                        {currentUser && currentUser.role && currentUser.role.name === "manager" && <Link href="/vacancy">Мои вакансии</Link>}
                        {currentUser && currentUser.role && currentUser.role.name !== "manager" && <Link href="/resumes">Мои резюме</Link>}
                        {currentUser && currentUser.role && currentUser.role.name !== "manager" &&
                            <Link  href='/applies'>
                                    Отклики
                            </Link>
                        }                        <a>Работадетялм</a>
                        <a>Помощь</a>
                    </div>
                    <div className = "header-iner" >
                        <Link className="header-search" href="/search/vacancy/advenced">
                            <Image alt=''  src={search}/>
                            Поиск
                        </Link>
                        {currentUser && currentUser.role && currentUser.role.name !== "manager" &&
                            <Link className="header-button header-button-green" href='/create-resume'>
                                    Создать резюме
                            </Link>
                        }
                        {currentUser && currentUser.role && currentUser.role.name === "manager" &&
                            <Link className="header-button header-button-green" href='/create-vacancy'>
                                    Создать вакансию
                            </Link>
                        }
                        {!isAuth && <Link  href='/login' className="header-button">
                            Войти
                        </Link>}
                        {isAuth && <a onClick={() => dispatch(logOut())} className="header-button">
                            Выйти
                        </a>}
                    </div>
                </div>
            </div>
        </header>
    )
}