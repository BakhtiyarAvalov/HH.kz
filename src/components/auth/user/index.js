'use client'

export default function UserLogin () {
    return (
        <section className="login-page">
            <div className="card">
                <h1>Поиск работы</h1>
                <from>
                    <input className="input" placeholder="Введите e-mail"/>
                    <button className="button button-primary">Продолжить</button>
                </from>
            </div>
            <div className="card">
                <h1>Поиск сотрудников</h1>
                <p>Размещение вакансии и доступ к базе резюме</p>
                <button className="button button-primary-border">Я ищу сотрудников</button>
            </div>
            <div className="card">
                <h1>Отправили код на...</h1>
                <p>Напишите его, что бы подтвердить, что это вы, а не кто-то другой входит в личный кабинет </p>
                <from>
                    <input className="input" placeholder="Введите код"/>
                    <p>Повторить можно через 00:48</p>
                    <button className="button button-primary">Продолжить</button>
                    <button className="button button-primary-border">Назад</button>
                </from>
            </div>
        </section>
    )
}