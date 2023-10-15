import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SpecType from "./SpecType"
export default function ModalselectExp({close, onChange, value}){
    const [search, setSearch] = useState("")
    const [filteredSpecTypes, setFilteredSpecTypes] = useState([])
    
    const specializationTypes = useSelector(state => state.vacancy.specializations)
    const onSearch = e => {
        setSearch(e.target.value)
        let types = [...specializationTypes]
        types = types.filter(item => {
            for(let i = 0; i < item.specializations.length; i++){
                if(item.specializations[i].name.includes(e.target.value)) return item
            }
        })
        setFilteredSpecTypes(types)
    }
    useEffect(() => {
        setFilteredSpecTypes(specializationTypes)
    }, [specializationTypes])
    // console.log("specializationType", specializationType);
    return(
        <div className="modal">
            <div className="modal-backdrop" onClick={()=>close()}></div>
            <div className="modal-inner p3">
                <h2>Кого вы хотите найти</h2>
                <input className="input" placeholder="Искать" type="text" onChange={ onSearch } value={search}/>
                {filteredSpecTypes.map(specType => (<SpecType specType={specType} onChange={onChange} value={value}/>))}
            </div>
        </div>
    )
}