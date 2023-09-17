'use client'
import { useDispatch, useSelector} from 'react-redux'
import { logOut } from "@/app/store/slices/authSlice"

import logo from '../../images/logo.png'
import search from '../../images/search.png'
import Image from "next/image"
import Link from 'next/link'

export default function Header () {

    const isAuth = useSelector((state) =>state.auth.isAuth)
    const dispatch = useDispatch()

    return (
        <header className="header">
            <div className = "container">
                <div className="header-item">
                    <div className = "header-iner">
                        <Image src={logo}/>
                        <a>Работадетялм</a>
                        <a>Помощь</a>
                    </div>
                    <div className = "header-iner">
                        <button className="header-search">
                            <Image src={search}/>
                            Поиск
                        </button>
                        <Link className="header-button header-button-green" href='/create-resume'>
                                Создать резюме
                        </Link>
                        {!isAuth && <linc  href='/login' className="header-button">
                            Войти
                        </linc>}
                        {isAuth && <a onClick={() => dispatch(logOut())} className="header-button">
                            Выйти
                        </a>}
                    </div>
                </div>
            </div>
        </header>
    )
}