import { useSelector } from "react-redux"
import MyApply from "./MyApply/apply"
import { useEffect, useState } from "react"

export default function MyApplies({}){
    const [sortKey, setSortKey] = useState ("status")
    const [sortDirection, setSortDirection] = useState ("asc")

    const applies = useSelector((state) => state.apply.applies)

    let sortedApplies = []
        sortedApplies = [...applies].sort(item => {
            let aPart, bPart
            if(sortKey === 'status'){
                aPart = a.status 
                bPart = b.status
            }else if(sortKey === 'vacancy'){
                aPart = a.vacancy.name 
                bPart = b.vacancy.name 
            }else if(sortKey === 'updatedAt'){
                aPart = a.updatedAt
                bPart = b.updatedAt
            }

            if(sortDirection === "asc"){
                if(aPart < bPart){
                    return -1
                }
                if(aPart > bPart){
                    return 1
                }
            }else{
                if(aPart > bPart){
                    return -1
                }
                if(aPart < bPart){
                    return 1
                }
            }
            return 0
        })
    

    useEffect(() => {

    }, [])

    const sortBy = (key, ) => {
        if(sortKey === key){
            sortDirection === "asc" ? setSortDirection("desc") : setSortDirection("asc")
        }else{
            setSortKey(key)
            setSortDirection("asc")
        }
    }
    const showApplise = applies.map ((a, b) =>(
        <MyApply 
        item = {item}
        key = {item.id}
    />))

    
    return <div className="table">
        <div className="row row-header flex flex-jc-sb">
            <div className={`col ${sortDirection}`} onClick={() => sortBy('status')}>
                Статус 
                {sortKey === "status" && <img className="ml2" src="/images/arrowright.svg"/>}
            </div>
            <div className={`col ${sortDirection}`} onClick={() => sortBy('vacancy')}>
                Вакансии
                {sortKey === "vacancy" &&<img className="ml2" src="/images/arrowright.svg"/>}
            </div>
            <div className={`col ${sortDirection}`} onClick={() => sortBy('updatedAt')}>
                Дата
                {sortKey === "updatedAt" &&<img className="ml2" src="/images/arrowright.svg"/>}
            </div>
        </div>
        {showApplise}
    </div>
}