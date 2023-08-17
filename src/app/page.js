import styles from './page.module.css'
import Header from '../components/heder'
import UserLogin from '../components/auth/user'

export default function Home() {
  return (
    <main>
        <Header/>
        <UserLogin/>
    </main>
  )
}
