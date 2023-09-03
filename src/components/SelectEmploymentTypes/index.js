import { useState } from "react"

export default function SelectEmploymentTypes({employmentTypes, label, size}){
    const [eTypes, setEtypes] = useState([])
        const onSelect = (e) =>{
        console.log(e.target.value);
        const tps = [...eTypes]
        if(e.target.checked && !tps.includes(e.target.value * 1)){
            setEtypes([...tps, e.target.value * 1])
        }else if(!e.target.checked && tps.includes(e.target.value * 1)){
          const index = tps.indexOf(e.target.value * 1)
          tps.splice(index, 1)
          setEtypes(tps)
        }
    }
    return(
        <fieldset className={"fieldset " + size}>
           <label>{label}</label>
            <div >
                {employmentTypes.map((type, index) => <div className="checkbox" key={index}>
                    <input type="checkbox" name="employmentTypes" value={type.id} id={type.id + "-type"} onChange={onSelect}/>
                    <label htmlFor={type.id + "-type"}>{type.name}</label>
                </div>)}
            </div>
        </fieldset>
    )
}