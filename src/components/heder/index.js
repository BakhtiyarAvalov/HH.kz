'use client'
import { useDispatch, useSelector} from 'react-redux'
import { logOut } from "@/app/store/slices/authSlice"

import logo from '../../images/logo.png'
import search from '../../images/search.png'
import Image from "next/image"
import Link from 'next/link'

export default function Header () {

    const isAuth = useSelector((state) =>state.auth.isAuth)
    const currentUser = useSelector((state) =>state.auth.currentUser)

    const dispatch = useDispatch()

    return (
        <header className="header">
            <div className = "container">
                <div className="header-item">
                    <div className = "header-iner">
                        <Image alt='' src={logo}/>
                        {currentUser && currentUser.role && currentUser.role.name === "manager" && <Link href="/vacancy">Мои вакансии</Link>}
                        {currentUser && currentUser.role && currentUser.role.name !== "manager" && <Link href="/resumes">Мои резюме</Link>}
                        <a>Работадетялм</a>
                        <a>Помощь</a>
                    </div>
                    <div className = "header-iner">
                        <button className="header-search">
                            <Image alt='' src={search}/>
                            Поиск
                        </button>
                        {currentUser && currentUser.role && currentUser.role.name === "manager" &&
                            <Link className="header-button header-button-green" href='/create-vacancy'>
                                    Создать резюме
                            </Link>
                        }
                        {currentUser && currentUser.role && currentUser.role.name !== "manager" &&
                            <Link className="header-button header-button-green" href='/create-resume'>
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