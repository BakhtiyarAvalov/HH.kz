import Header from '../../components/heder'
import MyResumes from '@/components/myresumes'
const resumes = [{
  position: 'maneger',
  createAt: '01.01.23',
  stats: {
    views: 0,
    applies: 0,
    show: 0
  }
},
{
  position: 'react developer',
  createAt: '01.01.23',
  stats: {
    views: 10,
    applies: 250,
    show: 100
  }
},
{
  position: 'back-end developer',
  createAt: '01.01.23',
  stats: {
    views: 40,
    applies: 30,
    show: 45
  }
}
]
export default function ResumePage() {
  return (
    <main>
        <Header/>
        <div className='container'>
            <div className="flex flex-ai-c flex-jc-sb ptb7">
                <h1>Мои резюме</h1>
                <button className='button button-secondary-bordered'>Создать резюме</button>
            </div>
            <MyResumes resumes={resumes}/>
        </div>
    </main>
  )
}