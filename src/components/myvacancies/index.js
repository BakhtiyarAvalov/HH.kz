import MyVacancy from "./myvacancy"
import { useSelector } from "react-redux"

export default function MyVacancies(){
    const vacancies = useSelector((state) => state.vacancy.vacancies)
    const showVacansies = vacancies.map (item =>(
    <MyVacancy 
        item = {item}
        key = {item.id}
    />))
    return <div>
        {showVacansies}
    </div>
}