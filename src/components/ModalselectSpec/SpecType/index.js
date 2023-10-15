import { useEffect, useState } from "react"
import Spec from "./Spec"

export default function SpecType({specType, onChange, value}){
    const [active, setActive] = useState(false)
    useEffect(() => {
        specType.specializations.map(spec => spec.id === value ? setActive(true):null)
    }, [])

    return(
        <div>
            <div className={`specType${active?" active":""}`} onClick={()=>setActive(!active)}>
                <img src="/images/arrowright.svg"/>
                {specType.name}
            </div>
            <div >
                {active && specType.specializations.map(spec => (<Spec spec={spec} onChange={onChange} value={value}/>))}
            </div>
        </div>
    )
}